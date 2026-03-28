"use client";

import { useRouter } from "next/navigation";
import { BoardHeader } from "@/components/BoardHeader";
import { TaskEditorForm } from "@/components/TaskEditorForm";
import { ActionBar } from "@/components/ActionBar";
import { useTaskBoard } from "@/hooks/useTaskBoard";

export function TaskEditScreen({ id }: { id: string }) {
  const router = useRouter();
  const { getTaskById, updateTask } = useTaskBoard();
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
      <BoardHeader eyebrow="Edit Task" title="Tune The Card" description="Update the title, note, and local status without leaving the board flow." tone="lime" />
      <section className="split">
        <div className="panel panel--violet">
          <div className="panel-inner stack">
            <h2 className="section-title">Overlay Edit</h2>
            <p className="section-copy" style={{ color: "rgba(255,255,255,0.86)" }}>
              The current contract supports create and read. Edits here are stored as a local overlay for fast iteration.
            </p>
          </div>
        </div>
        <TaskEditorForm
          initialValues={task}
          submitLabel="Update task"
          onSubmit={(values) => {
            updateTask(task.id, values);
            router.push(`/tasks/${task.id}`);
          }}
        />
      </section>
    </div>
  );
}
