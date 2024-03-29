import React from 'react';
import Image from 'next/image';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Krystal Clean Pool Service',
  description:
    'We are a father and son team, committed to providing top-notch pool services with integrity and unmatched quality. Founded by a proud veteran, we bring military precision and reliability to every job.',
};

const Page = () => {
  return (
    <MaxWidthWrapper>
      <section className='overflow-hidden'>
        <div className='container px-4 mx-auto'>
          <div className='relative mb-32'>
            <div className='hidden lg:block absolute top-0 left-12'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={500}
                height={500}
                viewBox='0 0 500 500'
                fill='none'
              >
                <path
                  d='M0.5 498.311V304.054C0.5 136.406 136.406 0.5 304.054 0.5H498.311C498.967 0.5 499.5 1.03289 499.5 1.68919V136.561C499.5 137.217 498.967 137.75 498.311 137.75H342.061C290.59 137.75 239.516 163.123 201.319 201.319C163.123 239.516 137.75 290.59 137.75 342.061V498.311C137.75 498.967 137.217 499.5 136.561 499.5H1.68919C1.03249 499.5 0.5 498.967 0.5 498.311Z'
                  fill='url(#paint0_linear_231_9230)'
                  stroke='#F0F0F0'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_231_9230'
                    x1={0}
                    y1={500}
                    x2={500}
                    y2={0}
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#F8F8F8'>
                      <stop offset={1} stopColor='#F8F8F8' stopOpacity={0} />
                    </stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className='hidden lg:block absolute top-0 right-12'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={500}
                height={500}
                viewBox='0 0 500 500'
                fill='none'
              >
                <path
                  d='M499.5 1.68919V195.946C499.5 363.594 363.594 499.5 195.946 499.5H1.68919C1.03289 499.5 0.5 498.967 0.5 498.311V363.439C0.5 362.783 1.03289 362.25 1.68919 362.25H157.939C209.41 362.25 260.484 336.877 298.681 298.681C336.877 260.484 362.25 209.41 362.25 157.939V1.68919C362.25 1.03289 362.783 0.5 363.439 0.5H498.311C498.967 0.5 499.5 1.03289 499.5 1.68919Z'
                  fill='url(#paint0_linear_231_9229)'
                  stroke='#F0F0F0'
                />
                <defs>
                  <linearGradient
                    id='paint0_linear_231_9229'
                    x1='499.998'
                    y1='2.85805e-05'
                    x2='8.49831'
                    y2={500}
                    gradientUnits='userSpaceOnUse'
                  >
                    <stop stopColor='#F8F8F8'>
                      <stop offset={1} stopColor='#F8F8F8' stopOpacity={0} />
                    </stop>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className='relative z-10'>
              <h1 className='text-center text-4xl lg:text-5xl font-bold font-heading max-w-lg lg:max-w-3xl mx-auto pt-14 pb-32'>
                Veteran Dedication, Family Values: Elevating Pool Service
                Excellence
              </h1>
              <div className='border border-gray-200 bg-white rounded-3xl flex flex-wrap'>
                <div className='w-full md:w-1/2 lg:w-1/4 py-8'>
                  <div className='md:border-r border-gray-200 px-8'>
                    <p className='text-gray-600 mb-2 text-center'>Core Value</p>
                    <h2 className='text-3xl lg:text-3xl font-semibold text-center'>
                      Integrity
                    </h2>
                  </div>
                </div>
                <div className='w-full md:w-1/2 lg:w-1/4 py-8'>
                  <div className='lg:border-r border-gray-200 px-8'>
                    <p className='text-gray-600 mb-2 text-center'>Commitment</p>
                    <h2 className='text-3xl lg:text-3xl font-semibold text-center'>
                      Quality
                    </h2>
                  </div>
                </div>
                <div className='w-full md:w-1/2 lg:w-1/4 py-8'>
                  <div className='md:border-r border-gray-200 px-0'>
                    <p className='text-gray-600 mb-2 text-center'>
                      Unique Aspect
                    </p>
                    <h2 className='text-3xl lg:text-3xl font-semibold text-center'>
                      Veteran-Owned
                    </h2>
                  </div>
                </div>
                <div className='w-full md:w-1/2 lg:w-1/4 py-8'>
                  <div className='px-8'>
                    <p className='text-gray-600 mb-2 text-center'>Approach</p>
                    <h2 className='text-3xl lg:text-3xl font-semibold text-center'>
                      Transparency
                    </h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h2 className='text-5xl lg:text-6xl font-semibold text-center mb-2'>
            Veteran-Owned, Family-Operated:
          </h2>
          <h2 className='text-4xl lg:text-5xl font-semibold text-center mb-14'>
            A Legacy of Pool Excellence
          </h2>
          <div className='flex flex-wrap mb-32 -mx-4'>
            <div className='w-full lg:w-1/2 p-4'>
              <p className='text-gray-600 text-lg'>
                As a father and son team, our commitment to providing top-notch
                pool services is unwavering. While one of us proudly serves as a
                veteran, both of us share a dedication to bringing integrity and
                unmatched quality to every pool we service. Our journey began
                with the lessons learned in the armed forces, where we gained a
                deep appreciation for precision, reliability, and delivering a
                job well done. These values are the bedrock of our business,
                ensuring that you receive exceptional care and professionalism
                in every aspect of our pool services.
              </p>
            </div>
            <div className='w-full lg:w-1/2 p-4'>
              <p className='text-gray-600 text-lg'>
                Our commitment to transparency and quality workmanship is not
                just a promise but a practice. We believe in open communication
                and honest service, ensuring that every pool we maintain
                reflects our dedication to excellence. We take pride in our
                meticulous attention to detail, ensuring that every pool is a
                perfect retreat for its owners.
              </p>
            </div>
          </div>
          <div className='flex flex-wrap mb-32 -mx-8'>
            <div className='w-full lg:w-[35%] px-8'>
              <h2 className='text-3xl font-bold font-heading mb-20 max-w-xs lg:max-w-lg'>
                A Company Built on Strong Values
              </h2>
              <Image
                height={500}
                width={500}
                className='rounded-3xl mb-8 w-full'
                src='/about/picture1.png'
                alt=''
              />
              <Image
                height={500}
                width={500}
                className='rounded-3xl mb-8 w-full'
                src='/about/picture2.png'
                alt=''
              />
            </div>
            <div className='w-full lg:w-[65%] px-8'>
              <p className='text-gray-600 text-lg mb-6'>
                Rooted in our experience as Americans, we pride ourselves on
                integrity, transparency, and exceptional workmanship. We&apos;re
                not just servicing pools; we&apos;re building trust and ensuring
                quality in every interaction.
              </p>
              <div className='flex flex-col gap-2 mb-14'>
                <div className='flex items-center flex-wrap gap-3'>
                  <div className='w-4 h-4 rounded-full bg-orange-500 border border-orange-600 flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={16}
                      height={16}
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        d='M12.4733 4.8067C12.4114 4.74421 12.3376 4.69461 12.2564 4.66077C12.1752 4.62692 12.088 4.6095 12 4.6095C11.912 4.6095 11.8249 4.62692 11.7436 4.66077C11.6624 4.69461 11.5886 4.74421 11.5267 4.8067L6.56001 9.78003L4.47334 7.6867C4.40899 7.62454 4.33303 7.57566 4.2498 7.54286C4.16656 7.51006 4.07768 7.49397 3.98822 7.49552C3.89877 7.49706 3.8105 7.51622 3.72844 7.55188C3.64639 7.58754 3.57217 7.63902 3.51001 7.70336C3.44785 7.76771 3.39897 7.84367 3.36617 7.92691C3.33337 8.01014 3.31728 8.09903 3.31883 8.18848C3.32038 8.27793 3.33953 8.36621 3.37519 8.44826C3.41085 8.53031 3.46233 8.60454 3.52667 8.6667L6.08667 11.2267C6.14865 11.2892 6.22238 11.3388 6.30362 11.3726C6.38486 11.4065 6.472 11.4239 6.56001 11.4239C6.64802 11.4239 6.73515 11.4065 6.81639 11.3726C6.89763 11.3388 6.97137 11.2892 7.03334 11.2267L12.4733 5.7867C12.541 5.72427 12.595 5.6485 12.632 5.56417C12.6689 5.47983 12.688 5.38876 12.688 5.2967C12.688 5.20463 12.6689 5.11356 12.632 5.02923C12.595 4.94489 12.541 4.86912 12.4733 4.8067Z'
                        fill='white'
                      />
                    </svg>
                  </div>
                  <span className='text-lg text-gray-600'>
                    Honest and ethical service in every task we undertake.
                  </span>
                </div>
                <div className='flex items-center flex-wrap gap-3'>
                  <div className='w-4 h-4 rounded-full bg-orange-500 border border-orange-600 flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={16}
                      height={16}
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        d='M12.4733 4.8067C12.4114 4.74421 12.3376 4.69461 12.2564 4.66077C12.1752 4.62692 12.088 4.6095 12 4.6095C11.912 4.6095 11.8249 4.62692 11.7436 4.66077C11.6624 4.69461 11.5886 4.74421 11.5267 4.8067L6.56001 9.78003L4.47334 7.6867C4.40899 7.62454 4.33303 7.57566 4.2498 7.54286C4.16656 7.51006 4.07768 7.49397 3.98822 7.49552C3.89877 7.49706 3.8105 7.51622 3.72844 7.55188C3.64639 7.58754 3.57217 7.63902 3.51001 7.70336C3.44785 7.76771 3.39897 7.84367 3.36617 7.92691C3.33337 8.01014 3.31728 8.09903 3.31883 8.18848C3.32038 8.27793 3.33953 8.36621 3.37519 8.44826C3.41085 8.53031 3.46233 8.60454 3.52667 8.6667L6.08667 11.2267C6.14865 11.2892 6.22238 11.3388 6.30362 11.3726C6.38486 11.4065 6.472 11.4239 6.56001 11.4239C6.64802 11.4239 6.73515 11.4065 6.81639 11.3726C6.89763 11.3388 6.97137 11.2892 7.03334 11.2267L12.4733 5.7867C12.541 5.72427 12.595 5.6485 12.632 5.56417C12.6689 5.47983 12.688 5.38876 12.688 5.2967C12.688 5.20463 12.6689 5.11356 12.632 5.02923C12.595 4.94489 12.541 4.86912 12.4733 4.8067Z'
                        fill='white'
                      />
                    </svg>
                  </div>
                  <span className='text-lg text-gray-600'>
                    Clear communication and open policies for all our clients.
                  </span>
                </div>
                <div className='flex items-center flex-wrap gap-3'>
                  <div className='w-4 h-4 rounded-full bg-orange-500 border border-orange-600 flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={16}
                      height={16}
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        d='M12.4733 4.8067C12.4114 4.74421 12.3376 4.69461 12.2564 4.66077C12.1752 4.62692 12.088 4.6095 12 4.6095C11.912 4.6095 11.8249 4.62692 11.7436 4.66077C11.6624 4.69461 11.5886 4.74421 11.5267 4.8067L6.56001 9.78003L4.47334 7.6867C4.40899 7.62454 4.33303 7.57566 4.2498 7.54286C4.16656 7.51006 4.07768 7.49397 3.98822 7.49552C3.89877 7.49706 3.8105 7.51622 3.72844 7.55188C3.64639 7.58754 3.57217 7.63902 3.51001 7.70336C3.44785 7.76771 3.39897 7.84367 3.36617 7.92691C3.33337 8.01014 3.31728 8.09903 3.31883 8.18848C3.32038 8.27793 3.33953 8.36621 3.37519 8.44826C3.41085 8.53031 3.46233 8.60454 3.52667 8.6667L6.08667 11.2267C6.14865 11.2892 6.22238 11.3388 6.30362 11.3726C6.38486 11.4065 6.472 11.4239 6.56001 11.4239C6.64802 11.4239 6.73515 11.4065 6.81639 11.3726C6.89763 11.3388 6.97137 11.2892 7.03334 11.2267L12.4733 5.7867C12.541 5.72427 12.595 5.6485 12.632 5.56417C12.6689 5.47983 12.688 5.38876 12.688 5.2967C12.688 5.20463 12.6689 5.11356 12.632 5.02923C12.595 4.94489 12.541 4.86912 12.4733 4.8067Z'
                        fill='white'
                      />
                    </svg>
                  </div>
                  <span className='text-lg text-gray-600'>
                    Meticulous attention to detail for unsurpassed pool service.
                  </span>
                </div>
                <div className='flex items-center flex-wrap gap-3'>
                  <div className='w-4 h-4 rounded-full bg-orange-500 border border-orange-600 flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width={16}
                      height={16}
                      viewBox='0 0 16 16'
                      fill='none'
                    >
                      <path
                        d='M12.4733 4.8067C12.4114 4.74421 12.3376 4.69461 12.2564 4.66077C12.1752 4.62692 12.088 4.6095 12 4.6095C11.912 4.6095 11.8249 4.62692 11.7436 4.66077C11.6624 4.69461 11.5886 4.74421 11.5267 4.8067L6.56001 9.78003L4.47334 7.6867C4.40899 7.62454 4.33303 7.57566 4.2498 7.54286C4.16656 7.51006 4.07768 7.49397 3.98822 7.49552C3.89877 7.49706 3.8105 7.51622 3.72844 7.55188C3.64639 7.58754 3.57217 7.63902 3.51001 7.70336C3.44785 7.76771 3.39897 7.84367 3.36617 7.92691C3.33337 8.01014 3.31728 8.09903 3.31883 8.18848C3.32038 8.27793 3.33953 8.36621 3.37519 8.44826C3.41085 8.53031 3.46233 8.60454 3.52667 8.6667L6.08667 11.2267C6.14865 11.2892 6.22238 11.3388 6.30362 11.3726C6.38486 11.4065 6.472 11.4239 6.56001 11.4239C6.64802 11.4239 6.73515 11.4065 6.81639 11.3726C6.89763 11.3388 6.97137 11.2892 7.03334 11.2267L12.4733 5.7867C12.541 5.72427 12.595 5.6485 12.632 5.56417C12.6689 5.47983 12.688 5.38876 12.688 5.2967C12.688 5.20463 12.6689 5.11356 12.632 5.02923C12.595 4.94489 12.541 4.86912 12.4733 4.8067Z'
                        fill='white'
                      />
                    </svg>
                  </div>
                  <span className='text-lg text-gray-600'>
                    Dedicated to serving the neighborhoods we operate in.
                  </span>
                </div>
              </div>
              <Image
                height={600}
                width={600}
                className='rounded-3xl w-full lg:w-full'
                src='/about/picture3.png'
                alt=''
              />
            </div>
          </div>
          {/* <h2 className='text-center text-4xl lg:text-5xl mb-9 font-bold font-heading'>
            Our Credentials
          </h2>
          <div className='bg-gray-50 rounded-3xl mb-32 flex flex-wrap py-8'>
            <div className='w-full md:w-1/2 lg:w-1/4 py-8 px-16 flex justify-center items-center'>
              <Image
                className='grayscale'
                height={1307}
                width={770}
                src='/logos/bbb-logo-3.webp'
                alt=''
              />
            </div>
            <div className='w-full md:w-1/2 lg:w-1/4 py-8 px-8 flex justify-center items-center'>
              <Image
                className='grayscale'
                height={500}
                width={500}
                src='/logos/APSPlogo.png'
                alt=''
              />
            </div>
            <div className='w-full md:w-1/2 lg:w-1/4 py-8 px-8 flex justify-center items-center'>
              <Image
                className='grayscale'
                height={357}
                width={697}
                src='/logos/ECOlogo.png'
                alt=''
              />
            </div>
            <div className='w-full md:w-1/2 lg:w-1/4 py-8 px-8 flex justify-center items-center'>
              <Image
                className='grayscale'
                height={500}
                width={500}
                src='/logos/NSPFlogo.png'
                alt=''
              />
            </div>
          </div> */}
          <h2 className='text-4xl font-bold font-heading text-center mb-4'>
            Meet the team
          </h2>
          <p className='text-center text-gray-600 mb-4'>
            A dynamic group of individuals united by passion and expertise
          </p>
          <div className='mb-16 flex justify-center'>
            <a
              className='w-full sm:w-auto text-center h-14 inline-flex items-center justify-center py-3 px-5 rounded-full bg-orange-500 border border-orange-600 shadow text-sm font-semibold text-white hover:bg-orange-600 focus:ring focus:ring-orange-200 transition duration-200'
              href='#'
            >
              Careers
            </a>
          </div>
          <div className='flex flex-wrap mb-10 -mx-4'>
            <div className='w-full lg:w-1/2 p-4'>
              <div
                className='relative bg-no-repeat bg-cover rounded-3xl w-full max-w-sm mx-auto'
                style={{
                  height: 380,
                  backgroundImage: 'url("/about/SrHeadshot.jpg")',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              >
                <div className='absolute bottom-0 left-0 bg-white rounded-tr-3xl rounded-bl-3xl px-6 py-3'>
                  <h2 className='text-2xl font-bold font-heading mb-2'>
                    John Padworski Sr.
                  </h2>
                  <p className='text-sm text-gray-600'>Founder &amp; CEO</p>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-1/2 p-4'>
              <div
                className='relative bg-no-repeat bg-cover rounded-3xl w-full max-w-sm mx-auto'
                style={{
                  height: 380,
                  backgroundImage: 'url("/about/jrHeadshot.jpeg")',
                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                }}
              >
                <div className='absolute bottom-0 left-0 bg-white rounded-tr-3xl rounded-bl-3xl px-6 py-3'>
                  <h2 className='text-2xl font-bold font-heading mb-2'>
                    John Padworski Jr.
                  </h2>
                  <p className='text-sm text-gray-600'>Operations Manager</p>
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
