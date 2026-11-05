import type { ChatMessage } from './types';

export const getChat = async (): Promise<ChatMessage[]> => {
  const response = await fetch('/api/v1/messages', { cache: 'no-store' });

  if (!response.ok) {
    throw new Error('Failed to fetch chat messages');
  }

  return response.json();
};
