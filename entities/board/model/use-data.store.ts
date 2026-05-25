'use client';

import { create } from 'zustand';
import {
  Column,
  CreateFolder,
  CreateTask,
  Task,
  TasksFolder,
  UpdateFolderPayload,
} from '@/entities/board/model/types/list-types';
import {
  createFolderTask,
  createTask,
  deleteFolder,
  deleteTask,
  updateFolderDetails,
  updateTask,
} from '@/entities/board/api/board-api';
import { getNextColumn } from '@/entities/board/lib/get-next-column';
import { updateFolders } from '@/entities/board/api/update-folder';
import { sameId, type EntityId } from '@/shared/lib/same-id';

type BoardStore = {
  tasks: Task[];
  tasksFolder: TasksFolder[];
  columns: Column[];

  closedColumns: string[];

  setBoardData: (
    tasks: Task[],
    columns: Column[],
    folders: TasksFolder[]
  ) => void;

  addTask: (task: CreateTask) => Promise<void>;
  editTask: (
    id: EntityId,
    data: Partial<Pick<Task, 'text' | 'tasksFolderId' | 'completed'>>
  ) => Promise<void>;
  toggleTask: (id: EntityId) => Promise<void>;
  removeTask: (id: EntityId) => Promise<void>;

  moveFolder: (id: EntityId, currentColumn: string) => void;
  updateFolder: (id: EntityId, data: UpdateFolderPayload) => void;
  addFolder: (folder: CreateFolder) => Promise<void>;
  removeFolder: (id: EntityId) => Promise<void>;
  toggleColumn: (columnId: string) => void;
};

export const useBoardStore = create<BoardStore>((set, get) => ({
  tasks: [],
  tasksFolder: [],
  columns: [],
  closedColumns: [],

  setBoardData: (tasks, columns, folders) => {
    set({
      tasks: tasks.filter((task) => task.tasksFolderId != null),
      columns,
      tasksFolder: folders,
    });
  },

  moveFolder: async (id, currentColumn) => {
    const nextColumn = getNextColumn(currentColumn);

    const updatedFolder = await updateFolders(id, { columnId: nextColumn });

    set((state) => ({
      tasksFolder: state.tasksFolder.map((folder) =>
        sameId(folder.id, id) ? updatedFolder : folder
      ),
    }));
  },

  updateFolder: async (id, data) => {
    const updatedFolder = await updateFolderDetails(id, data);

    set((state) => ({
      tasksFolder: state.tasksFolder.map((folder) =>
        sameId(folder.id, id) ? updatedFolder : folder
      ),
    }));
  },

  addFolder: async (tasksFolder) => {
    const createFolder = await createFolderTask(tasksFolder);

    set((state) => ({
      tasksFolder: [...state.tasksFolder, createFolder],
    }));
  },

  addTask: async (task) => {
    const createdTask = await createTask(task);

    if (createdTask.tasksFolderId == null) {
      throw new Error('Task was created without folder');
    }

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

    const updatedTask = await updateTask(id, { completed: !task.completed });

    set((state) => ({
      tasks: state.tasks.map((item) =>
        sameId(item.id, id) ? updatedTask : item
      ),
    }));
  },

  removeTask: async (id) => {
    await deleteTask(id);

    set((state) => ({
      tasks: state.tasks.filter((task) => !sameId(task.id, id)),
    }));
  },

  removeFolder: async (id) => {
    const folderTasks = get().tasks.filter((task) =>
      sameId(task.tasksFolderId, id)
    );

    await Promise.all([
      deleteFolder(id),
      ...folderTasks.map((task) => deleteTask(task.id)),
    ]);

    set((state) => ({
      tasksFolder: state.tasksFolder.filter((folder) => !sameId(folder.id, id)),
      tasks: state.tasks.filter((task) => !sameId(task.tasksFolderId, id)),
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
