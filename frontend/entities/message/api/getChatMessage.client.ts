import type { ChatMessage } from '@/entities/message/model/types/message.types';

export const getChatMessagesClient = async (): Promise<ChatMessage[]> => {
  const response = await fetch('/api/chat', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch chat messages');
  }

  return response.json();
};
