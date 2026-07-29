import ChatBoard from '@/widgets/Chat/ui/Chat';

type ChatProps = {
  searchParams: Promise<{ messageId?: string }>;
};

export default async function Chat({ searchParams }: ChatProps) {
  const { messageId } = await searchParams;

  return <ChatBoard messageId={messageId} />;
}
