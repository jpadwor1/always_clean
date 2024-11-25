"use client";
import React from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Loader2 } from "lucide-react";
import BlogEditor from "@/components/blogeditor/editor/blog-editor";
import { trpc } from "@/app/_trpc/client";

interface PageProps {
  params: {
    id: string;
  };
}
const Page = ({ params }: PageProps) => {
  const { id } = params;
  const { data: post } = trpc.getPostById.useQuery(id);

  if (!post) {
    return (
      <MaxWidthWrapper className="mt-40 flex h-[500px] items-center justify-center">
        <div className="flex flex-row items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
          <p className="ml-2 text-xl font-medium text-gray-500">Loading...</p>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <div className="mt-4 px-10">
      <h1 className="mb-10 text-2xl font-bold">Edit Blog</h1>
      <BlogEditor initialData={post} />
    </div>
  );
};

export default Page;
