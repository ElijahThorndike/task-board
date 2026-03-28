import { BoardHeader } from "@/components/BoardHeader";
import { TasksWall } from "@/components/tasks/TasksWall";

export default function TasksPage() {
  return (
    <div className="page">
      <BoardHeader eyebrow="My Tasks" title="Task Wall" description="A structured wall of active and completed work, built for quick taps and clear status." tone="lime" />
      <TasksWall />
    </div>
  );
}
