import { TaskBoard } from '@/widgets/Board';

export default function Tasks() {
  // const { isList, isKanban, isTable } = useViewStore();

  return (
    <div className="overflow-y-auto p-8">
      <TaskBoard />
    </div>
  );
}
