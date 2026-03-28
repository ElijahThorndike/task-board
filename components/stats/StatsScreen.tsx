"use client";

import { ProgressStatCard } from "@/components/ProgressStatCard";
import { useTaskBoard } from "@/hooks/useTaskBoard";

export function StatsScreen() {
  const { tasks, isConnected } = useTaskBoard();
  const completed = tasks.filter((task) => task.status === "completed").length;
  const pending = tasks.filter((task) => task.status === "pending").length;
  const chainItems = tasks.filter((task) => task.source === "chain").length;
  const progress = tasks.length ? `${Math.round((completed / tasks.length) * 100)}%` : "0%";

  return (
    <div className="page-grid">
      <div className="split">
        <ProgressStatCard label="Total Tasks" value={String(tasks.length)} tone="blue" />
        <ProgressStatCard label="Completed" value={String(completed)} tone="lime" />
        <ProgressStatCard label="Pending" value={String(pending)} tone="red" />
        <ProgressStatCard label="Progress" value={progress} tone="violet" />
      </div>
      <section className="panel">
        <div className="panel-inner split">
          <div className="stack">
            <h2 className="section-title">Base Sync</h2>
            <p className="section-copy">{isConnected ? "Wallet connected. Onchain reads are live for the active address." : "Wallet not connected. The board is showing demo or local tasks only."}</p>
          </div>
          <div className="stack">
            <span className="label" style={{ marginBottom: 0 }}>
              Onchain items
            </span>
            <strong className="display-title" style={{ fontSize: "2.6rem" }}>
              {chainItems}
            </strong>
          </div>
        </div>
      </section>
    </div>
  );
}
