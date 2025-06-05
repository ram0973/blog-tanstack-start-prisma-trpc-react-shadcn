import { DataTable } from "@/components/data-table";
import { Spinner } from "@/components/spinner";
import { createFileRoute } from "@tanstack/react-router";
import { columns } from "./-columns";
import { useTRPC } from "@/integrations/trpc/react";
import { useQuery } from "@tanstack/react-query";


export const Route = createFileRoute("/dashboard/users/")({
  //errorComponent: () => "Oh crap!",
  pendingComponent: Spinner,
  // loader: async ({ context }) => {
  //   // Получаем trpc-клиент из контекста маршрутизатора
  //   const trpc = context.trpc
  //   const queryClientOptions = context.queryClient.fetchQuery
  //   // Запрашиваем пользователей
  //   const { data: users } = trpc.users.getAll.queryOptions()
  //   return users;
  // },
  component: DashboardPostsComponent,
});

function DashboardPostsComponent() {
  const trpc = useTRPC()
  //const users = Route.useLoaderData()
  const { data: users } = useQuery(trpc.users.getAll.queryOptions())

  return (
    <>
      <DataTable data={users ?? []} columns={columns} />
    </>
  );
}
