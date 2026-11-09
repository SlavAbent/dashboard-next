import {
  deleteFolder,
  updateFolderDetails,
} from '@/entities/folder/api/folderApi';

describe('deleteFolder', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('requests cascade deletion from the board API', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock;

    await deleteFolder('folder-1');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith('/api/v1/board/folders/folder-1', {
      method: 'DELETE',
    });
  });
});

describe('updateFolderDetails', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('sends schedule fields to the details endpoint without columnId', async () => {
    const response = {
      id: 'folder-1',
      columnId: 'todo',
      title: 'Release',
      order: 1,
      startDate: '2026-11-05',
      endDate: '2026-11-12',
      priority: 'high' as const,
    };
    const fetchMock = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => response,
    });
    global.fetch = fetchMock;

    await expect(
      updateFolderDetails('folder-1', {
        columnId: 'in-progress',
        title: 'Release',
        startDate: '2026-11-05',
        endDate: '2026-11-12',
        priority: 'high',
      })
    ).resolves.toEqual(response);

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/v1/board/folders/folder-1',
      expect.objectContaining({
        method: 'PATCH',
        body: JSON.stringify({
          title: 'Release',
          startDate: '2026-11-05',
          endDate: '2026-11-12',
          priority: 'high',
        }),
      })
    );
  });
});
