import type { Request, Response } from 'express';

import type { AuthenticatedRequest } from '../../shared/auth/session.ts';
import { BoardService } from './board.service.ts';

export class BoardController {
  private readonly service: BoardService;

  constructor(service = new BoardService()) {
    this.service = service;
  }

  getBoard = async (req: Request, res: Response) => {
    res.json(await this.service.getBoard(userId(req)));
  };
}

const userId = (req: Request) => (req as AuthenticatedRequest).user.id;
