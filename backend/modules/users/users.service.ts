import { prisma } from '@/lib/prisma';

import { CreateUserInput, UpdateUserInput } from './users.types';

export function getUsers() {
  return prisma.user.findMany({
    orderBy: {
      createdAt: 'asc',
    },
  });
}

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    // include: { messages: true },
  });

  if (!user) {
    throw new Error('Not found');
  }

  return user;
}

export function createUser(data: CreateUserInput) {
  return prisma.user.create({ data });
}

export function updateUser(id: string, data: UpdateUserInput) {
  return prisma.user.update({
    where: { id },
    data,
  });
}

export function deleteUser(id: string) {
  return prisma.user.delete({ where: { id } });
}
