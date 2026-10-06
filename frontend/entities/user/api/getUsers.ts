import { User } from '@/entities/user/model/types/user.types';

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch('/api/users', {
    next: { revalidate: 10 },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  console.log(response);

  return response.json();
};
