import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import { PLANS } from '@/lib/PLANS';

interface PricingModuleProps {
  linkVisibility?: boolean;
}

const PricingModule = ({ linkVisibility }: PricingModuleProps) => {
  return (
    <section
      className='py-20 xl:py-24 bg-white rounded-xl shadow-xl'
      style={{
        backgroundImage: 'url("/pattern-white.svg")',
        backgroundPosition: 'center',
      }}
    >
      <div className='container px-4 mx-auto'>
        <div className='text-center'>
          <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-xl'>
            Pricing
          </span>
          <h3 className='mb-4 text-3xl md:text-5xl text-zinc-800 font-bold tracking-tighter'>
            Flexible pricing for every Pool
          </h3>
          <p className='mb-12 text-lg md:text-xl text-zinc-500 font-medium'>
            We are committed to providing excellent value for money to all our
            customers. We do not add unnecessary chemicals, thereby lowering the
            cost to you.
          </p>
        </div>
        <div className='flex flex-wrap justify-center -mx-4'>
          {PLANS.map((plan) => (
            <>
              <div className='w-full md:w-1/2 lg:w-1/3 p-4 '>
                <div className='min-h-[700px] flex flex-col pt-8 pb-8 bg-zinc-50 rounded-md shadow-md hover:scale-105 transition duration-500'>
                  <div className='px-8 pb-8'>
                    <div className='min-h-[75px]'>
                      <h3 className='mb-6 text-lg md:text-2xl text-primary font-semibold'>
                        {plan.name}
                      </h3>
                    </div>
                    <div className='mb-6'>
                      <span className='relative -top-10 right-1 text-3xl text-zinc-800 font-bold'>
                        $
                      </span>
                      <span className='text-6xl md:text-7xl text-zinc-800 font-semibold'>
                        {plan.price}
                      </span>
                      <span className='inline-block ml-1 text-zinc-600 font-semibold'>
                        {plan.priceFrequency}
                      </span>
                    </div>
                    <p className='mb-6 text-gray-500 font-medium tracking-tighter text-center min-h-[45px]'>
                      {plan.description}
                    </p>

                    {plan.name === 'Play Pools' || plan.name === 'Winter Special' ? (
                      <>
                        <Link href='/booking'>
                          <Button className='mb-4 w-full sm:text-md text-md shadow-md hover:shadow-lg '>
                            Book Now
                          </Button>
                        </Link>
                        {linkVisibility && (
                          <Link href='/services'>
                            <Button
                              variant='secondary'
                              className='w-full sm:text-md text-md shadow-md hover:shadow-lg '
                            >
                              Learn More
                            </Button>
                          </Link>
                        )}
                      </>
                    ) : plan.name === 'Diving or Extra Large' ? (
                      <>
                        <Link href='/booking'>
                          <Button className='mb-4 w-full sm:text-md text-md shadow-md hover:shadow-lg '>
                            Book Now
                          </Button>
                        </Link>
                        {linkVisibility && (
                          <Link href='/services'>
                            <Button
                              variant='secondary'
                              className='w-full sm:text-md text-md shadow-md hover:shadow-lg '
                            >
                              Learn More
                            </Button>
                          </Link>
                        )}
                      </>
                    ) : (
                      <>
                        <Link href='/booking'>
                          <Button className='mb-4 w-full sm:text-md text-md shadow-md hover:shadow-lg '>
                            Book Now
                          </Button>
                        </Link>
                        {linkVisibility && (
                          <Link href='/services'>
                            <Button
                              variant='secondary'
                              className='w-full sm:text-md text-md shadow-md hover:shadow-lg '
                            >
                              Learn More
                            </Button>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                  <div className='border-b border-zinc-200' />
                  <ul className='self-start mt-4 px-8 min-h-[320px]'>
                    {plan.features.map((feature) => (
                      <>
                        <li className='flex items-center mb-3 text-gray-600 font-medium'>
                          <Image
                            height={20}
                            width={20}
                            alt=''
                            className='mr-3'
                            src='/checkbox-green.svg'
                          />
                          <span>{feature}</span>
                        </li>
                      </>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingModule;
