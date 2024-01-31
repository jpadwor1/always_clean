import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FlaskConical, Pipette, Target, TestTubes, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AlgaeFeatures from '@/components/Services/algaeFeatures';

const Page = () => {
  return (
    <div className='container mx-auto px-8'>
      <AlgaeFeatures />
      <section
        className='pt-8 bg-white'
        style={{
          backgroundImage: 'url("/pattern-white.svg")',
          backgroundPosition: 'center',
        }}
      >
        <div className='container px-4 mx-auto'>
          <div className='max-w-4xl mb-16'>
            <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium rounded-full shadow-sm'>
              FAQ
            </span>
            <h2 className='mb-4 text-4xl md:text-5xl leading-tight text-gray-900 font-bold tracking-tighter'>
              Algae Treatment FAQs
            </h2>
            <p className='text-lg md:text-xl text-gray-500 font-medium'>
              Dive into our FAQ section to learn more about algae prevention and
              treatment, ensuring your pool remains clean and inviting.
            </p>
          </div>
          <div className='flex flex-wrap pb-16 -mx-4'>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4 mb-8'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-blue-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  What is algae and why is it a problem for pools?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Algae are microscopic plants that can cause slippery surfaces
                  and cloudy water, making your pool unsightly and unsafe.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4 mb-8'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-blue-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  How often should I treat my pool for algae?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Regular maintenance, including monthly treatments, is key to
                  preventing algae growth in your pool.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4 mb-8'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-blue-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  Can algae lead to other pool problems?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Yes, unchecked algae growth can clog filters and affect water
                  balance, leading to larger pool maintenance issues.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4 mb-8 xl:mb-0'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-blue-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  What types of algae can infest a pool?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Pools can be affected by different types of algae, such as
                  green, black, and mustard algae, each requiring specific
                  treatment methods.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4 mb-8 md:mb-0'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-blue-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  Are there any signs that indicate the beginning of an algae
                  problem?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Early signs include slight discoloration or cloudiness of the
                  water, a slippery feel on pool surfaces, and visible algae
                  patches.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 xl:w-1/3 px-4'>
              <div className='md:max-w-xs'>
                <div className='inline-flex mb-6 items-center justify-center w-12 h-12 rounded-full bg-blue-500'>
                  <Image
                    src='/shield-icon.svg'
                    alt=''
                    height={100}
                    width={100}
                  />
                </div>
                <h3 className='mb-6 text-xl text-gray-900 font-bold'>
                  Is professional treatment necessary for algae removal?
                </h3>
                <p className='text-gray-500 font-medium'>
                  While some minor algae issues can be handled with home
                  treatments, professional services ensure thorough removal and
                  prevention of future growth.
                </p>
              </div>
            </div>
          </div>
          <section className='relative py-16'>
            <div className='absolute top-0 left-0 h-1/2 w-full bg-blue-500' />
            <div className='container px-4 mx-auto'>
              <div className='relative py-16 px-4 md:px-24 bg-gray-50 rounded-xl'>
                <Image
                  height={50}
                  width={50}
                  className='absolute top-0 left-0 w-full h-full object-cover'
                  src='/pattern-light1.svg'
                  alt=''
                />
                <div className='relative flex flex-wrap items-center -mx-4'>
                  <div className='w-full lg:w-[80%] px-4 mb-14 lg:mb-0'>
                    <div className='max-w-lg'>
                      <h2 className='mb-4 text-3xl md:text-4xl font-heading font-bold leading-snug'>
                        Relax, We&apos;ve Got You Covered
                      </h2>
                      <p className='text-lg md:text-xl font-heading font-medium text-gray-500'>
                        With Always Clean Pool Service, you can relax knowing
                        your pool is in expert hands. Our commitment to
                        excellence guarantees a crystal-clear pool that&apos;s
                        always ready for your next swim.
                      </p>
                    </div>
                  </div>
                  <div className='w-full lg:w-[20%] px-4'>
                    <div className='flex flex-wrap items-center lg:justify-end'>
                      <Button size='lg'>
                        <Link href='/booking'>Book Now</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
                our algae treatment services, don&apos;t hesitate to reach out.
                Our team is dedicated to providing you with comprehensive
                support and tailored solutions.
              </p>
              <Link
                className='flex flex-col items-center justify-center px-7 py-3 h-14 max-w-fit md:w-auto mb-2 md:mb-0 md:mr-4 text-lg leading-7 text-blue-50 bg-primary hover:bg-primary/75 font-medium focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-transparent rounded-md shadow-sm'
                href='tel:760-912-7396'
              >
                <span className='md:hidden block'>Click to Call</span>{' '}
                <span className='md:block hidden'>760-912-7396</span>
              </Link>
            </div>
          </div>
        </div>
        <div className='h-64 bg-blue-600' />
      </section>
    </div>
  );
};

export default Page;
