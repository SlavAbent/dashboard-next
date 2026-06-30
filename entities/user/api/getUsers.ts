import { User } from '@/entities/user/types/user.types';
import { usersApi } from '@/shared/_api/instances';

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(usersApi, {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  return response.json();
};
