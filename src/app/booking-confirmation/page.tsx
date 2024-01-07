import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { RegisterLink } from '@kinde-oss/kinde-auth-nextjs/server';
import { Button } from '@/components/ui/button';

const Page = () => {
  return (
    <MaxWidthWrapper className='relative flex flex-col items-center justify-center'>
      <div className='flex flex-col text-center items-center justify-center my-20'>
        <CheckCircle className='h-20 w-20 text-green-500 my-4' />
        <h1 className='text-6xl text-gray-900 font-bold'>THANK YOU!</h1>
        <p className='text-xl mt-4 mb-10'>
          Your service appointment has been confirmed. You will receive a
          confirmation email shortly with additional details about our visit.
        </p>
        <div
          aria-hidden='true'
          className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80'
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className='relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#4b33fd] to-[#83d9f5] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]'
          />
        </div>

        <h2 className='mt-2 font-bold text-2xl text-gray-900 sm:text-3xl'>
          Create an account with us.
        </h2>
        <p className='mt-4 text-lg text-gray-600'>
          Dive into crystal clear waters with our hassle-free pool cleaning
          services.
        </p>
        <RegisterLink>
          <Button className='mt-8 bg-green-500 hover:bg-green-400'>
            Create an Account
          </Button>
        </RegisterLink>

        <ol className=' relative my-4 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0'>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-lg font-semibold text-blue-600'>
                View Your Service History
              </span>

              <span className='mt-2 text-gray-600'>
                Experience unparalleled convenience with our account system.
                Easily access detailed records of past services, complete with
                technician-provided evidence, ensuring transparency and ease of
                tracking.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-lg font-semibold text-blue-600'>
                Manage Your Preferred Service Day
              </span>

              <span className='mt-2 text-gray-600'>
                Tailor your experience to fit your schedule. Our flexible
                account settings allow you to select and modify your service
                days effortlessly, providing a seamless way to align our
                services with your lifestyle.
              </span>
            </div>
          </li>
          <li className='md:flex-1'>
            <div className='flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4'>
              <span className='text-lg font-semibold text-blue-600'>
                Manage Your Billing Preferences
              </span>

              <span className='mt-2 text-gray-600'>
                Gain control over your financial interactions with our intuitive
                account interface. Adjust billing methods at your convenience,
                choose from a variety of options, and manage payments with ease,
                all in one place.
              </span>
            </div>
          </li>
          <div
            aria-hidden='true'
            className='pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-100'
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className='relative right-[calc(50%-10rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#624ff5] to-[#83d9f5] opacity-20 sm:right-[calc(50%-50rem)] sm:w-[72.1875rem]'
            />
          </div>
        </ol>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
