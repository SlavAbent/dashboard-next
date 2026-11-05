import type { Request, Response } from 'express';

import { ChatService } from './chat.service.ts';

export class ChatController {
  private readonly service: ChatService;

  constructor(service = new ChatService()) {
    this.service = service;
  }

  getMessages = async (_req: Request, res: Response) => {
    res.json(await this.service.getMessages());
  };
}
