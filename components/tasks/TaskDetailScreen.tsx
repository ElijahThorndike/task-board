"use client";

import Link from "next/link";
import { BoardHeader } from "@/components/BoardHeader";
import { ActionBar } from "@/components/ActionBar";
import { TaskStatusChip } from "@/components/TaskStatusChip";
import { useTaskBoard } from "@/hooks/useTaskBoard";

const priorityColors = {
  critical: "#FF5A36",
  focus: "#2453FF",
  steady: "#7B61FF",
};

export function TaskDetailScreen({ id }: { id: string }) {
  const { getTaskById, toggleStatus, isConnected, isCreating, supportsOnchainTaskMutations, contractMode, upgradeContractHint } = useTaskBoard();
  const task = getTaskById(id);

  if (!task) {
    return (
      <div className="page">
        <BoardHeader eyebrow="Task Sheet" title="Missing Task" description="This task could not be found on the current board." />
        <ActionBar primaryHref="/tasks" primaryLabel="Back to tasks" secondaryHref="/tasks/new" secondaryLabel="Create task" />
      </div>
    );
  }

  return (
    <div className="page">
      <BoardHeader eyebrow="Task Sheet" title={task.title} description="A focused single-task panel with clear status and fast actions." tone="violet" />
      <section className="panel" style={{ boxShadow: `8px 8px 0 ${priorityColors[task.priority]}` }}>
        <div className="panel-inner stack">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <TaskStatusChip status={task.status} />
            <span className="eyebrow">{task.priority}</span>
          </div>
          <div className="split">
            <div className="stack">
              <span className="label" style={{ marginBottom: 0 }}>
                Note
              </span>
              <p className="section-copy" style={{ color: "#111111", fontSize: "1rem" }}>
                {task.note}
              </p>
            </div>
            <div className="stack">
              <span className="label" style={{ marginBottom: 0 }}>
                Source
              </span>
              <div className="action-row">
                <span className="badge" style={{ background: "white" }}>
                  {task.source === "chain" ? "Onchain read" : "Local board"}
                </span>
                <span className="badge" style={{ background: "#C7FF3C" }}>
                  {task.tag}
                </span>
                <span className="badge" style={{ background: "#FFFFFF" }}>
                  {contractMode}
                </span>
              </div>
            </div>
          </div>
          <div className="panel panel--lime" style={{ boxShadow: "4px 4px 0 #111111" }}>
            <div className="panel-inner stack" style={{ gap: 8 }}>
              <span className="label" style={{ marginBottom: 0 }}>
                Work Actions
              </span>
              <p className="section-copy" style={{ color: "#111111" }}>
                {supportsOnchainTaskMutations
                  ? "Toggle status onchain when the task comes from the upgraded contract."
                  : upgradeContractHint}
              </p>
              <div className="action-row">
                <button
                  className="btn btn--red"
                  type="button"
                  onClick={() => toggleStatus(task.id, { syncOnchain: isConnected && supportsOnchainTaskMutations })}
                  disabled={isCreating}
                >
                  {task.status === "completed" ? "Mark pending" : "Mark completed"}
                </button>
                <Link href={`/tasks/edit/${task.id}`} className="btn">
                  Edit task
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ActionBar primaryHref="/tasks" primaryLabel="Back to board" secondaryHref="/tasks/new" secondaryLabel="Create task" />
    </div>
  );
}
