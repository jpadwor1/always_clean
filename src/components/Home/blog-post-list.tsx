import { buttonVariants } from "@/components/ui/button";
import { db } from "@/db";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default async function BlogPostList() {
  const titles = [
    "Top Benefits of Hiring a Professional Pool Cleaning Service in Florence, AZ",
    "Essential Pool Safety Tips for Pinal County Families",
    "Top 5 Common Pool Problems for Florence, AZ Homeowners and How to Fix Them",
  ];

  const posts = await db.post.findMany({
    where: {
      OR: titles.map((title) => ({ title })),
    },
  });

  return (
    <div className="my-20 space-y-20 p-8 text-neutral-700">
      <div className="mb-12 text-center">
        <h2 className="text-sm uppercase tracking-widest text-gray-400">
          Dive Into Pool Care Insights
        </h2>
        <h1 className="mt-2 text-4xl font-bold">
          Expert Tips for Pools in Florence, San Tan Valley, and great Pinal County, AZ
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-gray-400">
          Explore helpful articles on pool cleaning, maintenance, and seasonal care tailored for Florence, San Tan Valley, and greater Pinal County, AZ. From chemical balancing to seasonal preparation, learn how to keep your pool pristine year-round.
        </p>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-8 max-w-3xl mx-auto">
        <div className="relative md:w-2/5">
          <Image
            src={posts[0]?.img ? posts[0]?.img : ""}
            alt="Blog Image"
            className="h-full w-auto object-cover"
            width="300"
            height="300"
          />
          <div className="absolute -top-4 left-4 h-10 bg-orange-300 px-4 py-2 text-white">
            {format(
              new Date(posts[0]?.createdAt ? posts[0]?.createdAt : ""),
              "MMM dd, yyyy",
            )}
          </div>
        </div>
        <div className="flex flex-col justify-center md:w-3/5">
          <div className="mt-16">
            <h2 className="font-card-display text-2xl font-bold">
              {posts[0]?.title}
            </h2>
            <p className="mt-4 text-gray-400">{posts[0]?.excerpt}</p>
          </div>

          <Link
            href={`/blog/${posts[0]?.slug}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-10 h-12 w-max rounded-none bg-blue-900 text-white hover:border-orange-300 hover:bg-transparent hover:text-black",
            )}
          >
            Read More <ArrowRightIcon className="ml-2" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-8 max-w-3xl mx-auto">
        <div className="order-2 flex flex-col justify-center md:order-1 md:w-3/5">
          <h2 className="font-card-display text-2xl font-bold">
            {posts[1]?.title}
          </h2>
          <p className="mt-4 text-gray-400">{posts[1]?.excerpt}</p>
          <Link
            href={`/blog/${posts[1]?.slug}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-10 h-12 w-max rounded-none border-b-0 border-t-0 border-orange-300 bg-white text-black hover:border-b hover:border-t hover:bg-white hover:text-black",
            )}
          >
            Read More <ArrowRightIcon className="ml-2" />
          </Link>
        </div>
        <div className="relative order-1 md:order-2 md:w-2/5">
          <Image
            src={posts[1]?.img ? posts[1]?.img : ""}
            alt="Blog Image"
            className="h-full w-auto object-cover"
            width="300"
            height="300"
          />
          <div className="absolute -top-4 left-4 bg-orange-300 px-4 py-2 text-white">
            {format(
              new Date(posts[1]?.createdAt ? posts[1]?.createdAt : ""),
              "MMM dd, yyyy",
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:space-x-8 max-w-3xl mx-auto">
        <div className="relative md:w-2/5">
          <Image
            src={posts[2]?.img ? posts[2]?.img : ""}
            alt="Blog Image"
            className="h-full w-auto object-fit"
            width="300"
            height="300"
          />
          <div className="absolute -top-4 left-4 bg-orange-300 px-4 py-2 text-white">
            {format(
              new Date(posts[2]?.createdAt ? posts[2]?.createdAt : ""),
              "MMM dd, yyyy",
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between md:w-3/5">
          <div className="mt-16">
            <h2 className="font-card-display text-2xl font-bold">
              {posts[2]?.title}
            </h2>
            <p className="mt-4 text-gray-400">{posts[2]?.excerpt}</p>
          </div>

          <Link
            href={`/blog/${posts[2]?.slug}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "mt-10 h-12 w-max rounded-none bg-blue-900 text-white hover:border-orange-300 hover:bg-transparent hover:text-black",
            )}
          >
            Read More <ArrowRightIcon className="ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
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
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}
