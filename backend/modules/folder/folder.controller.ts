import type { Request, Response } from 'express';

import type { AuthenticatedRequest } from '../../shared/auth/session.ts';
import {
  createFolderSchema,
  folderIdParamsSchema,
  moveFolderSchema,
  updateFolderSchema,
} from './folder.schemas.ts';
import { FolderService } from './folder.service.ts';

export class FolderController {
  private readonly service: FolderService;

  constructor(service = new FolderService()) {
    this.service = service;
  }

  createFolder = async (req: Request, res: Response) => {
    const folder = await this.service.createFolder(
      userId(req),
      createFolderSchema.parse(req.body)
    );
    res.status(201).json(folder);
  };

  updateFolder = async (req: Request, res: Response) => {
    const { id } = folderIdParamsSchema.parse(req.params);
    res.json(
      await this.service.updateFolder(
        userId(req),
        id,
        updateFolderSchema.parse(req.body)
      )
    );
  };

  moveFolder = async (req: Request, res: Response) => {
    const { id } = folderIdParamsSchema.parse(req.params);
    res.json(
      await this.service.moveFolder(
        userId(req),
        id,
        moveFolderSchema.parse(req.body)
      )
    );
  };

  deleteFolder = async (req: Request, res: Response) => {
    const { id } = folderIdParamsSchema.parse(req.params);
    await this.service.deleteFolder(userId(req), id);
    res.sendStatus(204);
  };
}

const userId = (req: Request) => (req as AuthenticatedRequest).user.id;
