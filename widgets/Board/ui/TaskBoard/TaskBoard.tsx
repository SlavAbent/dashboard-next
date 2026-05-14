import { getTasks } from '@/entities/board/api/tasks';
import { getColumns } from '@/entities/board/api/columns';
import BoardHydrator from '@/widgets/Board/ui/BoardHydrator/BoardHydrator';

const TaskBoard = async () => {
  const tasksData = await getTasks();
  const columnsData = await getColumns();

  return <BoardHydrator tasks={tasksData} columns={columnsData} />;
};

export default TaskBoard;
