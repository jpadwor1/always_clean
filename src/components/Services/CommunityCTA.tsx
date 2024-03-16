import React from 'react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { CheckCircle, Phone } from 'lucide-react';

interface CommunityCTAProps {
  buttonType: 'call' | 'book';
}
const CommunityCTA = ({ buttonType }: CommunityCTAProps) => {
  return (
    <section
      className='py-12 bg-white overflow-hidden rounded-xl shadow-lg'
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
                  <CheckCircle className='h-10 w-10 text-green-500 mr-3' />
                  <span className='text-lg md:text-xl font-heading text-gray-500'>
                    Enjoy a spotlessly maintained pool with our regular cleaning
                    schedules. Your satisfaction is our top priority.
                  </span>
                </li>
                <li className='flex items-center mb-4'>
                  <CheckCircle className='h-10 w-10 text-green-500 mr-3' />

                  <span className='text-lg md:text-xl font-heading text-gray-500'>
                    Our skilled professionals use the best techniques and
                    products to ensure your pool stays in optimal condition.
                  </span>
                </li>
                <li className='flex items-center'>
                  <CheckCircle className='h-10 w-10 text-green-500 mr-3' />

                  <span className='text-lg md:text-xl font-heading text-gray-500'>
                    Relax and unwind, knowing your pool care is in the hands of
                    experienced and dedicated experts.
                  </span>
                </li>
              </ul>
              <div className='flex flex-col justify-center items-center'>
                <h2 className='text-gray-900 font-bold text-2xl leading-9 tracking-wide mb-3'>
                  Start Your Weekly Pool Service Today
                </h2>
                {buttonType === 'call' ? (
                  <Link
                    className={buttonVariants({
                      className: 'flex flex-row px-3 py-2 bg-primary h-16',
                    })}
                    href='tel:760-912-7396'
                  >
                    <Phone className='mr-2 h-10 w-10 text-white' />
                    <span className='text-xl'>760-912-7396</span>{' '}
                  </Link>
                ) : (
                  <Link
                    className={buttonVariants({ size: 'lg' })}
                    href='/booking'
                  >
                    Book Now
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityCTA;
