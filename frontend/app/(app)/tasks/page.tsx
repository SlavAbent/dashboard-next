import { TaskBoard } from '@/widgets/board/taskBoard';

type TasksProps = {
  searchParams: Promise<{ taskId?: string; folderId?: string }>;
};

export default async function Tasks({ searchParams }: TasksProps) {
  const { taskId, folderId } = await searchParams;

  return (
    <div className="h-full min-w-0 overflow-y-auto p-3 sm:p-4 md:p-8">
      <TaskBoard taskId={taskId} folderId={folderId} />
    </div>
  );
}
