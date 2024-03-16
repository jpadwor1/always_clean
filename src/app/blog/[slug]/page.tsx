import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './post.css';
import ServiceCTACard from '@/components/Services/ServiceCTACard';
import Head from 'next/head';
import { Post } from '@prisma/client';
import dynamic from 'next/dynamic';
import { db } from '@/db';

export async function generateStaticParams() {
  const posts: Post[] = await db.post.findMany();
  if (!posts) {
    return [];
  }

  return posts.map((post: Post) => ({
    slug: post.slug,
  }));
}

interface PageProps {
  params: {
    slug: string;
  };
}

const ShareButtons = dynamic(() => import('@/components/Blog/ShareButtons'), {
  ssr: false,
});

const Page = async ({ params }: PageProps) => {
  const { slug } = params;
  const post: Post = await db.post.findFirst({
    where: {
      slug: slug,
    },
  });

  if (!post) {
    return (
      <MaxWidthWrapper className='mt-40 h-[500px] flex items-center justify-center'>
        <div className='flex flex-row items-center justify-center'>
          <Loader2 className='w-12 h-12 animate-spin text-blue-600' />
          <p className='text-xl text-gray-500 font-medium ml-2'>Loading...</p>
        </div>
      </MaxWidthWrapper>
    );
  }

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name='description' content={post.excerpt} />
        <meta property='og:title' content={post.title} />
        <meta property='og:description' content={post.excerpt} />
        <meta property='og:image' content={post.img} />
        <meta property='og:type' content='article' />
        <meta property='og:site_name' content='Krystal Clean Pools' />
        <meta
          name='keywords'
          content={
            'pool cleaning, pinal county, pool cleaning near me,pool cleaning florence, pool cleaning queen creek' +
            post.keywords
          }
        />
      </Head>
      <article
        className='py-8 md:py-12 bg-white relative'
        style={{
          backgroundImage: 'url("/pattern-white.svg")',
          backgroundPosition: 'center top',
        }}
      >
        <div className='absolute left-10 top-6'>
          <Link href='/blog'>
            <ArrowLeft className='text-gray-600 h-8 w-8' />
          </Link>
        </div>

        <div className='container px-4 mx-auto'>
          <div className='md:max-w-2xl mx-auto mb-12 text-center'>
            <h2 className='mb-4 mt-10 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter'>
              {post.title}
            </h2>
            <div className='inline-block py-1 px-3 text-xs leading-5 text-green-500 font-medium uppercase bg-green-100 rounded-full shadow-sm'>
              {post.category}
            </div>
          </div>
          <div className='mb-10 mx-auto max-w-max overflow-hidden rounded-lg'>
            <Image src={post.img} alt='' height={400} width={400} />
          </div>
          <div className='md:max-w-3xl mx-auto'>
            <div
              className='post-content'
              dangerouslySetInnerHTML={{ __html: post.desc }}
            />

            <div className='flex items-center justify-center mt-10'>
              <ShareButtons />
            </div>
          </div>
        </div>
        <MaxWidthWrapper className='mt-10'>
          <ServiceCTACard />
        </MaxWidthWrapper>
      </article>
    </>
  );
};

export default Page;
