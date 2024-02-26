'use client';

import CalculateAlkalinity from '@/components/Calculator/CalculateAlkalinity';
import FreeChlorine from '@/components/Calculator/FreeChlorine';
import PHCalculator from '@/components/Calculator/pHCalculator';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React from 'react';

const Page = () => {
  const [poolVolume, setPoolVolume] = React.useState(0);
  return (
    <>
      <div className='w-full h-[300px] relative'>
      <Image
          src='/bg-hero-water.png'
          alt='water'
          width={400}
          height={200}
          className='w-full h-full z-0 relative'
        />
        <div className='absolute top-10 left-[25%]'>
          <h1 className='text-5xl text-white font-medium tracking-wide'>Pool Chemical Calculator</h1>
          <p>Feel free to use this to get a better idea of how</p>
        </div>
      </div>
      <MaxWidthWrapper className='mt-10 flex flex-col items-center justify-center'>
        <div className='mb-10'>
          <label className='text-3xl font-medium text-left'>
            Pool Volume (Gallons)
          </label>
          <Input
            type='number'
            name='poolVolume'
            placeholder='Enter pool volume'
            onChange={(e) => setPoolVolume(parseInt(e.target.value))}
          />
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <FreeChlorine poolVolume={poolVolume} />
          <PHCalculator poolVolume={poolVolume} />
          <CalculateAlkalinity poolVolume={poolVolume} />
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
