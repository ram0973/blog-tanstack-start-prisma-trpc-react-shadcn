import { DataTable } from "@/components/data-table";
import { Spinner } from "@/components/spinner";
import { createFileRoute } from "@tanstack/react-router";
import { columns } from "./-columns";
//import createServerHelpers,  from '@/lib/trpc/root-provider'
import { useTRPC } from "@/integrations/trpc/react";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/dashboard/posts/")({
  //errorComponent: () => "Oh crap!",
  pendingComponent: Spinner,
  component: DashboardPostsComponent,
});

function DashboardPostsComponent() {
  const trpc = useTRPC()
  const { data: posts } = useQuery(trpc.posts.getAll.queryOptions())

  return (
    <>
      <DataTable data={posts ?? []} columns={columns} findByField="title"/>
    </>
  );
}
