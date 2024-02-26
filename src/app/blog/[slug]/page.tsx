'use client';

import { trpc } from '@/app/_trpc/client';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { format } from 'date-fns';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import './post.css';
import ServiceCTACard from '@/components/Services/ServiceCTACard';
import Head from 'next/head';
import { Post, User } from '@prisma/client';
import {
  FacebookShareButton,
  TwitterShareButton,
  FacebookIcon,
  TwitterIcon,
  XIcon,
} from 'react-share';

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { slug } = params;
  const { data } = trpc.getPost.useQuery({ slug });

  const copyURL = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  if (!data) {
    return (
      <MaxWidthWrapper className='mt-40 h-[500px] flex items-center justify-center'>
        <div className='flex flex-row items-center justify-center'>
          <Loader2 className='w-12 h-12 animate-spin text-blue-600' />
          <p className='text-xl text-gray-500 font-medium ml-2'>Loading...</p>
        </div>
      </MaxWidthWrapper>
    );
  }
  const post: Post = data.post;
  const author: User = data.author;
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
            'pool cleaning, pinal county, pool cleaning near me, ' +
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
              <Link
                className='inline-flex mr-4 items-center justify-center py-2 px-4 text-coolGray-300 hover:text-coolGray-400 bg-white hover:bg-coolGray-100 border border-coolGray-200 hover:border-coolGray-300 rounded-md shadow-md transition duration-200'
                href='#'
                onClick={copyURL}
              >
                <svg
                  width={20}
                  height={16}
                  viewBox='0 0 20 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M15 13.8333H5C4.33696 13.8333 3.70108 13.5699 3.23224 13.1011C2.76339 12.6323 2.5 11.9964 2.5 11.3333V4.66667C2.5 4.44565 2.41221 4.23369 2.25592 4.07741C2.09964 3.92113 1.88768 3.83333 1.66667 3.83333C1.44566 3.83333 1.23369 3.92113 1.07741 4.07741C0.921133 4.23369 0.833336 4.44565 0.833336 4.66667V11.3333C0.833336 12.4384 1.27232 13.4982 2.05372 14.2796C2.44063 14.6665 2.89996 14.9734 3.40549 15.1828C3.91101 15.3922 4.45283 15.5 5 15.5H15C15.221 15.5 15.433 15.4122 15.5893 15.2559C15.7455 15.0996 15.8333 14.8877 15.8333 14.6667C15.8333 14.4457 15.7455 14.2337 15.5893 14.0774C15.433 13.9211 15.221 13.8333 15 13.8333ZM19.1667 6.28333C19.158 6.20678 19.1412 6.13136 19.1167 6.05833V5.98333C19.0766 5.89765 19.0232 5.81889 18.9583 5.75V5.75L13.9583 0.75C13.8894 0.68518 13.8107 0.631734 13.725 0.591667H13.65L13.3833 0.5H6.66667C6.00363 0.5 5.36774 0.763392 4.8989 1.23223C4.43006 1.70107 4.16667 2.33696 4.16667 3V9.66667C4.16667 10.3297 4.43006 10.9656 4.8989 11.4344C5.36774 11.9033 6.00363 12.1667 6.66667 12.1667H16.6667C17.3297 12.1667 17.9656 11.9033 18.4344 11.4344C18.9033 10.9656 19.1667 10.3297 19.1667 9.66667V6.33333C19.1667 6.33333 19.1667 6.33333 19.1667 6.28333ZM14.1667 3.34167L16.325 5.5H15C14.779 5.5 14.567 5.4122 14.4107 5.25592C14.2545 5.09964 14.1667 4.88768 14.1667 4.66667V3.34167ZM17.5 9.66667C17.5 9.88768 17.4122 10.0996 17.2559 10.2559C17.0996 10.4122 16.8877 10.5 16.6667 10.5H6.66667C6.44565 10.5 6.23369 10.4122 6.07741 10.2559C5.92113 10.0996 5.83334 9.88768 5.83334 9.66667V3C5.83334 2.77899 5.92113 2.56702 6.07741 2.41074C6.23369 2.25446 6.44565 2.16667 6.66667 2.16667H12.5V4.66667C12.5 5.32971 12.7634 5.96559 13.2322 6.43443C13.7011 6.90327 14.337 7.16667 15 7.16667H17.5V9.66667Z'
                    fill='currentColor'
                  />
                </svg>
                <span className='ml-2 text-sm text-coolGray-500 hover:text-coolGray-600 font-medium'>
                  Copy Link to Share
                </span>
              </Link>
              <FacebookShareButton url={window.location.href}>
                <FacebookIcon
                  className='hover:opacity-90'
                  size={32}
                  round={true}
                />
              </FacebookShareButton>
              <TwitterShareButton className='m-2' url={window.location.href}>
                <XIcon className='hover:opacity-90' size={32} round={true} />
              </TwitterShareButton>
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
