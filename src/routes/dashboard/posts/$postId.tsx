import { NotFound } from '@/components/NotFound';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { prisma } from '@/lib/prisma';
import { type AnyFieldApi, useForm } from '@tanstack/react-form';
import { queryOptions, useMutation, useSuspenseQuery } from '@tanstack/react-query';
import type { ErrorComponentProps } from '@tanstack/react-router';
import { ErrorComponent, createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { postSchema } from './-schema';
import { CircleAlert } from 'lucide-react';
import type { Post } from '@prisma/client';

const getPostById = createServerFn()
  //.middleware([authMiddleware])
  .validator(z.object({ postId: z.string() }))
  .handler(async (params) => {
    const postId = Number(params.data.postId);
    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: postId,
      },
    });
    return { post };
  });

const savePost = createServerFn()
  //.middleware([authMiddleware])
  .validator(postSchema)
  .handler(async ({post}) => {
    const updatedPost = await prisma.post.update({
      where: {
        id: post.id,
      },
      data: {
        title: post.title,
        content: post.content,
        published: post.published,
        updatedAt: new Date() // Автоматическое обновление времени
      }
    });
    return { updatedPost };
  });  

const getPostQueryOptions = (postId: string) =>
  queryOptions({
    queryKey: ['posts', postId],
    queryFn: () => getPostById({ data: { postId } }), 
    // () =>
    //   axios
    //     .get<Post>(`${import.meta.env.VITE_APP_URL}api/posts/${id}`)
    //     .then((r) => r.data)
    //     .catch(() => {
    //       throw new Error('Failed to fetch post');
    //     }),
  });

export const Route = createFileRoute('/dashboard/posts/$postId')({
  loader: async ({ context, params: { postId } }) => {
    await context.queryClient.ensureQueryData(getPostQueryOptions(postId));
  },
  errorComponent: PostErrorComponent,
  pendingComponent: Spinner,
  component: PostComponent,
  notFoundComponent: () => {
    return <NotFound>Post not found</NotFound>;
  },
});

function PostErrorComponent({ error }: ErrorComponentProps) {
  return <ErrorComponent error={error} />;
}

function FieldInfo({ field }: { field: AnyFieldApi }) {
  if (!field.state.meta.isTouched || field.state.meta.isValid) { return null; }

  return (
    <div 
      role="alert"
      className="flex items-start gap-1 mt-1 text-sm text-red-600 dark:text-red-400"
    >
      <CircleAlert className="h-4 w-4 flex-shrink-0" />
      <div>
        {field.state.meta.errors.map((error) => (
          <p key={error?.code}>{error?.message}</p>
        ))}
      </div>
    </div>
  );
}

function PostComponent() {
  const params = Route.useParams();
  const postQuery = useSuspenseQuery(getPostQueryOptions(params.postId));
  const post = postQuery.data.post;
  const postSaveMutation = useMutation({
    mutationFn: (post: Post) => {
      savePost(post)
    }
  })
  const form = useForm({
    defaultValues: {
      title: post.title ?? '',
      content: post?.content ?? '',
    },
    validators: { onChange: postSchema },
    onSubmit: async ({ formApi, value }) => {
      // Do something with form data
      //await saveUserMutation.mutateAsync(value)

      // Invalidating query to recheck fresh data
      //await refetch()

      // Reset the form to start-over with a clean state
      //formApi.reset();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-6"
    >
      <h1 className="text-lg font-bold mt-5">Edit post</h1>

      <form.Field name="title">
        {(field) => (
          <div className="flex flex-col gap-3">
            <Label htmlFor={field.name}>Title</Label>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
            {/* {!field.state.meta.isValid && (
              <em className='danger'>{field.state.meta.errors.map((e)=>e?.message).join(', ')}</em>
            )} */}
          </div>
        )}
      </form.Field>

      <form.Field name="content">
        {(field) => (
          <div className="flex flex-col gap-3">
            <Label htmlFor={field.name}>Content</Label>
            <Textarea
              id={field.name}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            <FieldInfo field={field} />
            {/* {!field.state.meta.isValid && (
              <em className='danger'>{field.state.meta.errors.map((e)=>e?.message).join(', ')}</em>
            )} */}
          </div>
        )}
      </form.Field>

      <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
        {([canSubmit, isSubmitting]) => (
          <Button className="w-fit" type="submit" disabled={!canSubmit}>
            {isSubmitting ? '...' : 'Submit'}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}
