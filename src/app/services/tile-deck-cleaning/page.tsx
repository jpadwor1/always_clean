import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  FlaskConical,
  Leaf,
  Paintbrush,
  Pipette,
  SprayCan,
  TestTubes,
} from 'lucide-react';
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
              Tile and Deck Cleaning Services
            </span>
            <h1 className='mb-4 text-3xl md:text-4xl leading-tight text-gray-900 font-bold tracking-tighter'>
              Revitalize Your Pool Area with Professional Tile and Deck Cleaning
            </h1>
            <p className='text-lg md:text-xl text-gray-500 font-medium'>
              Transform your poolside experience with our specialized tile and
              deck cleaning services. We remove buildup, restore shine, and
              ensure a safe, slip-free surface for your enjoyment.
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
              src='/tileCleaning.webp'
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
                  <SprayCan className='h-8 w-8' />
                </div>
                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Deep Cleaning for Tiles
                </h3>
                <p className='text-gray-500 font-medium'>
                  Our deep cleaning process effectively removes calcium deposits
                  and grime, leaving your pool tiles sparkling clean.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <div className='inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg'>
                  <Paintbrush className='h-8 w-8' />
                </div>
                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Deck Restoration
                </h3>
                <p className='text-gray-500 font-medium'>
                  Revitalize your pool deck with our thorough cleaning services,
                  enhancing its appearance and longevity.
                </p>
              </div>
            </div>
            <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
              <div className='h-full p-8 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                <div className='inline-flex h-16 w-16 mb-7 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg'>
                  <Leaf className='h-8 w-8' />
                </div>
                <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                  Safe & Eco-Friendly Solutions
                </h3>
                <p className='text-gray-500 font-medium'>
                  We use eco-friendly and safe cleaning agents that are tough on
                  dirt but gentle on your pool&apos;s surroundings.
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
              FAQs on Tile and Deck Cleaning Services
            </h2>
            <p className='text-lg md:text-xl text-gray-500 font-medium'>
              Explore our FAQs to learn more about our tile and deck cleaning
              services and how they can rejuvenate your pool area.
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
                  How often should I clean my pool tiles and deck?
                </h3>
                <p className='text-gray-500 font-medium'>
                  For optimal maintenance, we recommend a thorough cleaning at
                  least once a year or more frequently depending on usage and
                  exposure to elements.
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
                  What methods are used for tile and deck cleaning?
                </h3>
                <p className='text-gray-500 font-medium'>
                  We utilize a combination of pressure washing, gentle
                  scrubbing, and specialized cleaning agents tailored to each
                  surface type.
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
                  Are there specific challenges for tile and deck cleaning in
                  Pinal County?
                </h3>
                <p className='text-gray-500 font-medium'>
                  In Pinal County, the high mineral content in water can lead to
                  quicker buildup on tiles and decks. Our cleaning methods are
                  designed to effectively tackle these local challenges.
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
                  Can tile and deck cleaning improve the overall safety of my
                  pool area?
                </h3>
                <p className='text-gray-500 font-medium'>
                  Absolutely. Regular cleaning of tiles and decks not only
                  enhances appearance but also removes algae and other slippery
                  buildups, significantly improving safety around the pool area.
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
                        With Krystal Clean Pool Service, you can relax knowing
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
                our Tile and Deck cleaning services, don&apos;t hesitate to
                reach out. Our team is dedicated to providing you with
                comprehensive support and tailored solutions.
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
