import React from 'react';
import { Separator } from './separator';

const DualSeparator = () => {
  return (
    <div className='flex flex-row justify-between items-center my-1'>
      <Separator orientation='vertical' className='h-7 ml-[1.2rem]' />
      <Separator className='w-[calc(100%-2rem)] mx-8' />
    </div>
  );
};

export default DualSeparator;
