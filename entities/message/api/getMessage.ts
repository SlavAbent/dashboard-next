import { ChatMessage } from '@/entities/message/model/types/message.types';
import { messagesApi } from '@/shared/api/instances';

export const getMessage = async (): Promise<ChatMessage[]> => {
  const response = await fetch(messagesApi, {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch messages');
  }

  return response.json();
};
