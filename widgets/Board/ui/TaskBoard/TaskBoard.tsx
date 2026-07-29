import { getColumns, getTaskFolders } from '@/entities/board';
import { getTasks } from '@/entities/board/api/task-api';
import BoardHydrator from '@/widgets/Board/ui/BoardHydrator/BoardHydrator';

type TaskBoardProps = {
  taskId?: string;
};

const TaskBoard = async ({ taskId }: TaskBoardProps) => {
  const [tasksData, columnsData, folders] = await Promise.all([
    getTasks(),
    getColumns(),
    getTaskFolders(),
  ]);

  return (
    <BoardHydrator
      tasks={tasksData}
      columns={columnsData}
      folders={folders}
      taskId={taskId}
    />
  );
};

export default TaskBoard;
