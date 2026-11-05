import type { ChatMessage } from './types';

export const getChat = async (): Promise<ChatMessage[]> => {
  const response = await fetch('/api/v1/messages', {
    cache: 'no-store',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch chat messages: ${response.status}`);
  }

  return response.json();
};
