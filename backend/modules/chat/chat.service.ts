import { z } from 'zod';

import { ChatRepository } from './chat.repository.ts';

const messageSchema = z.object({ text: z.string().trim().min(1).max(2000) });

export class ChatService {
  private readonly repository: Pick<ChatRepository, 'findAll' | 'create'>;

  constructor(repository: ChatService['repository'] = new ChatRepository()) {
    this.repository = repository;
  }

  getMessages() {
    return this.repository.findAll();
  }

  createMessage(userId: string, input: unknown) {
    const { text } = messageSchema.parse(input);
    return this.repository.create(userId, text);
  }
}
