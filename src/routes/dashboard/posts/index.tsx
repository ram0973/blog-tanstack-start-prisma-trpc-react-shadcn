import { DataTable } from "@/components/data-table";
import { Spinner } from "@/components/spinner";
import { createFileRoute } from "@tanstack/react-router";
import { columns } from "./-columns";
//import createServerHelpers,  from '@/lib/trpc/root-provider'
import { useTRPC } from "@/integrations/trpc/react";
import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import {prisma} from '@/lib/prisma'

export const fetchAllPosts = createServerFn({ method: 'GET' }).handler(
  async () => {
    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    const total = await prisma.post.count();
    return { posts, total };
  },
);

export const postsQueryOptions = () =>
  queryOptions({
    queryKey: ['posts'],
    queryFn: () => fetchAllPosts(),
  })


export const Route = createFileRoute("/dashboard/posts/")({
  //errorComponent: () => "Oh crap!",
  pendingComponent: Spinner,
  component: DashboardPostsComponent,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(postsQueryOptions())
  },
});

function DashboardPostsComponent() {
  //const trpc = useTRPC()
  //const { data: posts } = useQuery(trpc.posts.getAll.queryOptions())
  // const { data, isLoading } = useQuery({
  //   queryKey: ['posts'],
  //   queryFn: () => fetchAllPosts(),
  // });
  const postsQuery = useSuspenseQuery(postsQueryOptions())
  const {data} = postsQuery
  return (
    <>
      <DataTable data={data?.posts ?? []} columns={columns} findByField="title"/>
    </>
  );
}
