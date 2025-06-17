import { prisma } from '@/lib/prisma';
import { json } from '@tanstack/react-start';
import { createAPIFileRoute } from '@tanstack/react-start/api';

export const APIRoute = createAPIFileRoute('/api/posts/$id')({
  GET: async ({ params }) => {
    const { id } = params
    const user = await prisma.post.findUniqueOrThrow({
      where: {
        id: Number(id),
      },
    });
    return json(user)
  },
});
