import { Spinner } from '@/components/spinner';
import { Input } from '@/components/ui/input';
import { useForm } from '@tanstack/react-form';
import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

type HandlerArgs = {
  data: { userId: number };
  //request: Request,
  //context: Server
};

// export const fetchUserById = createServerFn({ method: 'GET' })
//   .validator(z.number().nonnegative())
//   .handler(async ({data}: HandlerArgs) => {
//     const user = await prisma.user.findUniqueOrThrow({
//       where: {
//         id: data.userId,
//       },
//     });
//     return { user };
//   });

export const userQueryOptions = (userId: string) =>
  queryOptions({
    queryKey: ['user', userId],
    queryFn: async () => {
      // console.log(userId)
      // try {
      // const user = await api.get(`/users/${userId}`)
      // console.log(user)
      // } catch(err) {
      //   console.log(err)
      // }
      const url = `http://localhost/api/auth/admin/list-users/?searchvalue=${userId}`
      console.log(url)
      const response = await fetch(url);

      let user = null
      if (response.ok) {
        // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        user = await response.json();
      } else {
        alert('Ошибка HTTP: ' + response.status);
      }

      return user;
    },
  });

export const Route = createFileRoute('/dashboard/users/$userId')({
  // loader: async ({ context: { queryClient }, params: { userId } }) => {
  //   //await queryClient.ensureQueryData(trpc.users.queryOptions(postId));
  // },
  loader: async ({ context, params: { userId } }) => {
    await context.queryClient.ensureQueryData(userQueryOptions(userId));
  },
  pendingComponent: Spinner,
  component: DashboardUserEditComponent,
});

const userSchema = z.object({
  name: z.string().optional(),
});

function DashboardUserEditComponent() {
  //const trpc = createRouter()

  const userId = Route.useParams({ select: (d) => d.userId });
  const { user } = useSuspenseQuery(userQueryOptions(userId));
  console.info(user);
  //const { data, isLoading } = useQuery(trpc.post.queryOptions(userId));
  //const post = data;

  if (!user) {
    return <div>Post not found</div>;
  }

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      //onChange: postSchema,
    },
    onSubmit: (values) => {
      console.info(values);
    },
  });

  return (
    <div>
      Form
      <form.Field name="email">
        {(field) => {
          return <Input value={user.name} />;
        }}
      </form.Field>
    </div>
  );
}
