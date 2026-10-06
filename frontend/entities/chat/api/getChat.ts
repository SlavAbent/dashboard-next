import { ChatMessage } from '@/entities/message/model/types/message.types';

export const getChat = async (): Promise<ChatMessage[]> => {
  const response = await fetch('/api/chat');

  if (!response.ok) {
    throw new Error('Failed to fetch chat');
  }

  return response.json();
};
