'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Post } from '@prisma/client';
import { trpc } from '../_trpc/client';
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

const Page = () => {
  const {
    data: posts,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = trpc.getPostsInfinite.useInfiniteQuery(
    {
      limit: 6,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );
  const { getUser } = useKindeBrowserClient();
  const user = getUser();

  const { data: getUserById, isSuccess } = trpc.getUser.useQuery(
    { id: user?.id || '' }, // Provide a default value for `id` if `user?.id` is undefined
    {
      enabled: !!user?.id, // Query will only run if `user?.id` is defined
    }
  );

  const userRole = isSuccess ? getUserById?.role : undefined;



  return (
    <section className="py-12">
      <div className="container mx-auto flex flex-col items-center justify-center px-4">
        <div className="relative overflow-hidden py-20 md:py-0">
          <div className="py-4 md:py-10 overflow-hidden relative  px-4 md:px-8">
            <GridPatternContainer className="opacity-50" />
            <div className="relative z-20 py-10 ">
              <h1
                className={cn(
                  "scroll-m-20 text-5xl font-bold text-center md:text-left tracking-tight text-black dark:text-white mb-6"
                )}
              >
                Elevate Your Perspective:<br /> The Aerial Edge Blog
              </h1>

              <p className="text-lg text-neutral-600 dark:text-neutral-400-foreground max-w-xl !mb-6 text-center md:text-left">
                Insights, Innovations, and Industry Trends in Drone Technology and Aerial Inspection Services
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between pb-20 max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full relative z-20">
              {!posts || isLoading ? (
                <Loader2 className="mx-auto animate-spin" size={48} />
              ) : (
                posts.pages.map((page) =>
                  page.posts.map((post: Blog, index: number) => {
                    return <AnimatedBlogCard userRole={userRole} blog={post} key={post.title + index} />;
                  }),
                )
              )}
            </div>
          </div>
          {hasNextPage && (
            <Button
              className="mx-auto flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-medium leading-5 text-blue-50 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 md:max-w-max"
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              <span className="mr-3">View more</span>
              <svg
                className="text-blue-50"
                width={12}
                height={10}
                viewBox="0 0 12 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.7583 4.40833C10.6809 4.33023 10.5887 4.26823 10.4871 4.22592C10.3856 4.18362 10.2767 4.16183 10.1667 4.16183C10.0567 4.16183 9.94773 4.18362 9.84619 4.22592C9.74464 4.26823 9.65247 4.33023 9.575 4.40833L6.83333 7.15833V0.833333C6.83333 0.61232 6.74554 0.400358 6.58926 0.244078C6.43297 0.0877975 6.22101 0 6 0C5.77899 0 5.56702 0.0877975 5.41074 0.244078C5.25446 0.400358 5.16667 0.61232 5.16667 0.833333V7.15833L2.425 4.40833C2.26808 4.25141 2.05525 4.16326 1.83333 4.16326C1.61141 4.16326 1.39859 4.25141 1.24167 4.40833C1.08475 4.56525 0.99659 4.77808 0.99659 5C0.99659 5.22192 1.08475 5.43475 1.24167 5.59167L5.40833 9.75833C5.48759 9.8342 5.58104 9.89367 5.68333 9.93333C5.78308 9.97742 5.89094 10.0002 6 10.0002C6.10906 10.0002 6.21692 9.97742 6.31667 9.93333C6.41896 9.89367 6.51241 9.8342 6.59167 9.75833L10.7583 5.59167C10.8364 5.5142 10.8984 5.42203 10.9407 5.32048C10.9831 5.21893 11.0048 5.11001 11.0048 5C11.0048 4.88999 10.9831 4.78107 10.9407 4.67952C10.8984 4.57797 10.8364 4.4858 10.7583 4.40833Z"
                  fill="currentColor"
                />
              </svg>
            </Button>
          )}
        </div>
      </div>
    </section>

  )
}



export default Page;

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm mr-4  text-black px-2 py-1  relative z-20"
    >
      <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm" />
      <span className="font-medium text-black dark:text-white">Aerial Edge UAS</span>
    </Link>
  );
};

interface BlogCardProps {
  blog: Blog;
  userRole: string | undefined;
}

const AnimatedBlogCard = ({ blog, userRole }: BlogCardProps) => {
  const router = useRouter();
  const truncate = (text: string, length: number) => {
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  const deletePost = trpc.deletePostById.useMutation();
  const handleDelete = async () => {
    if (!blog.id) return;
    deletePost.mutate(blog.id, {
      onSuccess: () => {
        router.push("/blog");
      },
      onError: (error) => {
        console.error(error);
        toast({
          title: "Oops, something went wrong",
          description:
            "An error occurred while deleting the post, try again later.",
          variant: "destructive",
        });
      },
    });
  };

  return (
    <Link
      className="shadow-derek rounded-3xl border border-neutral-300 dark:border-neutral-800 w-full bg-white dark:bg-neutral-900  overflow-hidden  hover:scale-[1.02] transition duration-200"
      href={`/blog/${blog.slug}`}
    >
      {blog.img ? (
        <BlurImage
          src={blog.img || ""}
          alt={blog.title}
          height="800"
          width="800"
          className="h-52 object-cover object-top w-full"
        />
      ) : (
        <div className="h-52 flex items-center justify-center bg-white dark:bg-neutral-900">
          <Logo />
        </div>
      )}
      <div className="p-2 md:p-8 bg-white dark:bg-neutral-900">
        <div className="flex flex-row justify-between items-center">
          <span className="text-xs text-neutral-500 dark:text-neutral-400 capitalize">
            {blog.category.replace(/-/g, " ")}
          </span>
          {userRole === 'ADMIN' && (
            <div className="mr-2 self-end text-sm text-muted-foreground">
              <DropdownMenu>
                <DropdownMenuTrigger className="text-primary">
                  <VerticalElipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <Link href={`/blog/edit/${blog.id}`}>
                    <DropdownMenuItem className="hover:bg-neutral-700">
                      Edit
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem onClick={handleDelete}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>

        <p className="text-lg font-bold mb-4 text-neutral-800 dark:text-neutral-100">
          {blog.title}
        </p>
        <p className="text-left text-sm mt-2 text-neutral-600 dark:text-neutral-400">
          {truncate(blog.excerpt!, 100)}
        </p>
      </div>
    </Link>
  );
};

type Blog = {

  id: string;
  title: string;
  img: string | null;
  slug: string;
  excerpt: string | null;
  publishDate: string | null;
  category: string;
}


interface IBlurImage {
  height?: any;
  width?: any;
  src?: string | any;
  objectFit?: any;
  className?: string | any;
  alt?: string | undefined;
  layout?: any;
  [x: string]: any;
}

const BlurImage = ({
  height,
  width,
  src,
  className,
  objectFit,
  alt,
  layout,
  ...rest
}: IBlurImage) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <Image
      className={cn(
        "transition duration-300 transform",
        isLoading ? "blur-sm scale-105" : "blur-0 scale-100",
        className
      )}
      onLoadingComplete={() => setLoading(false)}
      src={src}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      blurDataURL={src}
      layout={layout}
      alt={alt ? alt : "Avatar"}
      {...rest}
    />
  );
};

function GridPatternContainer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none [mask-image:radial-gradient(ellipse_at_center,white,transparent)]",
        className
      )}
    >
      <GridPattern />
    </div>
  );
}
function GridPattern() {
  const columns = 30;
  const rows = 11;
  return (
    <div className="flex bg-gray-200 dark:bg-neutral-700 flex-shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px  scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex flex-shrink-0 rounded-[1px] ${index % 2 === 0
                ? "bg-gray-100 dark:bg-neutral-800"
                : "bg-gray-100 dark:bg-neutral-800 shadow-[0px_0px_0px_3px_rgba(255,255,255,1)_inset] dark:shadow-[0px_0px_0px_3px_rgba(0,0,0,0.2)_inset]"
                }`}
            />
          );
        })
      )}
    </div>
  );
}


function VerticalElipsis(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-ellipsis-vertical"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="12" cy="5" r="1" />
      <circle cx="12" cy="19" r="1" />
    </svg>
  );
}
