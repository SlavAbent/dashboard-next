import {
  getTasks,
  getColumns,
  getTasksFolders,
} from '@/entities/board/api/board-api';
import BoardHydrator from '@/widgets/Board/ui/BoardHydrator/BoardHydrator';

const TaskBoard = async () => {
  const tasksData = await getTasks();
  const columnsData = await getColumns();
  const folders = await getTasksFolders();

  return (
    <BoardHydrator tasks={tasksData} columns={columnsData} folders={folders} />
  );
};

export default TaskBoard;
