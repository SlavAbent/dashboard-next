import { getBoard } from '@/entities/board/api/getBoard';
import BoardHydrator from '@/widgets/board/ui/boardHydrator/boardHydrator';

type TaskBoardProps = {
  taskId?: string;
  folderId?: string;
};

const TaskBoard = async ({ taskId, folderId }: TaskBoardProps) => {
  const { tasks, columns, folders } = await getBoard();

  return (
    <BoardHydrator
      tasks={tasks}
      columns={columns}
      folders={folders}
      taskId={taskId}
      folderId={folderId}
    />
  );
};

export default TaskBoard;
