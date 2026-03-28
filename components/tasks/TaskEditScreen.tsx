"use client";

import { useRouter } from "next/navigation";
import { BoardHeader } from "@/components/BoardHeader";
import { TaskEditorForm } from "@/components/TaskEditorForm";
import { ActionBar } from "@/components/ActionBar";
import { useTaskBoard } from "@/hooks/useTaskBoard";

export function TaskEditScreen({ id }: { id: string }) {
  const router = useRouter();
  const { getTaskById, updateTask, isConnected, isCreating, supportsOnchainTaskMutations, contractMode, upgradeContractHint } = useTaskBoard();
  const task = getTaskById(id);

  if (!task) {
    return (
      <div className="page">
        <BoardHeader eyebrow="Edit Task" title="Missing Task" description="Open a task from the wall before editing it." />
        <ActionBar primaryHref="/tasks" primaryLabel="Back to tasks" secondaryHref="/tasks/new" secondaryLabel="Create task" />
      </div>
    );
  }

  return (
    <div className="page">
      <BoardHeader eyebrow="Edit Task" title="Tune The Card" description="Update the title, note, and status in a focused task editor." tone="lime" />
      <section className="split">
        <div className="panel panel--violet">
          <div className="panel-inner stack">
            <h2 className="section-title">Write Path</h2>
            <p className="section-copy" style={{ color: "rgba(255,255,255,0.86)" }}>
              {supportsOnchainTaskMutations
                ? "This contract can write edits onchain. Enable sync below to send a real transaction."
                : "This live contract is still in legacy mode. Edits are local until the V2 address is deployed."}
            </p>
            <p className="section-copy" style={{ color: "rgba(255,255,255,0.86)" }}>
              Contract mode: {contractMode}
            </p>
            {upgradeContractHint ? (
              <p className="section-copy" style={{ color: "rgba(255,255,255,0.86)" }}>
                {upgradeContractHint}
              </p>
            ) : null}
          </div>
        </div>
        <TaskEditorForm
          initialValues={task}
          canSyncOnchain={isConnected && supportsOnchainTaskMutations && typeof task.chainIndex === "number"}
          syncLabel="Send edit onchain"
          syncHint="Use a real Base transaction so the edit can count toward onchain activity."
          isSaving={isCreating}
          submitLabel="Update task"
          onSubmit={async (values, options) => {
            await updateTask(task.id, values, options);
            router.push(`/tasks/${task.id}`);
          }}
        />
      </section>
    </div>
  );
}
