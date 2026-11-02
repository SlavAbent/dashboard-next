import { deleteFolder } from '@/entities/folder/api/folderApi';

describe('deleteFolder', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('requests deletion of the folder and its dependent tasks', async () => {
    const fetchMock = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = fetchMock;

    await deleteFolder('folder-1');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      '/mock-api/taskFolders/folder-1?_dependent=tasks',
      { method: 'DELETE' }
    );
  });
});
