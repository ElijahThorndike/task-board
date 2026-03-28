"use client";

import Link from "next/link";
import { TaskList } from "@/components/TaskList";
import { useTaskBoard } from "@/hooks/useTaskBoard";

export function TasksWall() {
  const { tasks, isConnected } = useTaskBoard();

  return (
    <>
      <section className="split">
        <div className="panel panel--blue">
          <div className="panel-inner stack">
            <h2 className="section-title">Live Board</h2>
            <p className="section-copy" style={{ color: "rgba(255,255,255,0.85)" }}>
              {isConnected ? "Onchain reads are active for your connected wallet." : "Connect a wallet to load your onchain tasks. Demo tasks stay visible until then."}
            </p>
          </div>
        </div>
        <div className="panel">
          <div className="panel-inner action-row">
            <Link href="/tasks/new" className="btn btn--primary">
              Create task
            </Link>
            <Link href="/stats" className="btn">
              View stats
            </Link>
          </div>
        </div>
      </section>
      <TaskList tasks={tasks} />
    </>
  );
}
