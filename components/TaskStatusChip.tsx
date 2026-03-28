import type { TaskStatus } from "@/lib/types";
import { taskStatusLabel } from "@/lib/task-utils";

export function TaskStatusChip({ status }: { status: TaskStatus }) {
  const style = status === "completed" ? { background: "#C7FF3C", color: "#111111" } : { background: "#FF5A36", color: "#FFFFFF" };
  return (
    <span className="badge" style={style}>
      {taskStatusLabel(status)}
    </span>
  );
}
