import { TypographyP } from '@dashboard/ui';
import { TypographySmall } from '@dashboard/ui';
import { formatRelativeTime } from '@lib/formatRelativeTime';
import Link from 'next/link';

import { getBoard } from '@/entities/board/api/getBoard';

import { DashboardCard } from './dashboardCard';

const RECENT_TASKS_LIMIT = 5;

export const RecentActivityCard = async () => {
  const { tasks } = await getBoard();

  const recentTasks = [...tasks]
    .sort(
      (a, b) =>
        new Date(b.updatedAt ?? b.createdAt).getTime() -
        new Date(a.updatedAt ?? a.createdAt).getTime()
    )
    .slice(0, RECENT_TASKS_LIMIT);

  return (
    <DashboardCard title="Recent tasks">
      <ul className="flex flex-col gap-1">
        {recentTasks.map((task) => {
          const isEdited = task.updatedAt && task.updatedAt !== task.createdAt;

          return (
            <li key={task.id}>
              <Link
                href={`/tasks?taskId=${task.id}`}
                className="interactive-hover flex items-center justify-between gap-2 rounded-sm px-2 py-1.5">
                <TypographyP text={task.text} className="truncate" />
                <TypographySmall
                  text={`${isEdited ? 'Edited' : 'Added'} ${formatRelativeTime(task.updatedAt ?? task.createdAt)}`}
                  className="text-muted-foreground shrink-0 font-normal"
                />
              </Link>
            </li>
          );
        })}

        {recentTasks.length === 0 && (
          <TypographySmall
            text="No tasks yet"
            className="text-muted-foreground"
          />
        )}
      </ul>
    </DashboardCard>
  );
};
