import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from '@lib/prisma';
import NextAuth from 'next-auth';

import authConfig from './auth.config';

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,

  adapter: PrismaAdapter(prisma),

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async session({ session, token }) {
      const email = session.user.email ?? token.email;
      const user = email
        ? await prisma.user.findUnique({
            where: { email },
            select: { id: true },
          })
        : token.sub
          ? await prisma.user.findUnique({
              where: { id: token.sub },
              select: { id: true },
            })
          : null;

      if (user) session.user.id = user.id;
      return session;
    },
  },
});
