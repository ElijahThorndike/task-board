import type { TaskItem } from "@/lib/types";

export function TaskSummaryPanel({ tasks, walletLabel }: { tasks: TaskItem[]; walletLabel: string }) {
  const total = tasks.length;
  const completed = tasks.filter((item) => item.status === "completed").length;
  const pending = total - completed;

  return (
    <section className="panel">
      <div className="panel-inner stack">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
          <h2 className="section-title">Board Snapshot</h2>
          <span className="eyebrow">{walletLabel}</span>
        </div>
        <div className="split">
          <div className="panel panel--blue">
            <div className="panel-inner stack" style={{ gap: 4 }}>
              <span className="muted" style={{ color: "rgba(255,255,255,0.8)" }}>
                Total
              </span>
              <strong className="display-title" style={{ fontSize: "2.6rem" }}>
                {total}
              </strong>
            </div>
          </div>
          <div className="panel panel--lime">
            <div className="panel-inner split" style={{ gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
              <div className="stack" style={{ gap: 4 }}>
                <span className="muted" style={{ color: "#111" }}>
                  Pending
                </span>
                <strong className="section-title" style={{ fontSize: "2rem" }}>
                  {pending}
                </strong>
              </div>
              <div className="stack" style={{ gap: 4 }}>
                <span className="muted" style={{ color: "#111" }}>
                  Done
                </span>
                <strong className="section-title" style={{ fontSize: "2rem" }}>
                  {completed}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
