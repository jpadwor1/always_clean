'use client';
import React, { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { trpc } from '../_trpc/client';
import { Loader2 } from 'lucide-react';

const Page = () => {
  const router = useRouter();
  let origin: string | null = '';
  const Callback = () => {
    const searchParams = useSearchParams();
    origin = searchParams.get('origin');
    return (
      <div className='w-full mt-24 flex justify-center'>
        <div className='flex flex-col items-center gap-2'>
          <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
          <h3 className='font-semibold text-xl'>Setting up your account...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    );
  };

  trpc.authCallback.useQuery(undefined, {
    onSuccess: ({ success }) => {
      if (success) {
        // user is synced to db
        router.push(origin ? `/${origin}` : '/dashboard');
      }
    },
    onError: (err) => {
      if (err.data?.code === 'UNAUTHORIZED') {
        router.push('/sign-in');
      }
    },
    retry: true,
    retryDelay: 500,
  });

  const Loader = () => (
    <div className='w-full mt-24 flex justify-center'>
      <div className='flex flex-col items-center gap-2'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-800' />
        <h3 className='font-semibold text-xl'>Setting up your account...</h3>
        <p>You will be redirected automatically.</p>
      </div>
    </div>
  );
  return (
    <Suspense fallback={<Loader />}>
      <Callback />
    </Suspense>
  );
};

export default Page;
