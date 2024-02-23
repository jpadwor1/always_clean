import React from 'react';
import { Card } from '../ui/card';
import BlogCard from './BlogCard';
import { db } from '@/db';
import { Post } from '@prisma/client';

const FeaturedPosts = async () => {
  const posts: Post = await db.post.findMany({
    take: 2,
    orderBy: { createdAt: 'desc' },
  });

  if (!posts) return null;

  return (
    <div className='mb-0 mt-10'>
      <h3 className='mb-1 text-4xl md:text-5xl text-zinc-900 font-bold tracking-tighter leading-tight'>
        Featured Posts
      </h3>
      <p className='text-lg md:text-md text-gray-700 font-medium'>
        Check out our latest articles on pool cleaning, maintenance, and
        the best pool cleaning tech.
      </p>
      <div className='grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-6'>
        {posts.map((post: Post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
