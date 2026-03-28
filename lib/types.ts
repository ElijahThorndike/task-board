export type TaskStatus = "pending" | "completed";
export type TaskPriority = "critical" | "focus" | "steady";
export type TaskSource = "demo" | "chain" | "local";

export type TaskItem = {
  id: string;
  title: string;
  note: string;
  status: TaskStatus;
  priority: TaskPriority;
  source: TaskSource;
  owner: string;
  createdAt: string;
  updatedAt: string;
  tag: string;
  chainIndex?: number;
};

export type TaskEditorValues = {
  title: string;
  note: string;
  priority: TaskPriority;
  status: TaskStatus;
};
