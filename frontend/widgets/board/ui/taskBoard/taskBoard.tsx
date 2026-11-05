import { getBoard } from '@/entities/board/api/getBoard';
import BoardHydrator from '@/widgets/board/ui/boardHydrator/boardHydrator';

type TaskBoardProps = {
  taskId?: string;
};

const TaskBoard = async ({ taskId }: TaskBoardProps) => {
  const { tasks, columns, folders } = await getBoard();

  return (
    <BoardHydrator
      tasks={tasks}
      columns={columns}
      folders={folders}
      taskId={taskId}
    />
  );
};

export default TaskBoard;
