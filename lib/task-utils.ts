import type { TaskEditorValues, TaskItem, TaskPriority, TaskStatus } from "@/lib/types";

export function encodeTaskPayload(values: Pick<TaskEditorValues, "title" | "note" | "priority">) {
  return JSON.stringify({
    title: values.title,
    note: values.note,
    priority: values.priority,
    createdAt: new Date().toISOString(),
  });
}

export function decodeTaskPayload(raw: string, owner: string, index: number): TaskItem {
  let payload: {
    title?: string;
    note?: string;
    priority?: TaskPriority;
    createdAt?: string;
  } = {};
  try {
    payload = JSON.parse(raw) as typeof payload;
  } catch {
    payload = { title: raw };
  }
  const stamp = payload.createdAt ?? new Date().toISOString();
  return {
    id: `chain-${owner}-${index}`,
    title: payload.title || `Task ${index + 1}`,
    note: payload.note || "No note saved onchain yet.",
    status: "pending",
    priority: payload.priority || "focus",
    source: "chain",
    owner,
    createdAt: stamp,
    updatedAt: stamp,
    tag: "Base",
    chainIndex: index,
  };
}

export function taskStatusLabel(status: TaskStatus) {
  return status === "completed" ? "Completed" : "Pending";
}
