import { getBoard } from '@/entities/board/api/getBoard';
import { CalendarHydrator } from '@/widgets/calendar/ui/calendarHydrator';

export const CalendarPage = async () => {
  const { tasks, columns, folders } = await getBoard();

  return <CalendarHydrator tasks={tasks} columns={columns} folders={folders} />;
};
