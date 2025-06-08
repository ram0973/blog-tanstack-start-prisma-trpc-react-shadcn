import { DataTable } from "@/components/data-table";
import { Spinner } from "@/components/spinner";
import { createFileRoute } from "@tanstack/react-router";
import { columns } from "./-columns";
//import createServerHelpers,  from '@/lib/trpc/root-provider'
import { useTRPC } from "@/integrations/trpc/react";
import { useQuery } from "@tanstack/react-query";
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


export const Route = createFileRoute("/dashboard/posts/")({
  //errorComponent: () => "Oh crap!",
  pendingComponent: Spinner,
  component: DashboardPostsComponent,
});

function DashboardPostsComponent() {
  //const trpc = useTRPC()
  //const { data: posts } = useQuery(trpc.posts.getAll.queryOptions())
  const { data, isLoading } = useQuery({
    queryKey: ['posts'],
    queryFn: () => fetchAllPosts(),
  });
  console.log(data)


  return (
    <>
      <DataTable data={data?.posts ?? []} columns={columns} findByField="title"/>
    </>
  );
}
