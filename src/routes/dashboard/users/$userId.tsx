import * as React from 'react';
import { Link, createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
import { useQuery } from '@tanstack/react-query';
import { createRouter } from '@/router';
import { Spinner } from '@/components/spinner';
import { useForm } from '@tanstack/react-form'
import { Input } from '@/components/ui/input';

export const Route = createFileRoute('/dashboard/users/$userId')({
  validateSearch: z.object({
    showNotes: z.boolean().optional(),
    notes: z.string().optional(),
  }),
  loader: async ({ context: { trpc, queryClient }, params: { postId } }) => {
    await queryClient.ensureQueryData(trpc.users.queryOptions(postId));
  },
  pendingComponent: Spinner,
  component: DashboardPostsPostIdComponent,
});

const postSchema = z.object({
  name: z.string().optional(),
})

function DashboardPostsPostIdComponent() {
  const trpc = createRouter()
  const postId = Route.useParams({ select: (d) => d.postId });

  const { data, isLoading } = useQuery(trpc.post.queryOptions(postId));
  const post = data;

  const search = Route.useSearch();
  
  if (!post) {
    return <div>Post not found</div>;
  }

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      //onChange: postSchema,
    },
  })
  return (
    <div>
      Form
      <form.Field name="title">
        {(field) => {return <Input value={post.title}/>}}
      </form.Field>
    </div>
  )
}
