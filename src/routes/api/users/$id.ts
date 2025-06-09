import { prisma } from '@/lib/prisma';
import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/api/users/$id')({
  GET: async ({ params }) => {
    const { id } = params
    const user = await prisma.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return json(user)
  },
});
