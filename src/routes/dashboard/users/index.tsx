import { DataTable } from "@/components/data-table";
import { Spinner } from "@/components/spinner";
import { createFileRoute } from "@tanstack/react-router";
import { columns } from "./-columns";
import { useTRPC } from "@/integrations/trpc/react";
import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createServerFn } from "@tanstack/react-start";
import { prisma } from "@/lib/prisma";

export const fetchAllUsers = createServerFn({ method: 'GET' }).handler(
  async () => {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    const total = await prisma.user.count();
    return { users, total };
  },
);

export const usersQueryOptions = () =>
  queryOptions({
    queryKey: ['users'],
    queryFn: () => fetchAllUsers(),
  })


export const Route = createFileRoute("/dashboard/users/")({
  //errorComponent: () => "Oh crap!",
  pendingComponent: Spinner,
  loader: async ({ context }) => {
    await context.queryClient.ensureQueryData(usersQueryOptions())
  },
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
  //const trpc = useTRPC()
  //const users = Route.useLoaderData()
  //const { data: users } = useQuery(trpc.users.getAll.queryOptions())
  const {data} = useSuspenseQuery(usersQueryOptions())
  
  return (
    <>
      <DataTable data={data.users ?? []} columns={columns}  findByField="name"/>
    </>
  );
}
