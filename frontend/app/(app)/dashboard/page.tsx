import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import {
  BoardColumnsCard,
  ClockCard,
  PomodoroCard,
  RecentActivityCard,
  RecentMessagesCard,
  TaskProgressCard,
  WeatherCard,
} from '@/widgets/dashboard';

export default async function Dashboard() {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:p-4 xl:grid-cols-12 xl:p-8">
      <div className="min-w-0 sm:col-span-1 xl:col-span-3">
        <ClockCard />
      </div>
      <div className="min-w-0 sm:col-span-1 xl:col-span-3">
        <PomodoroCard />
      </div>
      <div className="min-w-0 sm:col-span-1 xl:col-span-3">
        <WeatherCard />
      </div>
      <div className="min-w-0 sm:col-span-1 xl:col-span-3">
        <BoardColumnsCard />
      </div>
      <div className="min-w-0 sm:col-span-2 xl:col-span-6">
        <TaskProgressCard />
      </div>
      <div className="min-w-0 sm:col-span-2 xl:col-span-6">
        <RecentActivityCard />
      </div>
      <div className="min-w-0 sm:col-span-2 xl:col-span-6">
        <RecentMessagesCard />
      </div>
    </div>
  );
}
