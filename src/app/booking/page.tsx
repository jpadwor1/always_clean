'use client';

import React from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Separator } from '@/components/ui/separator';
import StepperForm from '@/components/Stepper';

const Page = () => {
  return (
    <MaxWidthWrapper className='mt-10'>
      <div className='flex flex-col justify-between items-start mb-5 bg-white shadow-md rounded-md'>
        <div className='flex flex-col px-4 py-4'>
          <h1 className='text-3xl font-bold'>Booking</h1>
          <p className='mt-4 text-md text-slate-500 '>
            {' '}
            Check our availability and schedule your service
          </p>
        </div>
        <Separator className='my-4 mx-2 w-[95%]' />
        <StepperForm />
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
