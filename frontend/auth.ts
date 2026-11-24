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
            select: { id: true, image: true, name: true },
          })
        : token.sub
          ? await prisma.user.findUnique({
              where: { id: token.sub },
              select: { id: true, image: true, name: true },
            })
          : null;

      if (user) {
        session.user.id = user.id;
        session.user.image = user.image ?? session.user.image;
        session.user.name = user.name ?? session.user.name;
      }
      return session;
    },
  },
});
