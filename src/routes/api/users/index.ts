import { prisma } from '@/lib/prisma';
import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/api/users')({
  GET: async () => {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    const total = await prisma.user.count();
    return json({ users, total });
  },
});
