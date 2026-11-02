import { useBoardStore } from '@/entities/board/model/useData.store';
import {
  createFolderTask,
  deleteFolder,
  updateFolderDetails,
  updateFolders,
} from '@/entities/folder/api/folderApi';
import {
  createTask,
  deleteTask,
  updateTask,
} from '@/entities/task/api/taskApi';

jest.mock('@/entities/folder/api/folderApi', () => ({
  createFolderTask: jest.fn(),
  deleteFolder: jest.fn(),
  updateFolderDetails: jest.fn(),
  updateFolders: jest.fn(),
}));

jest.mock('@/entities/task/api/taskApi', () => ({
  createTask: jest.fn(),
  deleteTask: jest.fn(),
  updateTask: jest.fn(),
}));

const mockedCreateFolderTask = jest.mocked(createFolderTask);
const mockedDeleteFolder = jest.mocked(deleteFolder);
const mockedUpdateFolderDetails = jest.mocked(updateFolderDetails);
const mockedUpdateFolders = jest.mocked(updateFolders);
const mockedCreateTask = jest.mocked(createTask);
const mockedDeleteTask = jest.mocked(deleteTask);
const mockedUpdateTask = jest.mocked(updateTask);

const initialFolder = {
  id: 'folder-1',
  columnId: 'todo',
  title: 'Folder',
  order: 1,
};

const initialTask = {
  id: 'task-1',
  text: 'Task',
  tags: [],
  completed: false,
  taskFolderId: initialFolder.id,
  order: 1,
  createdAt: '2026-01-01T00:00:00.000Z',
};

describe('useBoardStore folder mutations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useBoardStore.setState({
      tasks: [initialTask],
      taskFolders: [initialFolder],
      columns: [],
      closedColumns: [],
    });
  });

  it('optimistically reorders a folder with one store update and one request', async () => {
    let resolveUpdate: (folder: typeof initialFolder) => void = () => undefined;
    const updatePromise = new Promise<typeof initialFolder>((resolve) => {
      resolveUpdate = resolve;
    });
    mockedUpdateFolderDetails.mockReturnValue(updatePromise);
    const listener = jest.fn();
    const unsubscribe = useBoardStore.subscribe(listener);

    const result = useBoardStore.getState().reorderFolder(initialFolder.id, {
      columnId: 'in-progress',
      order: 1.5,
    });

    expect(useBoardStore.getState().taskFolders[0]).toEqual({
      ...initialFolder,
      columnId: 'in-progress',
      order: 1.5,
    });
    expect(listener).toHaveBeenCalledTimes(1);
    expect(mockedUpdateFolderDetails).toHaveBeenCalledTimes(1);

    resolveUpdate({
      ...initialFolder,
      columnId: 'in-progress',
      order: 1.5,
    });
    await result;

    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });

  it('rolls an optimistic reorder back when the request fails', async () => {
    mockedUpdateFolderDetails.mockRejectedValue(new Error('Network error'));

    await expect(
      useBoardStore.getState().reorderFolder(initialFolder.id, {
        columnId: 'in-progress',
        order: 1.5,
      })
    ).rejects.toThrow('Network error');

    expect(useBoardStore.getState().taskFolders[0]).toEqual(initialFolder);
  });

  it('serializes rapid reorders and keeps the latest optimistic state', async () => {
    let resolveFirst: (folder: typeof initialFolder) => void = () => undefined;
    let resolveSecond: (folder: typeof initialFolder) => void = () => undefined;
    const firstRequest = new Promise<typeof initialFolder>((resolve) => {
      resolveFirst = resolve;
    });
    const secondRequest = new Promise<typeof initialFolder>((resolve) => {
      resolveSecond = resolve;
    });
    mockedUpdateFolderDetails
      .mockReturnValueOnce(firstRequest)
      .mockReturnValueOnce(secondRequest);

    const firstReorder = useBoardStore
      .getState()
      .reorderFolder(initialFolder.id, { order: 1.5 });
    const secondReorder = useBoardStore
      .getState()
      .reorderFolder(initialFolder.id, { order: 1.75 });

    expect(useBoardStore.getState().taskFolders[0]?.order).toBe(1.75);
    expect(mockedUpdateFolderDetails).toHaveBeenCalledTimes(1);

    resolveFirst({ ...initialFolder, order: 1.5 });
    await firstReorder;
    await Promise.resolve();

    expect(mockedUpdateFolderDetails).toHaveBeenCalledTimes(2);
    expect(useBoardStore.getState().taskFolders[0]?.order).toBe(1.75);

    resolveSecond({ ...initialFolder, order: 1.75 });
    await secondReorder;

    expect(useBoardStore.getState().taskFolders[0]?.order).toBe(1.75);
  });

  it('does not let an older failed reorder roll back a newer state', async () => {
    let rejectFirst: (error: Error) => void = () => undefined;
    let resolveSecond: (folder: typeof initialFolder) => void = () => undefined;
    const firstRequest = new Promise<typeof initialFolder>((_, reject) => {
      rejectFirst = reject;
    });
    const secondRequest = new Promise<typeof initialFolder>((resolve) => {
      resolveSecond = resolve;
    });
    mockedUpdateFolderDetails
      .mockReturnValueOnce(firstRequest)
      .mockReturnValueOnce(secondRequest);

    const firstReorder = useBoardStore
      .getState()
      .reorderFolder(initialFolder.id, { order: 1.5 });
    const secondReorder = useBoardStore
      .getState()
      .reorderFolder(initialFolder.id, { order: 1.75 });

    rejectFirst(new Error('First request failed'));
    await expect(firstReorder).rejects.toThrow('First request failed');
    await Promise.resolve();

    expect(mockedUpdateFolderDetails).toHaveBeenCalledTimes(2);
    expect(useBoardStore.getState().taskFolders[0]?.order).toBe(1.75);

    resolveSecond({ ...initialFolder, order: 1.75 });
    await secondReorder;

    expect(useBoardStore.getState().taskFolders[0]?.order).toBe(1.75);
  });

  it('deletes a folder and its local tasks after one cascade request', async () => {
    mockedDeleteFolder.mockResolvedValue(true);
    const listener = jest.fn();
    const unsubscribe = useBoardStore.subscribe(listener);

    await useBoardStore.getState().removeFolder(initialFolder.id);

    expect(mockedDeleteFolder).toHaveBeenCalledTimes(1);
    expect(mockedDeleteFolder).toHaveBeenCalledWith(initialFolder.id);
    expect(mockedDeleteTask).not.toHaveBeenCalled();
    expect(useBoardStore.getState().taskFolders).toEqual([]);
    expect(useBoardStore.getState().tasks).toEqual([]);
    expect(listener).toHaveBeenCalledTimes(1);
    unsubscribe();
  });

  it('preserves local data when cascade deletion fails', async () => {
    mockedDeleteFolder.mockRejectedValue(new Error('Network error'));

    await expect(
      useBoardStore.getState().removeFolder(initialFolder.id)
    ).rejects.toThrow('Network error');

    expect(useBoardStore.getState().taskFolders).toEqual([initialFolder]);
    expect(useBoardStore.getState().tasks).toEqual([initialTask]);
  });

  afterAll(() => {
    mockedCreateFolderTask.mockReset();
    mockedUpdateFolders.mockReset();
    mockedCreateTask.mockReset();
    mockedUpdateTask.mockReset();
  });
});
