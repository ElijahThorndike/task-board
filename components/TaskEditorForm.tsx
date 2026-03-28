"use client";

import { useState } from "react";
import type { TaskEditorValues, TaskItem } from "@/lib/types";

type TaskEditorFormProps = {
  initialValues?: TaskItem;
  canSyncOnchain?: boolean;
  isSaving?: boolean;
  submitLabel: string;
  onSubmit: (values: TaskEditorValues, options?: { syncOnchain?: boolean }) => Promise<void> | void;
};

export function TaskEditorForm({ initialValues, canSyncOnchain, isSaving, submitLabel, onSubmit }: TaskEditorFormProps) {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [note, setNote] = useState(initialValues?.note ?? "");
  const [priority, setPriority] = useState<TaskEditorValues["priority"]>(initialValues?.priority ?? "focus");
  const [status, setStatus] = useState<TaskEditorValues["status"]>(initialValues?.status ?? "pending");
  const [syncOnchain, setSyncOnchain] = useState(Boolean(canSyncOnchain && !initialValues));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSubmit({ title, note, priority, status }, { syncOnchain });
  }

  return (
    <form className="panel" onSubmit={handleSubmit}>
      <div className="panel-inner stack">
        <div>
          <label className="label" htmlFor="task-title">
            Title
          </label>
          <input id="task-title" className="input" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Write a short task title" required maxLength={60} />
        </div>
        <div>
          <label className="label" htmlFor="task-note">
            Note
          </label>
          <textarea id="task-note" className="textarea" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Add a short note" maxLength={220} />
        </div>
        <div className="split">
          <div>
            <label className="label" htmlFor="task-priority">
              Priority
            </label>
            <select id="task-priority" className="select" value={priority} onChange={(event) => setPriority(event.target.value as TaskEditorValues["priority"])}>
              <option value="critical">Critical</option>
              <option value="focus">Focus</option>
              <option value="steady">Steady</option>
            </select>
          </div>
          <div>
            <label className="label" htmlFor="task-status">
              Status
            </label>
            <select id="task-status" className="select" value={status} onChange={(event) => setStatus(event.target.value as TaskEditorValues["status"])}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        {canSyncOnchain && !initialValues ? (
          <label className="panel panel--lime" style={{ display: "block", boxShadow: "4px 4px 0 #111111", cursor: "pointer" }}>
            <div className="panel-inner" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input type="checkbox" checked={syncOnchain} onChange={(event) => setSyncOnchain(event.target.checked)} />
              <div className="stack" style={{ gap: 4 }}>
                <strong className="label" style={{ margin: 0 }}>
                  Sync create to Base
                </strong>
                <p className="section-copy" style={{ color: "#111111" }}>
                  Edits and status changes stay in your local overlay until the contract adds update methods.
                </p>
              </div>
            </div>
          </label>
        ) : null}
        <button className="btn btn--primary" type="submit" disabled={isSaving}>
          {isSaving ? "Saving" : submitLabel}
        </button>
      </div>
    </form>
  );
}
