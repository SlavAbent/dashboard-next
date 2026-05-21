import { getTasks } from '@/entities/board/api/tasks';
import { getColumns } from '@/entities/board/api/columns';
import BoardHydrator from '@/widgets/Board/ui/BoardHydrator/BoardHydrator';
import { getFolders } from '@/entities/board/api/getFolders';

const TaskBoard = async () => {
  const tasksData = await getTasks();
  const columnsData = await getColumns();
  const folders = await getFolders();

  return (
    <BoardHydrator tasks={tasksData} columns={columnsData} folders={folders} />
  );
};

export default TaskBoard;
