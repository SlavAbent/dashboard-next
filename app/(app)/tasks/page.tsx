import { TaskBoard } from '@/widgets/Board/task-board';

type TasksProps = {
  searchParams: Promise<{ taskId?: string }>;
};

export default async function Tasks({ searchParams }: TasksProps) {
  const { taskId } = await searchParams;

  return (
    <div className="h-full overflow-y-auto p-8">
      <TaskBoard taskId={taskId} />
    </div>
  );
}
