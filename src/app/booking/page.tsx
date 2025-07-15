'use client';

import React from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import CalendlyEmbed from '@/components/booking/CalendlyEmbed';

const Page = () => {
  return (<>
    <MaxWidthWrapper className='mt-10 h-100 w-full py-0 '>
      <div className='flex flex-col justify-between bg-white rounded-md shadow-md'>

        <div className='flex flex-col justify-between items-start bg-white '>
          <div className='flex flex-col px-4 py-4'>
            <h1 className='text-3xl font-bold'>Booking</h1>
            <p className='mt-4 text-md text-slate-500 '>
              {' '}
              Check our availability and schedule your service
            </p>
          </div>

        </div>
        <CalendlyEmbed url="https://calendly.com/krystalcleanpools-support/30min" />
      </div>

    </MaxWidthWrapper>
  </>
  );
};

export default Page;
