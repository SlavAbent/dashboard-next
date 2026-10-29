'use client';

import { type EntityId, sameId } from '@lib/sameId';
import { create } from 'zustand';

import type { Column } from '@/entities/column';
import { getNextColumn } from '@/entities/column';
import type {
  CreateFolder,
  TaskFolder,
  UpdateFolderPayload,
} from '@/entities/folder';
import {
  createFolderTask,
  deleteFolder,
  updateFolderDetails,
  updateFolders,
} from '@/entities/folder/api/folderApi';
import type { CreateTask, Task } from '@/entities/task';
import {
  createTask,
  deleteTask,
  updateTask,
} from '@/entities/task/api/taskApi';

type BoardStore = {
  tasks: Task[];
  taskFolders: TaskFolder[];
  columns: Column[];

  closedColumns: string[];

  setBoardData: (
    tasks: Task[],
    columns: Column[],
    folders: TaskFolder[]
  ) => void;

  addTask: (task: CreateTask) => Promise<void>;
  editTask: (
    id: EntityId,
    data: Partial<Pick<Task, 'text' | 'taskFolderId' | 'completed'>>
  ) => Promise<void>;
  toggleTask: (id: EntityId) => Promise<void>;
  removeTask: (id: EntityId) => Promise<void>;

  moveFolder: (id: EntityId, currentColumn: string) => void;
  updateFolder: (id: EntityId, data: UpdateFolderPayload) => void;
  reorderFolder: (id: EntityId, data: UpdateFolderPayload) => Promise<void>;
  addFolder: (folder: CreateFolder) => Promise<void>;
  removeFolder: (id: EntityId) => Promise<void>;
  toggleColumn: (columnId: string) => void;
};

const reorderQueues = new Map<EntityId, Promise<void>>();
const reorderVersions = new Map<EntityId, number>();
const persistedFolders = new Map<EntityId, TaskFolder>();

export const useBoardStore = create<BoardStore>((set, get) => ({
  tasks: [],
  taskFolders: [],
  columns: [],
  closedColumns: [],

  addTask: async (task) => {
    const createdTask = await createTask(task);

    set((state) => ({
      tasks: [...state.tasks, createdTask],
    }));
  },

  editTask: async (id, data) => {
    const updatedTask = await updateTask(id, data);

    set((state) => ({
      tasks: state.tasks.map((task) =>
        sameId(task.id, id) ? updatedTask : task
      ),
    }));
  },

  toggleTask: async (id) => {
    const task = get().tasks.find((item) => sameId(item.id, id));

    if (!task) return;

    try {
      set((state) => ({
        tasks: state.tasks.map((item) =>
          sameId(item.id, id) ? { ...item, completed: !item.completed } : item
        ),
      }));

      await updateTask(id, {
        completed: !task.completed,
      });
    } catch (error) {
      set((state) => ({
        tasks: state.tasks.map((item) => (sameId(item.id, id) ? task : item)),
      }));
      console.error(error);
    }
  },

  removeTask: async (id) => {
    await deleteTask(id);

    set((state) => ({
      tasks: state.tasks.filter((task) => !sameId(task.id, id)),
    }));
  },

  setBoardData: (tasks, columns, folders) => {
    set({
      tasks,
      columns,
      taskFolders: folders,
    });
  },

  moveFolder: async (id, currentColumn) => {
    const nextColumn = getNextColumn(currentColumn);

    const updatedFolder = await updateFolders(id, { columnId: nextColumn });

    set((state) => ({
      taskFolders: state.taskFolders.map((folder) =>
        sameId(folder.id, id) ? updatedFolder : folder
      ),
    }));
  },

  updateFolder: async (id, data) => {
    const updatedFolder = await updateFolderDetails(id, data);

    set((state) => ({
      taskFolders: state.taskFolders.map((folder) =>
        sameId(folder.id, id) ? updatedFolder : folder
      ),
    }));
  },

  reorderFolder: async (id, data) => {
    const previousFolder = get().taskFolders.find((folder) =>
      sameId(folder.id, id)
    );

    if (!previousFolder) return;

    const previousRequest = reorderQueues.get(id);
    const version = (reorderVersions.get(id) ?? 0) + 1;

    if (!reorderQueues.has(id)) {
      persistedFolders.set(id, previousFolder);
    }

    reorderVersions.set(id, version);

    set((state) => ({
      taskFolders: state.taskFolders.map((folder) =>
        sameId(folder.id, id) ? { ...folder, ...data } : folder
      ),
    }));

    const persistReorder = async () => {
      const updatedFolder = await updateFolderDetails(id, data);
      persistedFolders.set(id, updatedFolder);
    };
    const request = previousRequest
      ? previousRequest.catch(() => undefined).then(persistReorder)
      : persistReorder();

    reorderQueues.set(id, request);

    try {
      await request;
    } catch (error) {
      const persistedFolder = persistedFolders.get(id);

      if (persistedFolder && reorderVersions.get(id) === version) {
        set((state) => ({
          taskFolders: state.taskFolders.map((folder) =>
            sameId(folder.id, id) ? persistedFolder : folder
          ),
        }));
      }

      throw error;
    } finally {
      if (reorderQueues.get(id) === request) {
        reorderQueues.delete(id);
        reorderVersions.delete(id);
        persistedFolders.delete(id);
      }
    }
  },

  addFolder: async (folder) => {
    const createdFolder = await createFolderTask(folder);

    set((state) => ({
      taskFolders: [...state.taskFolders, createdFolder],
    }));
  },

  removeFolder: async (id) => {
    await deleteFolder(id);

    set((state) => ({
      taskFolders: state.taskFolders.filter((folder) => !sameId(folder.id, id)),
      tasks: state.tasks.filter((task) => !sameId(task.taskFolderId, id)),
    }));
  },

  toggleColumn: (columnId) =>
    set((state) => {
      const isClosed = state.closedColumns.includes(columnId);

      return {
        closedColumns: isClosed
          ? state.closedColumns.filter((id) => id !== columnId)
          : [...state.closedColumns, columnId],
      };
    }),
}));
