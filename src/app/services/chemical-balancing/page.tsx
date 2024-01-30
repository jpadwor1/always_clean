import React from 'react';
import Image from 'next/image';
import { FlaskConical, Pipette, TestTubes } from 'lucide-react';

const Page = () => {
  return (
    <div className='container mx-auto px-8'>
      <section
        className='py-12 md:pb-28 bg-white overflow-hidden'
        style={{
          backgroundImage: 'url("/pattern-white.svg")',
          backgroundPosition: 'center',
        }}
      >
        <div className='container px-4 mx-auto'>
          <div className='md:max-w-4xl mx-auto mb-16 md:mb-20 text-center'>
            <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium uppercase rounded-full shadow-sm'>
              Chemical Balancing
            </span>
            <h1 className='mb-4 text-3xl md:text-4xl leading-tight text-gray-900 font-bold tracking-tighter'>
              Expert Chemical Balancing for Pristine Pools
            </h1>
            <p className='text-lg md:text-xl text-gray-500 font-medium'>
              Discover the unparalleled benefits of our specialized chemical
              balancing services. Our team ensures your pool remains a safe,
              crystal-clear haven for all your swimming needs.
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
            <Image src='/pool.webp' alt='' height={500} width={500} className='rounded-xl' />
          </div>
          <div className='flex flex-wrap justify-center -mx-4'>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <div className='inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-green-500 rounded-lg'>
                  <FlaskConical className='h-8 w-8'/>
                </div>
                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Precision Chlorine Management
                </h3>
                <p className='text-gray-500 font-medium'>
                  Ensure optimal chlorine levels for a bacteria-free and
                  comfortable swimming experience with our expert services.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <div className='inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-green-500 rounded-lg'>
                <TestTubes className='h-8 w-8'/>
                </div>
                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Advanced pH Balancing
                </h3>
                <p className='text-gray-500 font-medium'>
                  Experience the perfect balance in your pool with our advanced
                  pH adjustment methods, tailored for your pool&apos;s unique needs.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <div className='inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-green-500 rounded-lg'>
                <Pipette className='h-8 w-8'/>
                </div>
                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Comprehensive Water Testing
                </h3>
                <p className='text-gray-500 font-medium'>
                  We employ state-of-the-art testing to accurately assess and
                  adjust your pool&apos;s chemical composition for optimal
                  safety and clarity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className='pt-12 bg-white'
        style={{
          backgroundImage: 'url("/pattern-white.svg")',
          backgroundPosition: 'center',
        }}
      >
        <div className='container px-4 mx-auto'>
          <div className='max-w-4xl mb-16'>
            <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium rounded-full shadow-sm'>
              FAQ
            </span>
            <h2 className='mb-4 text-4xl md:text-5xl leading-tight text-gray-900 font-bold tracking-tighter'>
              Chemical Balancing: Your Questions Answered
            </h2>
            <p className='text-lg md:text-xl text-gray-500 font-medium'>
              Explore our detailed FAQ section to understand better how chemical
              balancing ensures a safe and pristine swimming experience.
            </p>
          </div>
          <div className='flex flex-wrap pb-16 -mx-4'>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4 mb-8'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-green-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  What is involved in chemical balancing?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Chemical balancing involves adjusting chlorine, pH, and other
                  chemical levels in your pool to maintain a safe, algae-free
                  environment.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4 mb-8'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-green-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  How often should chemical levels be tested?
                </h3>
                <p className='text-gray-500 font-medium'>
                  We recommend testing chemical levels weekly to maintain
                  optimal water quality and safety.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4 mb-8'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-green-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  Is chemical balancing necessary for all pools?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Yes, every pool requires chemical balancing to ensure the
                  water is safe and hygienic for swimmers.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4 mb-8 xl:mb-0'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-green-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  How does weather impact pool chemical balance?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Weather conditions like rain, sunshine, and temperature
                  changes can alter your pool&apos;s chemical balance, making
                  regular checks essential.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4 mb-8 md:mb-0'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-green-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  Can unbalanced chemicals harm my pool equipment?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Yes, improper chemical levels can lead to corrosion or scaling
                  on pool equipment, affecting its longevity and performance.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-green-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  Will chemical balancing affect the temperature of my pool?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Chemical balancing doesn&apos;t directly affect water
                  temperature, but it ensures the water remains safe and
                  enjoyable at any temperature.
                </p>
              </div>
            </div>
          </div>
          <div className='relative -mb-40 py-16 px-4 md:px-8 lg:px-16 bg-gray-800 rounded-md overflow-hidden'>
            <Image
              className='absolute top-0 left-0 h-full w-full object-cover'
              src='/pattern-dark.svg'
              alt=''
              height={100}
              width={100}
            />
            <div className='flex flex-col items-center relative max-w-max mx-auto text-center'>
              <h3 className='mb-2 text-2xl md:text-4xl leading-tight font-bold text-white tracking-tighter'>
                Need More Information About Our Pool Chemical Services?
              </h3>
              <p className='mb-6 text-base md:text-xl text-gray-400'>
                If you have any specific queries or need detailed insights into
                our pool chemical balancing services, don&apos;t hesitate to reach
                out. Our team is dedicated to providing you with comprehensive
                support and tailored solutions.
              </p>
              <a
                className='flex flex-col items-center justify-center px-7 py-3 h-14 max-w-fit md:w-auto mb-2 md:mb-0 md:mr-4 text-lg leading-7 text-green-50 bg-green-500 hover:bg-green-600 font-medium focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm'
                href='tel:760-912-7396'
              >
                <span className='md:hidden block'>Click to Call</span> <span className='md:block hidden'>760-912-7396</span>
              </a>
            </div>
          </div>
        </div>
        <div className='h-64 bg-green-500' />
      </section>
    </div>
  );
};

export default Page;
