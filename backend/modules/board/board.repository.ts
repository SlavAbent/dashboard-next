import { prisma } from '../../../lib/prisma.ts';
import { toFolderDto } from '../folder/folder.mapper.ts';
import { toTaskDto } from '../task/task.mapper.ts';
import { boardTemplate } from './board.template.ts';
import type { BoardSnapshot } from './board.types.ts';

const boardInclude = {
  columns: {
    orderBy: { order: 'asc' as const },
    include: {
      folders: {
        orderBy: { order: 'asc' as const },
        include: { tasks: { orderBy: { order: 'asc' as const } } },
      },
    },
  },
} as const;

export class BoardRepository {
  async findSnapshot(userId: string): Promise<BoardSnapshot | null> {
    const board = await prisma.board.findUnique({
      where: { userId },
      include: boardInclude,
    });

    if (!board) return null;

    return {
      columns: board.columns.map((column) => ({
        id: column.key,
        title: column.title,
        order: column.order,
        color: column.color,
      })),
      folders: board.columns.flatMap((column) =>
        column.folders.map((folder) => toFolderDto(folder, column.key))
      ),
      tasks: board.columns.flatMap((column) =>
        column.folders.flatMap((folder) => folder.tasks.map(toTaskDto))
      ),
    };
  }

  async createDefaultBoard(userId: string): Promise<void> {
    await prisma.$transaction(async (tx) => {
      const board = await tx.board.create({ data: { userId } });
      const columns = new Map<string, string>();
      const folders = new Map<string, string>();

      for (const column of boardTemplate.columns) {
        const created = await tx.boardColumn.create({
          data: {
            boardId: board.id,
            key: column.id,
            title: column.title,
            order: column.order,
            color: column.color,
          },
        });
        columns.set(column.id, created.id);
      }

      for (const folder of boardTemplate.folders) {
        const columnId = columns.get(folder.columnId);
        if (!columnId)
          throw new Error(`Unknown template column: ${folder.columnId}`);
        const created = await tx.taskFolder.create({
          data: {
            columnId,
            title: folder.title,
            order: folder.order,
            startDate: folder.startDate,
            endDate: folder.endDate,
            priority: folder.priority.toUpperCase() as
              | 'NONE'
              | 'LOW'
              | 'MEDIUM'
              | 'HIGH'
              | 'CRITICAL',
          },
        });
        folders.set(folder.templateId, created.id);
      }

      for (const task of boardTemplate.tasks) {
        const taskFolderId = folders.get(task.folderTemplateId);
        if (!taskFolderId)
          throw new Error(`Unknown template folder: ${task.folderTemplateId}`);
        await tx.task.create({
          data: {
            taskFolderId,
            text: task.text,
            tags: task.tags,
            completed: task.completed,
            order: task.order,
            startDate: task.startDate,
            endDate: task.endDate,
            priority: task.priority.toUpperCase() as
              | 'NONE'
              | 'LOW'
              | 'MEDIUM'
              | 'HIGH'
              | 'CRITICAL',
          },
        });
      }
    });
  }
}
