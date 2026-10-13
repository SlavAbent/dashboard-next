import Link from 'next/link';

import { getChatMessages } from '@/entities/message/api/getChatMessage.server';
import { TypographyP } from '@/shared/components/typography/typographyP';
import { TypographySmall } from '@/shared/components/typography/typographySmall';

import { formatRelativeTime } from '../../../../lib/formatRelativeTime';
import { DashboardCard } from './dashboardCard';

const RECENT_MESSAGES_LIMIT = 3;

export const RecentMessagesCard = async () => {
  const messages = await getChatMessages();

  const recentMessages = [...messages]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, RECENT_MESSAGES_LIMIT);

  return (
    <DashboardCard title="Recent chat messages">
      <ul className="flex flex-col gap-1">
        {recentMessages.map((message) => {
          const authorName = message.author
            ? `${message.author.firstName} ${message.author.lastName}`
            : 'Unknown user';

          return (
            <li key={message.id}>
              <Link
                href={`/chat?messageId=${message.id}`}
                className="interactive-hover flex flex-col gap-0.5 rounded-sm px-2 py-1.5">
                <div className="flex items-center justify-between gap-2">
                  <TypographySmall text={authorName} />
                  <TypographySmall
                    text={formatRelativeTime(message.createdAt)}
                    className="text-muted-foreground font-normal"
                  />
                </div>
                <TypographyP text={message.text} className="truncate text-sm" />
              </Link>
            </li>
          );
        })}

        {recentMessages.length === 0 && (
          <TypographySmall
            text="No messages yet"
            className="text-muted-foreground"
          />
        )}
      </ul>
    </DashboardCard>
  );
};
