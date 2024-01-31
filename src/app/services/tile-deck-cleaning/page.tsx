import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FlaskConical, Pipette, TestTubes } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
            <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-full shadow-sm'>
              Opening and Closing Services
            </span>
            <h1 className='mb-4 text-3xl md:text-4xl leading-tight text-gray-900 font-bold tracking-tighter'>
              Professional Pool Opening and Closing for Every Season
            </h1>
            <p className='text-lg md:text-xl text-gray-500 font-medium'>
              Ensure your pool is ready for the season with our professional
              opening and closing services. We prepare your pool for the summer
              fun and winter hibernation, taking care of all the necessary steps
              for a seamless transition.
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
                  <FlaskConical className='h-8 w-8' />
                </div>
                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Seasonal Pool Opening
                </h3>
                <p className='text-gray-500 font-medium'>
                  Kickstart your swimming season with our comprehensive pool
                  opening services, including cleaning, chemical balancing, and
                  equipment checks.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <div className='inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg'>
                  <TestTubes className='h-8 w-8' />
                </div>
                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Winterizing Your Pool
                </h3>
                <p className='text-gray-500 font-medium'>
                  Safeguard your pool during the colder months with our thorough
                  closing services, preventing damage and maintaining water
                  quality.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <div className='inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg'>
                  <Pipette className='h-8 w-8' />
                </div>
                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Regular Maintenance Checks
                </h3>
                <p className='text-gray-500 font-medium'>
                  Regular maintenance is integral to our service, ensuring your
                  pool remains in top condition throughout the year.
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
            <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium rounded-full shadow-sm'>
              FAQ
            </span>
            <h2 className='mb-4 text-4xl md:text-5xl leading-tight text-gray-900 font-bold tracking-tighter'>
              Opening and Closing Services: FAQs
            </h2>
            <p className='text-lg md:text-xl text-gray-500 font-medium'>
              Navigate through our FAQs to understand more about our
              comprehensive pool opening and closing services, ensuring your
              pool is ready for every season.
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
                  What does pool opening/closing service include?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Our service includes cleaning, covering or uncovering the
                  pool, chemical balancing, and equipment checks for season
                  readiness.
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
                  When is the right time to open/close my pool?
                </h3>
                <p className='text-gray-500 font-medium'>
                  In Pinal County, Arizona, the optimal time to open your pool
                  is typically in early spring, as the region enjoys a warmer
                  climate. For closing, late October is generally suitable,
                  considering the mild fall temperatures in the area.
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
                  How can I prepare my pool for opening/closing?
                </h3>
                <p className='text-gray-500 font-medium'>
                  We recommend clearing debris and maintaining water levels
                  before our team arrives for a smooth service process.
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
                  How does Pinal County&apos;s climate affect pool opening and
                  closing schedules?
                </h3>
                <p className='text-gray-500 font-medium'>
                  In Pinal County, Arizona, known for its hot summers and mild
                  winters, pool opening can typically be scheduled earlier in
                  the year, around March or April, and closing can often be
                  delayed until late October or even November, maximizing the
                  swimming season.
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
                our opening-closing services, don&apos;t hesitate to reach out.
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
