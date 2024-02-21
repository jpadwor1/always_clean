'use client';

import FreeChlorine from '@/components/Calculator/FreeChlorine';
import PHCalculator from '@/components/Calculator/pHCalculator';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Input } from '@/components/ui/input';
import React from 'react';

const Page = () => {
  const [poolVolume, setPoolVolume] = React.useState(0);
  return (
    <MaxWidthWrapper className='mt-20 flex flex-col items-center justify-center'>
        
      <div className='mb-10'>
        <label className='text-xl font-medium text-left'>
          Pool Volume (Gallons)
        </label>
        <Input
          type='number'
          name='poolVolume'
          placeholder='Enter pool volume'
          onChange={(e) => setPoolVolume(parseInt(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <FreeChlorine poolVolume={poolVolume} />
      <PHCalculator poolVolume={poolVolume} />
        </div>
      
    </MaxWidthWrapper>
  );
};

export default Page;
