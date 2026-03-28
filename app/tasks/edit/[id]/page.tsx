import { TaskEditScreen } from "@/components/tasks/TaskEditScreen";

export default async function EditTaskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <TaskEditScreen id={id} />;
}
