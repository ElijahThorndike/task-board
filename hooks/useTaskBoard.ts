"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { APP_ID, APP_NAME, CONTRACT_MODE, CONTRACT_ADDRESS, DEMO_ADDRESS } from "@/lib/constants";
import { legacyTaskBoardAbi, supportsOnchainTaskMutations, upgradedTaskBoardAbi } from "@/lib/contract";
import { createLocalTask, getStoredTasks, saveStoredTasks, upsertTask } from "@/lib/task-store";
import { decodeTaskPayload, encodeTaskPayload } from "@/lib/task-utils";
import type { TaskEditorValues, TaskItem } from "@/lib/types";
import { trackTransaction } from "@/utils/track";

function mergeTasks(chainTasks: TaskItem[], localTasks: TaskItem[]) {
  const byId = new Map<string, TaskItem>();
  for (const item of chainTasks) byId.set(item.id, item);
  for (const item of localTasks) {
    const current = byId.get(item.id);
    byId.set(item.id, current ? { ...current, ...item, source: current.source } : item);
  }
  return [...byId.values()].sort((a, b) => {
    if (a.status !== b.status) return a.status === "pending" ? -1 : 1;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

function priorityToIndex(priority: TaskEditorValues["priority"]) {
  if (priority === "critical") return 0;
  if (priority === "focus") return 1;
  return 2;
}

export function useTaskBoard() {
  const isUpgradedContract = supportsOnchainTaskMutations;
  const { address, isConnected } = useAccount();
  const owner = address ?? DEMO_ADDRESS;
  const [localTasks, setLocalTasks] = useState<TaskItem[]>([]);
  const { data: legacyChainData, refetch: refetchLegacy } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: legacyTaskBoardAbi,
    functionName: "getTasks",
    args: [address!],
    query: { enabled: Boolean(address) && !isUpgradedContract },
  });
  const { data: upgradedCount, refetch: refetchUpgradedCount } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: upgradedTaskBoardAbi,
    functionName: "getTaskCount",
    args: [address!],
    query: { enabled: Boolean(address) && isUpgradedContract },
  });
  const { data: hash, isPending, writeContractAsync } = useWriteContract();
  const receipt = useWaitForTransactionReceipt({
    hash,
    query: { enabled: Boolean(hash) },
  });

  const refreshLocal = useCallback(() => {
    setLocalTasks(getStoredTasks(owner));
  }, [owner]);

  useEffect(() => {
    refreshLocal();
  }, [refreshLocal]);

  useEffect(() => {
    const handler = () => refreshLocal();
    window.addEventListener("task-board-updated", handler);
    return () => window.removeEventListener("task-board-updated", handler);
  }, [refreshLocal]);

  const refreshChain = useCallback(() => {
    if (isUpgradedContract) {
      return refetchUpgradedCount();
    }

    return refetchLegacy();
  }, [isUpgradedContract, refetchLegacy, refetchUpgradedCount]);

  useEffect(() => {
    if (receipt.isSuccess && address && hash) {
      trackTransaction(APP_ID, APP_NAME, address, hash);
      refreshChain();
    }
  }, [address, hash, receipt.isSuccess, refreshChain]);

  const legacyTasks = useMemo(() => {
    if (!address || !legacyChainData || isUpgradedContract) return [];
    return legacyChainData.map((item, index) => decodeTaskPayload(item, address, index));
  }, [address, isUpgradedContract, legacyChainData]);

  const upgradedTasks = useMemo(() => {
    if (!address || !isUpgradedContract) return [];
    const count = Number(upgradedCount ?? 0);

    return Array.from({ length: count }, (_, index) => ({
      id: `chain-${address}-${index}`,
      title: `Onchain Task ${index + 1}`,
      note: "Upgrade the contract address to load structured task reads.",
      status: "pending" as const,
      priority: "focus" as const,
      source: "chain" as const,
      owner: address,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tag: "Base",
      chainIndex: index,
    }));
  }, [address, isUpgradedContract, upgradedCount]);

  const chainTasks = isUpgradedContract ? upgradedTasks : legacyTasks;
  const tasks = useMemo(() => mergeTasks(chainTasks, localTasks), [chainTasks, localTasks]);

  const createTask = useCallback(
    async (values: TaskEditorValues, options?: { syncOnchain?: boolean }) => {
      if (isConnected && address && options?.syncOnchain) {
        if (isUpgradedContract) {
          await writeContractAsync({
            address: CONTRACT_ADDRESS,
            abi: upgradedTaskBoardAbi,
            functionName: "addTask",
            args: [values.title, values.note, priorityToIndex(values.priority)],
          });
          return;
        }

        await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: legacyTaskBoardAbi,
          functionName: "addTask",
          args: [encodeTaskPayload(values)],
        });
        return;
      }

      const created = createLocalTask(owner, values);
      saveStoredTasks(owner, [created, ...getStoredTasks(owner)]);
    },
    [address, isConnected, isUpgradedContract, owner, writeContractAsync],
  );

  const updateTask = useCallback(
    async (taskId: string, values: TaskEditorValues, options?: { syncOnchain?: boolean }) => {
      const current = tasks.find((item) => item.id === taskId);
      if (!current) return;

      if (isConnected && address && options?.syncOnchain && isUpgradedContract && typeof current.chainIndex === "number") {
        await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: upgradedTaskBoardAbi,
          functionName: "updateTask",
          args: [BigInt(current.chainIndex), values.title, values.note, priorityToIndex(values.priority)],
        });
        return;
      }

      upsertTask(owner, {
        ...current,
        ...values,
        updatedAt: new Date().toISOString(),
        tag: values.priority === "critical" ? "Urgent" : values.priority === "focus" ? "Focus" : "Routine",
      });
    },
    [address, isConnected, isUpgradedContract, owner, tasks, writeContractAsync],
  );

  const toggleStatus = useCallback(
    async (taskId: string, options?: { syncOnchain?: boolean }) => {
      const current = tasks.find((item) => item.id === taskId);
      if (!current) return;

      if (isConnected && address && options?.syncOnchain && isUpgradedContract && typeof current.chainIndex === "number") {
        await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: upgradedTaskBoardAbi,
          functionName: "toggleTaskStatus",
          args: [BigInt(current.chainIndex)],
        });
        return;
      }

      upsertTask(owner, {
        ...current,
        status: current.status === "completed" ? "pending" : "completed",
        updatedAt: new Date().toISOString(),
      });
    },
    [address, isConnected, isUpgradedContract, owner, tasks, writeContractAsync],
  );

  const getTaskById = useCallback((taskId: string) => tasks.find((item) => item.id === taskId), [tasks]);

  return {
    address,
    isConnected,
    owner,
    tasks,
    getTaskById,
    createTask,
    updateTask,
    toggleStatus,
    refresh: refreshChain,
    isCreating: isPending || receipt.isLoading,
    latestHash: hash,
    supportsOnchainTaskMutations: isUpgradedContract,
    contractMode: CONTRACT_MODE,
    upgradeContractHint: isUpgradedContract ? "" : "Deploy BaseTaskBoardV2 and replace the upgraded contract address to unlock onchain edits and status changes.",
  };
}
