import { request, requestJson } from '@/shared/api/request';

describe('request helpers', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns parsed JSON for a successful response', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ id: 'task-1' }),
    });

    await expect(
      requestJson<{ id: string }>('/api/tasks', {
        errorMessage: 'Failed request',
      })
    ).resolves.toEqual({ id: 'task-1' });
  });

  it('uses a custom error mapper for an unsuccessful response', async () => {
    const response = { ok: false, status: 409 } as Response;
    global.fetch = jest.fn().mockResolvedValue(response);

    await expect(
      request('/api/tasks', {
        errorMessage: 'Failed request',
        mapError: () => new Error('Conflict'),
      })
    ).rejects.toThrow('Conflict');
  });
});
