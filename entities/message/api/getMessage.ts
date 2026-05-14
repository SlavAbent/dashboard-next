import { ChatMessage } from '@/entities/message/types/message.types';

export const getMessage = async (): Promise<ChatMessage[]> => {
  const response = await fetch('http://localhost:4001/messages');

  return response.json();
};
