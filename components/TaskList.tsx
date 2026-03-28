import type { TaskItem } from "@/lib/types";
import { TaskCard } from "@/components/TaskCard";
import { EmptyState } from "@/components/EmptyState";

export function TaskList({ tasks }: { tasks: TaskItem[] }) {
  const pending = tasks.filter((task) => task.status === "pending");
  const completed = tasks.filter((task) => task.status === "completed");

  if (!tasks.length) {
    return <EmptyState title="No tasks yet" copy="Create your first item and pin it to the board." actionHref="/tasks/new" actionLabel="Create task" />;
  }

  return (
    <div className="page-grid">
      <section className="panel panel--lime">
        <div className="panel-inner stack">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <h2 className="section-title">Pending Lane</h2>
            <span className="badge" style={{ background: "white" }}>
              {pending.length}
            </span>
          </div>
          <div className="page-grid">
            {pending.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </section>
      <section className="panel panel--violet">
        <div className="panel-inner stack">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
            <h2 className="section-title">Done Stack</h2>
            <span className="badge" style={{ background: "white", color: "#111" }}>
              {completed.length}
            </span>
          </div>
          <div className="page-grid">
            {completed.length ? (
              completed.map((task) => <TaskCard key={task.id} task={task} />)
            ) : (
              <div className="panel" style={{ boxShadow: "6px 6px 0 #111111" }}>
                <div className="panel-inner">
                  <p className="section-copy" style={{ color: "#111111" }}>
                    Nothing completed yet.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
