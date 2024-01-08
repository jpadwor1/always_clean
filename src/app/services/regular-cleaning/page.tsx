import React from 'react';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Droplets, Microscope, Heart, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
const Page = () => {
  return (
    <MaxWidthWrapper className='md:px-10'>
       <section
        className='py-24 bg-white overflow-hidden'
        style={{
          backgroundImage: 'url("/pattern-white.svg")',
          backgroundPosition: 'center',
        }}
      >
        <div className='container px-4 mx-auto'>
          <div className='md:max-w-4xl mb-16 md:mb-20'>
            <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-full shadow-sm'>
              Features
            </span>
            <h1 className='mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter'>
              Experience the Always Clean Difference
            </h1>
            <p className='text-lg md:text-xl text-gray-600 font-medium'>
              Embark on a journey of uninterrupted cleanliness with our{' '}
              <span className='font-semibold text-gray-900'>
                Regular Pool Cleaning Service
              </span>{' '}
              at Always Clean Pool Service. We specialize in maintaining your
              pool&apos;s pristine condition week after week, ensuring a
              sparkling, inviting oasis that&apos;s ready for enjoyment whenever
              you are.
            </p>
          </div>
          <div className='flex flex-wrap lg:items-center -mx-4'>
            <div className='w-full md:w-[40%] px-4 mb-8 md:mb-0'>
              <div className='relative mx-auto md:ml-0 max-w-max'>
                <Image
                  height={100}
                  width={100}
                  className='absolute z-10 -left-8 -top-8 w-28 md:w-auto text-yellow-400'
                  src='/circle3-yellow.svg'
                  alt=''
                  aria-hidden='true'
                />
                <Image
                  height={100}
                  width={100}
                  className='absolute z-10 -right-7 -bottom-8 w-28 md:w-auto text-blue-500'
                  src='/dots3-blue.svg'
                  alt=''
                  aria-hidden='true'
                />
                <Image
                  height={400}
                  width={400}
                  src='/stock2.png'
                  alt='Pool cleaner vacuuming pool'
                />
              </div>
            </div>
            <div className='w-full md:w-[60%] px-4'>
              <div className='flex flex-wrap p-8 text-center justify-center align-middle md:text-left hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <div className='w-full md:w-auto mb-6 md:mb-0 md:pr-6 md:mt-4'>
                  <div className='inline-flex p-2 h-18 w-18 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg'>
                    <Droplets className='h-10 w-10 text-white' />
                  </div>
                </div>
                <div className='w-full md:flex-1 md:pt-3'>
                  <h3 className='mb-4 text-xl md:text-2xl leading-tight text-gray-900 font-bold'>
                    Customized Care for Your Pool
                  </h3>
                  <p className='text-gray-600 font-medium'>
                    Discover our tailored approach to pool cleaning. We address
                    the unique needs of your pool, from surface skimming to
                    chemical balancing, ensuring a spotless and inviting
                    swimming environment year-round.
                  </p>
                </div>
              </div>
              <div className='flex flex-wrap p-8 text-center md:text-left hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <div className='w-full md:w-auto mb-6 md:mb-0 md:pr-6'>
                  <div className='inline-flex p-2 md:mt-4 h-14 w-14 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg'>
                    <Microscope className='h-10 w-10 text-white' />
                  </div>
                </div>
                <div className='w-full md:flex-1 md:pt-3'>
                  <h3 className='mb-4 text-xl md:text-2xl leading-tight text-gray-900 font-bold'>
                    Advanced Techniques, Exceptional Results
                  </h3>
                  <p className='text-gray-600 font-medium'>
                    Our professionals utilize the latest in pool cleaning
                    technology, offering efficient debris removal, filter
                    cleaning, and equipment checks. We go beyond the basics to
                    provide a thorough, in-depth cleaning service.
                  </p>
                </div>
              </div>
              <div className='flex flex-wrap p-8 text-center md:text-left hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <div className='w-full md:w-auto mb-6 md:mb-0 md:pr-6'>
                  <div className='inline-flex p-2 md:mt-4 h-14 w-14 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg'>
                    <Heart className='h-10 w-10 text-white' />
                  </div>
                </div>
                <div className='w-full md:flex-1 md:pt-3'>
                  <h3 className='mb-4 text-xl md:text-2xl leading-tight text-gray-900 font-bold'>
                    Safe and Healthy Swimming for Everyone
                  </h3>
                  <p className='text-gray-600 font-medium'>
                    Your health is our priority. We use eco-friendly cleaning
                    products and meticulous methods to ensure your pool water is
                    not just clean, but safe and healthy for every swimmer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                    With Always Clean Pool Service, you can relax knowing your
                    pool is in expert hands. Our commitment to excellence
                    guarantees a crystal-clear pool that&apos;s always ready for
                    your next swim.
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

      <section
        className='py-24 md:pb-32 bg-white'
        style={{
          backgroundImage: 'url("/pattern-white.svg")',
          backgroundPosition: 'center',
        }}
      >
        <div className='container px-4 mx-auto'>
          <div className='md:max-w-4xl mb-12 mx-auto text-center'>
            <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-full shadow-sm'>
              Features
            </span>
            <h1 className='mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter'>
              Discover the Brilliance of Regular Pool Care
            </h1>
            <p className='text-lg md:text-xl text-gray-500 font-medium'>
              Embrace the ease and reliability of our comprehensive pool
              cleaning services. With our dedicated team&apos;s expertise, we
              ensure every aspect of your pool maintenance is handled
              professionally, providing you with peace of mind and more time to
              enjoy your pristine pool.
            </p>
          </div>
          <div className='flex flex-wrap -mx-4'>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />
                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Surface Cleaning
                </h3>
                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                  Pristine Surface, Crystal Clear Waters
                </h2>
                <p className='text-gray-500 font-medium'>
                  Every visit includes thorough skimming of the pool&apos;s
                  surface to remove leaves, debris, and other floating
                  impurities, ensuring a spotless and inviting look every time.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Vacuuming and Brushing
                </h3>
                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                  Deep Clean, Lasting Shine
                </h2>
                <p className='text-gray-500 font-medium'>
                  Our team meticulously vacuums and brushes the pool floor and
                  walls, removing dirt, algae, and build-up. This not only keeps
                  your pool looking great but also helps in maintaining a
                  healthy swimming environment.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Filter Cleaning
                </h3>
                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                  Optimal Performance, Enhanced Longevity
                </h2>
                <p className='text-gray-500 font-medium'>
                  Regular cleaning and inspection of the pool&apos;s filter
                  system are crucial. We ensure that filters are clean and
                  functioning efficiently, which is essential for maintaining
                  water clarity and hygiene.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Chemical Balancing
                </h3>
                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                  Balanced Waters for Safe Swimming
                </h2>
                <p className='text-gray-500 font-medium'>
                  Balancing the chemicals in your pool is vital for preventing
                  bacteria and algae growth. Our experts test and adjust
                  chlorine, pH, and other chemical levels to ensure your pool
                  water is safe and comfortable for swimming.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Equipment Check
                </h3>
                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                  Smooth Operation, Reliable Enjoyment
                </h2>
                <p className='text-gray-500 font-medium'>
                  We perform routine checks on all pool equipment, including
                  pumps, heaters, and automatic cleaners, to ensure everything
                  is in perfect working order, thus avoiding any unexpected
                  disruptions.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Seasonal Services
                </h3>
                <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
                  Adapting Care for Every Season
                </h2>
                <p className='text-gray-500 font-medium'>
                  Our services adapt to the changing seasons. Whether it&apos;s
                  preparing your pool for summer use or winterizing it to
                  prevent damage during colder months, we&apos;ve got you
                  covered year-round.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className='py-12 bg-white overflow-hidden'
        style={{
          backgroundImage: 'url("/pattern-white.svg")',
          backgroundPosition: 'center',
        }}
      >
        <div className='container px-4 mx-auto'>
          <div className='flex flex-col items-center justify-center text center -mx-4'>
            <div className='w-full max-w-3xl px-2 mb-5 lg:mb-0'>
              <div className='mx-auto'>
                <h2 className='mb-8 text-5xl md:text-5xl font-heading font-bold text-gray-900 md:leading-15'>
                  Join Our Growing Community of Satisfied Pool Owners
                </h2>
                <ul className='mb-8'>
                  <li className='flex items-center mb-4'>
                    <Image
                      height={50}
                      width={50}
                      className='mr-3'
                      src='/checkbox-green.svg'
                      alt=''
                    />
                    <span className='text-lg md:text-xl font-heading text-gray-500'>
                      Enjoy a spotlessly maintained pool with our regular
                      cleaning schedules. Your satisfaction is our top priority.
                    </span>
                  </li>
                  <li className='flex items-center mb-4'>
                    <Image
                      height={50}
                      width={50}
                      className='mr-3'
                      src='/checkbox-green.svg'
                      alt=''
                    />
                    <span className='text-lg md:text-xl font-heading text-gray-500'>
                      Our skilled professionals use the best techniques and
                      products to ensure your pool stays in optimal condition.
                    </span>
                  </li>
                  <li className='flex items-center'>
                    <Image
                      height={50}
                      width={50}
                      className='mr-3'
                      src='/checkbox-green.svg'
                      alt=''
                    />
                    <span className='text-lg md:text-xl font-heading text-gray-500'>
                      Relax and unwind, knowing your pool care is in the hands
                      of experienced and dedicated experts.
                    </span>
                  </li>
                </ul>
                <div className='flex flex-col justify-center items-center'>
                  <h2 className='text-gray-900 font-bold text-2xl leading-9 tracking-wide mb-3'>Start Your Weekly Pool Service Today</h2>
                  <Button size='lg'>
                    <Link href='/booking'>Book Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Page;
