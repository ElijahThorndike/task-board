"use client";

import { useRouter } from "next/navigation";
import { BoardHeader } from "@/components/BoardHeader";
import { TaskEditorForm } from "@/components/TaskEditorForm";
import { useTaskBoard } from "@/hooks/useTaskBoard";

export function TaskCreateScreen() {
  const router = useRouter();
  const { createTask, isCreating, isConnected, latestHash, supportsOnchainTaskMutations, contractMode, upgradeContractHint } = useTaskBoard();

  return (
    <div className="page">
      <BoardHeader eyebrow="New Task" title="Pin Fresh Work" description="A direct input desk for quick task creation with optional Base sync." />
      <section className="split">
        <div className="panel panel--blue">
          <div className="panel-inner stack">
            <h2 className="section-title">Create Mode</h2>
            <p className="section-copy" style={{ color: "rgba(255,255,255,0.85)" }}>
              {supportsOnchainTaskMutations
                ? "Create, edit, and status changes can all be sent as real Base transactions."
                : "This live contract supports onchain create only. Edit and status writes become onchain after the V2 contract is deployed."}
            </p>
            <p className="section-copy" style={{ color: "rgba(255,255,255,0.85)" }}>
              Contract mode: {contractMode}
            </p>
            {upgradeContractHint ? (
              <p className="section-copy" style={{ color: "rgba(255,255,255,0.85)" }}>
                {upgradeContractHint}
              </p>
            ) : null}
            {latestHash ? (
              <p className="section-copy" style={{ color: "rgba(255,255,255,0.85)" }}>
                Latest tx: {latestHash.slice(0, 10)}...
              </p>
            ) : null}
          </div>
        </div>
        <TaskEditorForm
          canSyncOnchain={isConnected}
          syncLabel="Send create onchain"
          syncHint="Use a real Base transaction so the action can count toward onchain activity."
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
