import BoardCreate from '../BoardCreate/BoardCreate';
import { getTasks } from '@/shared/_api/board/tasks';
import { getColumns } from '@/shared/_api/board/columns';
import { groupTasks } from '@/widgets/Board/config/groupTasks';

const TaskBoard = async () => {
  const tasksData = await getTasks();
  const columnsData = await getColumns();

  const data = groupTasks(tasksData, columnsData);

  return <BoardCreate boardData={data} />;
};

export default TaskBoard;
