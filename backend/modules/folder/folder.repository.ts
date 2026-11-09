import { prisma } from '../../../lib/prisma.ts';
import { toDatabaseDate } from '../../shared/schedule.ts';
import { toFolderDto } from './folder.mapper.ts';
import type {
  CreateFolderInput,
  FolderDto,
  MoveFolderInput,
  UpdateFolderInput,
} from './folder.types.ts';

export class FolderRepository {
  async create(
    userId: string,
    input: CreateFolderInput
  ): Promise<FolderDto | null> {
    const column = await this.findOwnedColumn(userId, input.columnId);
    if (!column) return null;

    const folder = await prisma.taskFolder.create({
      data: {
        columnId: column.id,
        title: input.title,
        order: input.order,
        startDate: toDatabaseDate(input.startDate),
        endDate: toDatabaseDate(input.endDate),
        priority: input.priority.toUpperCase() as
          | 'NONE'
          | 'LOW'
          | 'MEDIUM'
          | 'HIGH'
          | 'CRITICAL',
      },
    });
    return toFolderDto(folder, column.key);
  }

  async update(
    userId: string,
    id: string,
    input: UpdateFolderInput
  ): Promise<FolderDto | null> {
    const result = await prisma.taskFolder.updateMany({
      where: { id, column: { board: { userId } } },
      data: {
        ...input,
        startDate: toDatabaseDate(input.startDate),
        endDate: toDatabaseDate(input.endDate),
        priority: input.priority?.toUpperCase() as
          | 'NONE'
          | 'LOW'
          | 'MEDIUM'
          | 'HIGH'
          | 'CRITICAL'
          | undefined,
      },
    });
    return result.count ? this.findById(userId, id) : null;
  }

  async move(
    userId: string,
    id: string,
    input: MoveFolderInput
  ): Promise<FolderDto | null> {
    const target = await this.findOwnedColumn(userId, input.columnId);
    if (!target) return null;

    const result = await prisma.taskFolder.updateMany({
      where: { id, column: { board: { userId } } },
      data: {
        columnId: target.id,
        ...(input.order === undefined ? {} : { order: input.order }),
      },
    });
    return result.count ? this.findById(userId, id) : null;
  }

  async delete(userId: string, id: string): Promise<boolean> {
    const result = await prisma.taskFolder.deleteMany({
      where: { id, column: { board: { userId } } },
    });
    return result.count > 0;
  }

  private findOwnedColumn(userId: string, key: string) {
    return prisma.boardColumn.findFirst({ where: { key, board: { userId } } });
  }

  private async findById(
    userId: string,
    id: string
  ): Promise<FolderDto | null> {
    const folder = await prisma.taskFolder.findFirst({
      where: { id, column: { board: { userId } } },
      include: { column: { select: { key: true } } },
    });
    return folder ? toFolderDto(folder, folder.column.key) : null;
  }
}
