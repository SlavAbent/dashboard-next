import { cookies } from 'next/headers';

import type { ChatMessage } from './types';

export const getChatMessages = async (): Promise<ChatMessage[]> => {
  const cookieStore = await cookies();
  const port = process.env.PORT ?? '3000';
  const origin = process.env.APP_ORIGIN ?? `http://localhost:${port}`;
  const response = await fetch(`${origin}/api/v1/messages`, {
    headers: { cookie: cookieStore.toString() },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch chat messages: ${response.status}`);
  }

  return response.json();
};
