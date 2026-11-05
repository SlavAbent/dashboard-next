import { ChatBoard } from '@dashboard/chat';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';

type ChatProps = {
  searchParams: Promise<{ messageId?: string }>;
};

export default async function Chat({ searchParams }: ChatProps) {
  const { messageId } = await searchParams;
  const session = await auth();

  if (!session?.user?.id) redirect('/login');

  const [firstName = 'User', ...lastName] = (session.user.name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return (
    <ChatBoard
      messageId={messageId}
      currentUser={{
        id: session.user.id,
        firstName,
        lastName: lastName.join(' '),
      }}
    />
  );
}
