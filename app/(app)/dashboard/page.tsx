import {
  BoardColumnsCard,
  ClockCard,
  PomodoroCard,
  RecentActivityCard,
  RecentMessagesCard,
  TaskProgressCard,
  WeatherCard,
} from '@/widgets/dashboard';

export default function Dashboard() {
  return (
    <div className="grid grid-cols-12 gap-4 p-8">
      <div className="col-span-3">
        <ClockCard />
      </div>
      <div className="col-span-3">
        <PomodoroCard />
      </div>
      <div className="col-span-3">
        <WeatherCard />
      </div>
      <div className="col-span-3">
        <BoardColumnsCard />
      </div>
      <div className="col-span-6">
        <TaskProgressCard />
      </div>
      <div className="col-span-6">
        <RecentActivityCard />
      </div>
      <div className="col-span-6">
        <RecentMessagesCard />
      </div>
    </div>
  );
}
