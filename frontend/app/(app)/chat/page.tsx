import { ChatBoard } from '@dashboard/chat';

type ChatProps = {
  searchParams: Promise<{ messageId?: string }>;
};

export default async function Chat({ searchParams }: ChatProps) {
  const { messageId } = await searchParams;

  return <ChatBoard messageId={messageId} />;
}
