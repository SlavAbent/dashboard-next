import BoardCreate from '../BoardCreate/BoardCreate';
import { getTasks } from '@/shared/_api/board/tasks';
import { getColumns } from '@/shared/_api/board/columns';
import { BoardColumn, Column, Task } from '@/widgets/Board/types';

const TaskBoard = async () => {
  const tasksData = await getTasks();
  const columnsData = await getColumns();

  function groupTasks(tasks: Task[], columns: Column[]): BoardColumn[] {
    const columnsMap: Record<string, BoardColumn> = {};

    for (const column of columns) {
      columnsMap[column.id] = {
        id: column.id,
        title: column.title,
        order: column.order,
        tasks: [],
      };
    }

    for (const task of tasks) {
      if (!columnsMap[task.column]) {
        columnsMap[task.column] = {
          id: task.column,
          title: task.text,
          order: 999,
          tasks: [],
        };
      }

      columnsMap[task.column].tasks.push(task);
    }

    return Object.values(columnsMap).sort((a, b) => a.order - b.order);
  }

  const data = groupTasks(tasksData, columnsData);

  return <BoardCreate boardData={data} />;
};

export default TaskBoard;
