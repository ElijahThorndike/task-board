"use client";

import { demoTasks } from "@/lib/mock-data";
import { DEMO_ADDRESS } from "@/lib/constants";
import type { TaskEditorValues, TaskItem } from "@/lib/types";

const STORAGE_KEY = "task-board.local-tasks.v1";

type StoreShape = Record<string, TaskItem[]>;

function canUseStorage() {
  return typeof window !== "undefined";
}

function readStore(): StoreShape {
  if (!canUseStorage()) return {};
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as StoreShape;
  } catch {
    return {};
  }
}

function writeStore(store: StoreShape) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function getStoredTasks(owner: string) {
  const store = readStore();
  const existing = store[owner];
  if (existing?.length) return existing;
  if (owner === DEMO_ADDRESS) return demoTasks;
  return [];
}

export function saveStoredTasks(owner: string, tasks: TaskItem[]) {
  const store = readStore();
  store[owner] = tasks;
  writeStore(store);
  window.dispatchEvent(new CustomEvent("task-board-updated"));
}

export function createLocalTask(owner: string, values: TaskEditorValues): TaskItem {
  const stamp = new Date().toISOString();
  return {
    id: `local-${Math.random().toString(36).slice(2, 10)}`,
    title: values.title,
    note: values.note,
    status: values.status,
    priority: values.priority,
    source: "local",
    owner,
    createdAt: stamp,
    updatedAt: stamp,
    tag: values.priority === "critical" ? "Urgent" : values.priority === "focus" ? "Focus" : "Routine",
  };
}

export function upsertTask(owner: string, task: TaskItem) {
  const tasks = getStoredTasks(owner);
  const index = tasks.findIndex((item) => item.id === task.id);
  const next = [...tasks];
  if (index >= 0) next[index] = task;
  else next.unshift(task);
  saveStoredTasks(owner, next);
}
