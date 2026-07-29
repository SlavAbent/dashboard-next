import { getColumns, getTaskFolders } from '@/entities/board';
import { getTasks } from '@/entities/board/api/taskApi';
import BoardHydrator from '@/widgets/board/ui/boardHydrator/boardHydrator';

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
