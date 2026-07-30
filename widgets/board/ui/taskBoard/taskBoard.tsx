import { getColumns } from '@/entities/column';
import { getTaskFolders } from '@/entities/folder';
import { getTasks } from '@/entities/task';
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
