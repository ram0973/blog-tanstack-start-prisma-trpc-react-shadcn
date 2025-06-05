//import { TRPCError } from "@trpc/server";
import type { TRPCRouterRecord } from "@trpc/server";
// import { z } from 'zod'

import { createTRPCRouter, publicProcedure, protectedProcedure } from "./init";
import { prisma } from "@/lib/prisma";

const peopleRouter = {
  list: publicProcedure.query(async () =>
  [{"name": "Ra"}, {"name": "Ri"}]
  ),
  currentUserName: protectedProcedure.query(async (opts) => {
    return opts.ctx.session?.user?.name;
  }),
} satisfies TRPCRouterRecord;

const postsRouter = {
  getAll: publicProcedure.query(async () => {
    const posts = await prisma.post.findMany();
    return posts;
  }),
} satisfies TRPCRouterRecord;

const usersRouter = {
  getAll: publicProcedure.query(async () => {
    const users = await prisma.user.findMany();
    return users;
  }),
} satisfies TRPCRouterRecord;

export const trpcRouter = createTRPCRouter({
  people: peopleRouter,
  posts: postsRouter,
  users: usersRouter,
});
export type TRPCRouter = typeof trpcRouter;
