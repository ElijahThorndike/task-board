"use client";

import { useRouter } from "next/navigation";
import { BoardHeader } from "@/components/BoardHeader";
import { TaskEditorForm } from "@/components/TaskEditorForm";
import { useTaskBoard } from "@/hooks/useTaskBoard";

export function TaskCreateScreen() {
  const router = useRouter();
  const { createTask, isCreating, isConnected, latestHash } = useTaskBoard();

  return (
    <div className="page">
      <BoardHeader eyebrow="New Task" title="Pin Fresh Work" description="A direct input desk for quick task creation with optional Base sync." />
      <section className="split">
        <div className="panel panel--blue">
          <div className="panel-inner stack">
            <h2 className="section-title">Create Mode</h2>
            <p className="section-copy" style={{ color: "rgba(255,255,255,0.85)" }}>
              Keep the form short. Save locally, or connect a wallet to send the create action onchain.
            </p>
            {latestHash ? (
              <p className="section-copy" style={{ color: "rgba(255,255,255,0.85)" }}>
                Latest tx: {latestHash.slice(0, 10)}...
              </p>
            ) : null}
          </div>
        </div>
        <TaskEditorForm
          canSyncOnchain={isConnected}
          isSaving={isCreating}
          submitLabel="Save task"
          onSubmit={async (values, options) => {
            await createTask(values, options);
            router.push("/tasks");
          }}
        />
      </section>
    </div>
  );
}
