import BoardCreate from '../BoardCreate/BoardCreate';
import { getTasks } from '@/entities/board/api/tasks';
import { getColumns } from '@/entities/board/api/columns';
import { groupTasks } from '@/widgets/Board/config/groupTasks';

const TaskBoard = async () => {
  const tasksData = await getTasks();
  const columnsData = await getColumns();

  const data = groupTasks(tasksData, columnsData);

  return <BoardCreate boardData={data} />;
};

export default TaskBoard;
