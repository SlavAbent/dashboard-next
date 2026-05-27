import { ChatMessage } from '@/entities/message/types/message.types';
import { messages } from '@/shared/_api/instances';

export const getMessage = async (): Promise<ChatMessage[]> => {
  const response = await fetch(messages);

  return response.json();
};
