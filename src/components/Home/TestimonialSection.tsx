'use client';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

const TestimonialSection = () => {
  const [slide, setSlide] = React.useState(1);

  const testimonials = [
    {
      name: 'Catherine',
      location: 'Pool Owner in AZ',
      review:
        'Krystal Clean Pool Service was helpful and informative. I recommend his services for great work!',
    },
    {
      name: 'Jennifer C.',
      location: 'Pool Owner in Florence, AZ',
      review:
        'I am beyond impressed with Krystal Clean Pool Service and would 100% recommend this company to any and everyone.',
    },
    {
      name: 'Elizabeth L.',
      location: 'Pool Owner in Florence, AZ',
      review:
        "This company is great. They're reliable, affordable, and know their business. I use them and they give me my time back in my day.",
    },
  ];

  React.useEffect(() => {
    const slideTimer = () => {
      setTimeout(() => {
        if (slide === 2) {
          setSlide(0);
        } else {
          setSlide(slide + 1);
        }
      }, 4000)
    }

    slideTimer()
  }, [slide])

  return (
    <section
      className='md:p-16 px-2 py-10 bg-white rounded-lg shadow-lg mb-10 text-center'
      style={{
        backgroundImage: 'url("/pattern-white.svg")',
        backgroundPosition: 'center',
      }}
    >
      <div className='container md:px-4 px-0 mx-auto'>
        <div className='relative max-w-5xl sm:px-6 pb-6 mb-10 mx-auto text-center'>
          <Image
            className='absolute top-0 left-0'
            src='/quote-top-blue.svg'
            alt=''
            width={50}
            height={50}
          />
          <Image
            className='absolute bottom-0 right-0'
            src='/quote-down-blue.svg'
            alt=''
            width={50}
            height={50}
          />
          <div className='relative'>
            <h2 className='pointer-events-none text-2xl md:text-4xl font-semibold tracking-tighter md:px-6 py-10 md:h-[200px]'>
              {testimonials[slide].review}
            </h2>
          </div>
        </div>
        <div className='text-center mb-8'>
          <div className='flex flex-row space-x-2 w-full items-center justify-center my-6'>
            {Array.from({ length: 5 }).map((_, i) => (
              <Image key={i} src='/star.png' alt='' width={24} height={24} />
            ))}
          </div>

          <h3 className='mb-2 text-xl md:text-2xl font-semibold pointer-events-none'>
            {testimonials[slide].name}
          </h3>
          <span className='text-lg text-coolGray-500 font-medium pointer-events-none'>
            {testimonials[slide].location}
          </span>
        </div>
        <div className='text-center'>
          <button
            onClick={() => setSlide(0)}
            className={cn(
              slide === 0 ? 'bg-blue-500' : 'bg-gray-300',
              'inline-block h-3 w-3 mr-3 rounded-full'
            )}
          />
          <button
            onClick={() => setSlide(1)}
            className={cn(
              slide === 1 ? 'bg-blue-500' : 'bg-gray-300',
              'inline-block h-3 w-3 mr-3 rounded-full'
            )}
          />
          <button
            onClick={() => setSlide(2)}
            className={cn(
              slide === 2 ? 'bg-blue-500' : 'bg-gray-300',
              'inline-block h-3 w-3 mr-3 rounded-full'
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
