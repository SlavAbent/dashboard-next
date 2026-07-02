import { TaskBoard } from '@/widgets/Board/task-board';

export default function Tasks() {
  return (
    <div className="h-full overflow-y-auto p-8">
      <TaskBoard />
    </div>
  );
}
