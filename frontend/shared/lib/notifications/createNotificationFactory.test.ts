import { createNotificationFactory } from './createNotificationFactory';
import type { NotificationDriver } from './notification.types';

describe('createNotificationFactory', () => {
  const driver: jest.Mocked<NotificationDriver> = {
    success: jest.fn(),
    error: jest.fn(),
    dismiss: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('maps task events to success messages', () => {
    createNotificationFactory(driver).task.success('move');

    expect(driver.success).toHaveBeenCalledWith('Task moved');
    expect(driver.error).not.toHaveBeenCalled();
  });

  it('maps folder failures to error messages', () => {
    createNotificationFactory(driver).folder.error('delete');

    expect(driver.error).toHaveBeenCalledWith('Failed to delete folder');
    expect(driver.success).not.toHaveBeenCalled();
  });

  it('delegates dismissing to the driver', () => {
    createNotificationFactory(driver).dismiss('toast-id');

    expect(driver.dismiss).toHaveBeenCalledWith('toast-id');
  });

  it('shows success only after an operation resolves', async () => {
    const operation = jest.fn().mockResolvedValue('created');

    await expect(
      createNotificationFactory(driver).task.run('create', operation)
    ).resolves.toBe('created');

    expect(driver.success).toHaveBeenCalledWith('Task added');
    expect(driver.error).not.toHaveBeenCalled();
  });

  it('shows an error and rethrows a rejected operation', async () => {
    const error = new Error('Request failed');

    await expect(
      createNotificationFactory(driver).folder.run('move', async () => {
        throw error;
      })
    ).rejects.toBe(error);

    expect(driver.error).toHaveBeenCalledWith('Failed to move folder');
    expect(driver.success).not.toHaveBeenCalled();
  });
});
