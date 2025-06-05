import Navbar from "@/components/navbar/navbar";
import { Spinner } from "@/components/spinner";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Post } from "@prisma/client";
import {
  Link,
  MatchRoute,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";
import {
  BadgeDollarSign,
  Bike,
  BookHeart,
  BriefcaseBusiness,
  Calendar,
  ClockIcon,
  Cpu,
  FlaskRound,
  HeartPulse,
  Scale,
} from "lucide-react";

import { categories } from "./-categories";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/integrations/trpc/react";

export const Route = createFileRoute("/")({
  errorComponent: () => "Oh crap!",
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(
      context.trpc.posts.getAll.queryOptions()
    );
  },
  pendingComponent: Spinner,
  component: HomeComponent,
});

function HomeComponent() {
  const trpc = useTRPC();
  const postsQuery = useQuery(trpc.posts.getAll.queryOptions());
  const posts: Post[] = postsQuery.data || [];

  return (
    <>
      <Navbar />
      <div className="max-w-screen-xl mx-auto py-10 lg:py-16 px-6 xl:px-0 flex flex-col lg:flex-row justify-between gap-12">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
          <div className="mt-4 space-y-12">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="flex flex-col sm:flex-row gap-4 sm:gap-6 shadow-none overflow-hidden border-none"
              >
                <div className="sm:w-56 flex-shrink-0">
                  <div className="aspect-video sm:aspect-square bg-muted rounded-lg" />
                </div>
                <div className="flex-1 p-4 sm:p-6">
                  <div className="flex items-center gap-6">
                    <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
                      Technology
                    </Badge>
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold tracking-tight">
                    {post.title}
                  </h3>
                  {post.content?.substring(0, 150)} ...
                  <div className="mt-4 flex items-center gap-6 text-muted-foreground text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4" /> 5 min read
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />{" "}
                      {post.createdAt.toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
        <aside className="sticky top-8 shrink-0 lg:max-w-sm w-full">
          <h3 className="text-3xl font-bold tracking-tight">Categories</h3>
          <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
            {categories.map((category) => (
              <div
                key={category.name}
                className={cn(
                  "flex items-center justify-between gap-2 bg-muted p-3 rounded-md bg-opacity-15 dark:bg-opacity-25",
                  category.background
                )}
              >
                <div className="flex items-center gap-3">
                  <category.icon className={cn("h-5 w-5", category.color)} />
                  <span className="font-medium">{category.name}</span>
                </div>
                <Badge className="px-1.5 rounded-full">
                  {category.totalPosts}
                </Badge>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </>
    // <div className="flex-1 flex">
    //   <div className="divide-y w-48">
    //     {posts.map((post) => {
    //       return (
    //         <div key={post.id}>
    //           <Link
    //             to="/dashboard/posts/$postId"
    //             params={{
    //               postId: post.id,
    //             }}
    //             preload="intent"
    //             className="block py-2 px-3 text-blue-700"
    //             activeProps={{ className: 'font-bold' }}
    //           >
    //             <pre className="text-sm">
    //               #{post.id} - {post.title}{' '}
    //             </pre>
    //           </Link>
    //         </div>
    //       );
    //     })}
    //   </div>
    // </div>
  );
}
