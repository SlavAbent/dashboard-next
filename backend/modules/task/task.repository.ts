import { prisma } from '../../../lib/prisma.ts';
import { toDatabaseDate } from '../../shared/schedule.ts';
import { toTaskDto } from './task.mapper.ts';
import type {
  CreateTaskInput,
  MoveTaskInput,
  TaskDto,
  UpdateTaskInput,
} from './task.types.ts';

export class TaskRepository {
  async hasDuplicateName(
    userId: string,
    text: string,
    excludeId?: string
  ): Promise<boolean> {
    const task = await prisma.task.findFirst({
      where: {
        text: { equals: text.trim(), mode: 'insensitive' },
        taskFolder: { column: { board: { userId } } },
        ...(excludeId ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    });

    return task !== null;
  }

  async create(
    userId: string,
    input: CreateTaskInput
  ): Promise<TaskDto | null> {
    const folder = await this.findOwnedFolder(userId, input.taskFolderId);
    if (!folder) return null;
    return toTaskDto(
      await prisma.task.create({
        data: {
          ...input,
          startDate: toDatabaseDate(input.startDate),
          endDate: toDatabaseDate(input.endDate),
          priority: input.priority.toUpperCase() as
            | 'NONE'
            | 'LOW'
            | 'MEDIUM'
            | 'HIGH'
            | 'CRITICAL',
        },
      })
    );
  }

  async update(
    userId: string,
    id: string,
    input: UpdateTaskInput
  ): Promise<TaskDto | null> {
    if (input.taskFolderId) {
      const target = await this.findOwnedFolder(userId, input.taskFolderId);
      if (!target) return null;
    }

    const result = await prisma.task.updateMany({
      where: { id, taskFolder: { column: { board: { userId } } } },
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
    input: MoveTaskInput
  ): Promise<TaskDto | null> {
    const target = await this.findOwnedFolder(userId, input.taskFolderId);
    if (!target) return null;

    const result = await prisma.task.updateMany({
      where: { id, taskFolder: { column: { board: { userId } } } },
      data: input,
    });
    return result.count ? this.findById(userId, id) : null;
  }

  async delete(userId: string, id: string): Promise<boolean> {
    const result = await prisma.task.deleteMany({
      where: { id, taskFolder: { column: { board: { userId } } } },
    });
    return result.count > 0;
  }

  private findOwnedFolder(userId: string, id: string) {
    return prisma.taskFolder.findFirst({
      where: { id, column: { board: { userId } } },
      select: { id: true },
    });
  }

  private async findById(userId: string, id: string): Promise<TaskDto | null> {
    const task = await prisma.task.findFirst({
      where: { id, taskFolder: { column: { board: { userId } } } },
    });
    return task ? toTaskDto(task) : null;
  }
}
