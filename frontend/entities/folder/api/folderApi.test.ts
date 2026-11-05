import { deleteFolder } from '@/entities/folder/api/folderApi';

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
