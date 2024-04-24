import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <section className=''>
      <div
        className='bg-coolGray-50'
        style={{
          backgroundImage: 'url("/pattern-light1.svg")',
          backgroundPosition: 'center',
        }}
      >
        <div className='container px-4 mx-auto'>
          <div className='flex flex-col pt-24 pb-11 mx-auto max-w-4xl'>
            <div className='self-center'>
              <Link href='/'>
                <Image height={160} width={160} src='/Logo.png' alt='' />
              </Link>
            </div>
            <div className='flex flex-wrap text-center justify-center -mx-3 lg:-mx-6'>
              <div className='w-full md:w-auto p-3 md:px-6'>
                <Link
                  className='inline-block text-lg md:text-xl text-coolGray-500 hover:text-coolGray-600 font-medium'
                  href='/services'
                >
                  Services
                </Link>
              </div>

              <div className='w-full md:w-auto p-3 md:px-6'>
                <Link
                  className='inline-block text-lg md:text-xl text-coolGray-500 hover:text-coolGray-600 font-medium'
                  href='/pricing'
                >
                  Pricing
                </Link>
              </div>
              <div className='w-full md:w-auto p-3 md:px-6'>
                <Link
                  className='inline-block text-lg md:text-xl text-coolGray-500 hover:text-coolGray-600 font-medium'
                  href='#'
                >
                  Careers
                </Link>
              </div>
              <div className='w-full md:w-auto p-3 md:px-6'>
                <Link
                  className='inline-block text-lg md:text-xl text-coolGray-500 hover:text-coolGray-600 font-medium'
                  href='/FAQs'
                >
                  Help
                </Link>
              </div>
              <div className='w-full md:w-auto p-3 md:px-6'>
                <Link
                  className='inline-block text-lg md:text-xl text-coolGray-500 hover:text-coolGray-600 font-medium'
                  href='/contact'
                >
                  Contact
                </Link>
              </div>
              <div className='w-full md:w-auto p-3 md:px-6'>
                <Link
                  className='inline-block text-lg md:text-xl text-coolGray-500 hover:text-coolGray-600 font-medium'
                  href='/privacy-policy'
                >
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='border-b border-coolGray-100' />
        <div className='container px-4 mx-auto'>
          <p className='py-5 md:pb-20 text-lg md:text-lg text-zinc-400 font-small text-center'>
            © 2024 Krystal Clean Pool Service. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
