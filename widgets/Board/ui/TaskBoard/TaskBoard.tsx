import { getTasks } from '@/entities/board/api/task-api';
import BoardHydrator from '@/widgets/Board/ui/BoardHydrator/BoardHydrator';
import { getColumns, getTaskFolders } from '@/entities/board';

const TaskBoard = async () => {
  const tasksData = await getTasks();
  const columnsData = await getColumns();
  const folders = await getTaskFolders();

  return (
    <BoardHydrator tasks={tasksData} columns={columnsData} folders={folders} />
  );
};

export default TaskBoard;
