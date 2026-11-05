import { notFound } from '../../shared/errors/app-error.ts';
import { FolderRepository } from './folder.repository.ts';
import type {
  CreateFolderInput,
  MoveFolderInput,
  UpdateFolderInput,
} from './folder.types.ts';

type FolderRepositoryContract = Pick<
  FolderRepository,
  'create' | 'update' | 'move' | 'delete'
>;

export class FolderService {
  private readonly repository: FolderRepositoryContract;

  constructor(repository: FolderRepositoryContract = new FolderRepository()) {
    this.repository = repository;
  }

  async createFolder(userId: string, input: CreateFolderInput) {
    const folder = await this.repository.create(userId, input);
    if (!folder) throw notFound('Column');
    return folder;
  }

  async updateFolder(userId: string, id: string, input: UpdateFolderInput) {
    const folder = await this.repository.update(userId, id, input);
    if (!folder) throw notFound('Folder');
    return folder;
  }

  async moveFolder(userId: string, id: string, input: MoveFolderInput) {
    const folder = await this.repository.move(userId, id, input);
    if (!folder) throw notFound('Folder');
    return folder;
  }

  async deleteFolder(userId: string, id: string) {
    if (!(await this.repository.delete(userId, id))) throw notFound('Folder');
  }
}
