import { getColumns, getTaskFolders } from '@/entities/board';
import { getTasks } from '@/entities/board/api/task-api';
import BoardHydrator from '@/widgets/Board/ui/BoardHydrator/BoardHydrator';

const TaskBoard = async () => {
  const [tasksData, columnsData, folders] = await Promise.all([
    getTasks(),
    getColumns(),
    getTaskFolders(),
  ]);

  return (
    <BoardHydrator tasks={tasksData} columns={columnsData} folders={folders} />
  );
};

export default TaskBoard;
