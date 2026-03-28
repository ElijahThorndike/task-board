"use client";

import Link from "next/link";
import { useTaskBoard } from "@/hooks/useTaskBoard";
import { TaskSummaryPanel } from "@/components/TaskSummaryPanel";

function walletLabel(address?: string) {
  if (!address) return "Demo Mode";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function HomeBoard() {
  const { tasks, address } = useTaskBoard();
  const pending = tasks.filter((task) => task.status === "pending");
  const completed = tasks.filter((task) => task.status === "completed");

  return (
    <>
      <TaskSummaryPanel tasks={tasks} walletLabel={walletLabel(address)} />
      <section className="page-grid" style={{ gridTemplateColumns: "1.1fr 0.9fr" }}>
        <div className="panel">
          <div className="panel-inner stack">
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
              <h2 className="section-title">Hot Stack</h2>
              <span className="badge" style={{ background: "#FF5A36", color: "white" }}>
                {pending.length} pending
              </span>
            </div>
            <div className="stack">
              {pending.slice(0, 3).map((task, index) => (
                <Link
                  key={task.id}
                  href={`/tasks/${task.id}`}
                  className="panel"
                  style={{
                    background: index === 0 ? "#C7FF3C" : index === 1 ? "#FFFFFF" : "#7B61FF",
                    color: index === 2 ? "white" : "#111111",
                    boxShadow: index === 0 ? "6px 6px 0 #2453FF" : index === 1 ? "6px 6px 0 #111111" : "6px 6px 0 #FF5A36",
                  }}
                >
                  <div className="panel-inner stack" style={{ gap: 6 }}>
                    <strong className="label" style={{ margin: 0 }}>
                      Slot {index + 1}
                    </strong>
                    <span className="section-title" style={{ fontSize: "1.1rem" }}>
                      {task.title}
                    </span>
                  </div>
                </Link>
              ))}
              {!pending.length ? (
                <div className="panel panel--lime">
                  <div className="panel-inner">
                    <p className="section-copy" style={{ color: "#111111" }}>
                      Your board is clear. Add a new task to get started.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
        <div className="panel panel--violet">
          <div className="panel-inner stack">
            <h2 className="section-title">Done Pulse</h2>
            <strong className="display-title" style={{ fontSize: "4rem" }}>
              {completed.length}
            </strong>
            <p className="section-copy" style={{ color: "rgba(255,255,255,0.88)" }}>
              Completed tasks stay stacked here so the board always shows recent momentum.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
