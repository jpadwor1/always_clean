import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import Image from 'next/image';

const ServiceCTACard = () => {
  return (
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
  )
}

export default ServiceCTACard
