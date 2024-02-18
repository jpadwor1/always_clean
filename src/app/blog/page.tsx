import React from 'react';
import Image from 'next/image';
import BlogCard from '@/components/Blog/BlogCard';
import Link from 'next/link';
import { db } from '@/db';
import { Post } from '@prisma/client';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Button, buttonVariants } from '@/components/ui/button';

const Page = async () => {
  const posts = await db.post.findMany();
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const dbUser = await db.user.findFirst({
    where: {
      id: user?.id,
    },
  });

  return (
    <section
      className='py-12 bg-white'
      style={{
        backgroundImage: 'url("/pattern-white.svg")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left top',
      }}
    >
      <div className='container px-4 mx-auto'>
        <div className='md:max-w-5xl mx-auto mb-8 md:mb-16 text-center'>
          <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-full shadow-sm'>
            Explore Our Blogs
          </span>
          <h3 className='mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter'>
            Dive into a World of Pool Care Excellence
          </h3>
          <p className='mb-10 text-lg md:text-xl text-coolGray-500 font-medium'>
            Your ultimate guide to pool maintenance, innovative technologies,
            and tips for keeping your pool sparkling all year round.
          </p>
        </div>
        {dbUser && dbUser?.role === 'ADMIN' && (
          <div className='w-full flex items-center justify-center mb-4'>
            <Link href='/create' className={buttonVariants({})}>
              Create New Post
            </Link>
          </div>
        )}
        <div className='grid grid-cols-2 mx-4 mb-12 md:mb-20 gap-2'>
          {posts.map((post: Post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        <Link
          className='flex items-center justify-center py-2 px-4 mx-auto text-sm leading-5 text-blue-50 font-medium bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 md:max-w-max rounded-md'
          href=''
        >
          <span className='mr-3'>View more</span>
          <svg
            className='text-blue-50'
            width={12}
            height={10}
            viewBox='0 0 12 10'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.7583 4.40833C10.6809 4.33023 10.5887 4.26823 10.4871 4.22592C10.3856 4.18362 10.2767 4.16183 10.1667 4.16183C10.0567 4.16183 9.94773 4.18362 9.84619 4.22592C9.74464 4.26823 9.65247 4.33023 9.575 4.40833L6.83333 7.15833V0.833333C6.83333 0.61232 6.74554 0.400358 6.58926 0.244078C6.43297 0.0877975 6.22101 0 6 0C5.77899 0 5.56702 0.0877975 5.41074 0.244078C5.25446 0.400358 5.16667 0.61232 5.16667 0.833333V7.15833L2.425 4.40833C2.26808 4.25141 2.05525 4.16326 1.83333 4.16326C1.61141 4.16326 1.39859 4.25141 1.24167 4.40833C1.08475 4.56525 0.99659 4.77808 0.99659 5C0.99659 5.22192 1.08475 5.43475 1.24167 5.59167L5.40833 9.75833C5.48759 9.8342 5.58104 9.89367 5.68333 9.93333C5.78308 9.97742 5.89094 10.0002 6 10.0002C6.10906 10.0002 6.21692 9.97742 6.31667 9.93333C6.41896 9.89367 6.51241 9.8342 6.59167 9.75833L10.7583 5.59167C10.8364 5.5142 10.8984 5.42203 10.9407 5.32048C10.9831 5.21893 11.0048 5.11001 11.0048 5C11.0048 4.88999 10.9831 4.78107 10.9407 4.67952C10.8984 4.57797 10.8364 4.4858 10.7583 4.40833Z'
              fill='currentColor'
            />
          </svg>
        </Link>
      </div>
    </section>
  );
};

export default Page;
