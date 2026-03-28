import Link from "next/link";
import type { TaskItem } from "@/lib/types";
import { TaskStatusChip } from "@/components/TaskStatusChip";

const priorityTone = {
  critical: "#FF5A36",
  focus: "#2453FF",
  steady: "#7B61FF",
};

export function TaskCard({ task }: { task: TaskItem }) {
  return (
    <Link href={`/tasks/${task.id}`} className="panel" style={{ boxShadow: `6px 6px 0 ${priorityTone[task.priority]}` }}>
      <div className="panel-inner stack" style={{ gap: 12 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
          <span className="eyebrow" style={{ background: task.source === "chain" ? "#2453FF" : "#fff", color: task.source === "chain" ? "#fff" : "#111" }}>
            {task.tag}
          </span>
          <TaskStatusChip status={task.status} />
        </div>
        <div className="stack" style={{ gap: 8 }}>
          <h3 className="section-title" style={{ fontSize: "1.35rem" }}>
            {task.title}
          </h3>
          <p className="section-copy">{task.note}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
          <span className="badge" style={{ background: "#fff" }}>
            {task.priority}
          </span>
          <span className="muted" style={{ fontSize: "0.82rem" }}>
            Open
          </span>
        </div>
      </div>
    </Link>
  );
}
