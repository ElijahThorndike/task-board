"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { APP_ID, APP_NAME, DEMO_ADDRESS } from "@/lib/constants";
import { CONTRACT_ADDRESS, taskBoardAbi } from "@/lib/contract";
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

export function useTaskBoard() {
  const { address, isConnected } = useAccount();
  const owner = address ?? DEMO_ADDRESS;
  const [localTasks, setLocalTasks] = useState<TaskItem[]>([]);
  const { data: chainData, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: taskBoardAbi,
    functionName: "getTasks",
    args: [address!],
    query: { enabled: Boolean(address) },
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

  useEffect(() => {
    if (receipt.isSuccess && address && hash) {
      trackTransaction(APP_ID, APP_NAME, address, hash);
      refetch();
    }
  }, [address, hash, receipt.isSuccess, refetch]);

  const chainTasks = useMemo(() => {
    if (!address || !chainData) return [];
    return chainData.map((item, index) => decodeTaskPayload(item, address, index));
  }, [address, chainData]);

  const tasks = useMemo(() => mergeTasks(chainTasks, localTasks), [chainTasks, localTasks]);

  const createTask = useCallback(
    async (values: TaskEditorValues, options?: { syncOnchain?: boolean }) => {
      if (isConnected && address && options?.syncOnchain) {
        await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: taskBoardAbi,
          functionName: "addTask",
          args: [encodeTaskPayload(values)],
        });
        return;
      }

      const created = createLocalTask(owner, values);
      saveStoredTasks(owner, [created, ...getStoredTasks(owner)]);
    },
    [address, isConnected, owner, writeContractAsync],
  );

  const updateTask = useCallback(
    (taskId: string, values: TaskEditorValues) => {
      const current = tasks.find((item) => item.id === taskId);
      if (!current) return;
      upsertTask(owner, {
        ...current,
        ...values,
        updatedAt: new Date().toISOString(),
        tag: values.priority === "critical" ? "Urgent" : values.priority === "focus" ? "Focus" : "Routine",
      });
    },
    [owner, tasks],
  );

  const toggleStatus = useCallback(
    (taskId: string) => {
      const current = tasks.find((item) => item.id === taskId);
      if (!current) return;
      upsertTask(owner, {
        ...current,
        status: current.status === "completed" ? "pending" : "completed",
        updatedAt: new Date().toISOString(),
      });
    },
    [owner, tasks],
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
    refresh: refetch,
    isCreating: isPending || receipt.isLoading,
    latestHash: hash,
  };
}
