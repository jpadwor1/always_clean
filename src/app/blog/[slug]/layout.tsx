import React from 'react';
import type { Metadata, ResolvingMetadata } from 'next';
import { db } from '@/db';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const post = await db.post.findFirst({
    where: {
      slug: slug,
    },
  });

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    metadataBase: new URL('https://krystalcleanpools.com'),
    openGraph: {
      images: [post.img],
    },
  };
}

interface BlogLayoutProps {
  children: React.ReactNode;
  params: {
    slug: string;
  };
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return <>{children}</>;
};

export default BlogLayout;
