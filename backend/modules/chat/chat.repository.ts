import { prisma } from '../../../lib/prisma.ts';
import type { ChatMessage } from './chat.types.ts';

export class ChatRepository {
  async findAll(): Promise<ChatMessage[]> {
    const messages = await prisma.message.findMany({
      orderBy: { createdAt: 'asc' },
      include: { user: { select: { id: true, name: true } } },
    });
    return messages.map(toChatMessage);
  }

  async create(userId: string, text: string): Promise<ChatMessage> {
    const message = await prisma.message.create({
      data: { userId, text },
      include: { user: { select: { id: true, name: true } } },
    });
    return toChatMessage(message);
  }
}

const toChatMessage = (message: {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
  user: { id: string; name: string | null };
}): ChatMessage => {
  const [firstName = 'User', ...lastName] = (message.user.name ?? '')
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  return {
    id: message.id,
    userId: message.userId,
    text: message.text,
    createdAt: message.createdAt.toISOString(),
    author: { id: message.user.id, firstName, lastName: lastName.join(' ') },
  };
};
