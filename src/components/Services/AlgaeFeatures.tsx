import { Target, TestTubes, Wrench } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

const AlgaeFeatures = () => {
  return (
    <section
      className='py-12 md:pb-28 bg-white overflow-hidden'
      style={{
        backgroundImage: 'url("/pattern-white.svg")',
        backgroundPosition: 'center',
      }}
    >
      <div className='container px-4 mx-auto'>
        <div className='md:max-w-4xl mx-auto mb-16 md:mb-20 text-center'>
          <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-full shadow-sm'>
            Algae Treatment
          </span>
          <h1 className='mb-4 text-3xl md:text-4xl leading-tight text-gray-900 font-bold tracking-tighter'>
            Effective Algae Treatment for Sparkling Clean Pools
          </h1>
          <p className='text-lg md:text-xl text-gray-500 font-medium'>
            Combat algae growth and maintain a pristine pool with our
            specialized algae treatment services. Our expert approach ensures a
            healthy, algae-free swimming environment for you and your family.
          </p>
        </div>
        <div className='relative mb-8 md:mb-24 mx-auto max-w-max'>
          <Image
            className='absolute z-10 -left-8 -top-8 w-28 md:w-auto text-yellow-400'
            src='/circle3-yellow.svg'
            alt=''
            height={100}
            width={100}
          />
          <Image
            className='absolute z-10 -right-7 -bottom-8 w-28 md:w-auto text-blue-500'
            src='/dots3-blue.svg'
            alt=''
            height={100}
            width={100}
          />
          <Image
            src='/pool.webp'
            alt=''
            height={500}
            width={500}
            className='rounded-xl'
          />
        </div>
        <div className='flex flex-wrap justify-center -mx-4'>
          <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
            <div className='h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
              <div className='inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg'>
                <Target className='h-8 w-8' />
              </div>
              <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                Targeted Algae Elimination
              </h3>
              <p className='text-gray-500 font-medium'>
                Our precise treatment targets and eliminates algae, ensuring
                your pool stays clear and hygienic.
              </p>
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
            <div className='h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
              <div className='inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg'>
                <TestTubes className='h-8 w-8' />
              </div>
              <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                Preventive Algae Control
              </h3>
              <p className='text-gray-500 font-medium'>
                We offer solutions that not only treat but also prevent future
                algae growth, safeguarding your pool&apos;s health.
              </p>
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
            <div className='h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
              <div className='inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg'>
                <Wrench className='h-8 w-8' />
              </div>
              <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                Regular Maintenance Checks
              </h3>
              <p className='text-gray-500 font-medium'>
                Consistent pool check-ups as part of our service to detect and
                address any signs of algae early on.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlgaeFeatures;
