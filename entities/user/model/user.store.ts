import { create } from 'zustand';

import { User } from '@/entities/user/types/user.types';

interface UserStore {
  users: Record<string, User>;

  setUsers: (users: User[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  users: {},

  setUsers: (users) => {
    set({
      users: Object.fromEntries(users.map((user) => [user.id, user])),
    });
  },
}));
