import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import React from 'react';
import Link from 'next/link';

const poolCleaningFAQs = [
  {
    question: 'How often should I schedule pool cleaning in Pinal County, AZ?',
    answer:
      'The frequency of pool cleaning depends on various factors, including pool usage, weather conditions, and the time of year. Typically, we recommend weekly or bi-weekly pool cleaning to keep your pool in optimal condition, especially during the hot Arizona summers.',
  },
  {
    question:
      'What areas in Pinal County do you provide pool cleaning services?',
    answer:
      'We offer pool cleaning services throughout Pinal County, including cities like Casa Grande, Florence, Apache Junction, and Coolidge. Our team is dedicated to serving the entire region.',
  },
  {
    question:
      'What types of pool cleaning services do you offer in Pinal County, AZ?',
    answer:
      'Our pool cleaning services in Pinal County include routine cleaning, pool water testing and chemical balancing, pump and filter maintenance, tile cleaning, and more. We offer comprehensive solutions to meet all your pool care needs.',
  },
  {
    question:
      'How do I schedule a pool cleaning service appointment in Pinal County, AZ?',
    answer:
      'Scheduling a pool cleaning appointment is easy. You can either call our office or use our online booking system to choose a convenient date and time for your service. We aim to accommodate your schedule.',
  },
  {
    question: 'Do you offer one-time pool cleaning services in Pinal County?',
    answer:
      'Yes, we provide one-time pool cleaning services in Pinal County for special occasions or situations where a single cleaning is required. Contact us to discuss your specific needs.',
  },
  {
    question:
      'What should I do to prepare for a pool cleaning appointment in Pinal County, AZ?',
    answer:
      'Before our technicians arrive, please ensure that pool toys, furniture, and obstacles are cleared from the pool area. Additionally, access to the pool equipment should be clear for maintenance purposes.',
  },
  {
    question:
      'Can I trust your pool cleaning services for maintaining a safe and healthy pool in Pinal County, AZ?',
    answer:
      'Absolutely! We prioritize pool safety and water quality. Our experienced technicians follow industry best practices to keep your pool clean, clear, and safe for swimming, complying with Pinal County regulations.',
  },
  {
    question:
      'How do you handle pool cleaning during monsoon season in Pinal County?',
    answer:
      'During monsoon season, we pay special attention to pool maintenance. We recommend more frequent cleaning to address debris and water quality issues caused by dust and storms. Our team is well-prepared to handle these challenges.',
  },
  {
    question: 'What sets your pool cleaning services apart from others?',
    answer:
      'Our commitment to excellence, experienced technicians, personalized service, and attention to detail make us stand out. We take pride in delivering the highest level of pool cleaning services to our valued clients in Pinal County.',
  },
  {
    question: 'What is included in a typical pool cleaning service?',
    answer:
      'A typical pool cleaning service includes skimming, vacuuming, brushing, emptying the skimmer basket, checking and balancing water chemistry, and inspecting pool equipment for proper functioning. Additional services may be available upon request.',
  },
  {
    question: 'Can I trust automatic pool cleaners for routine maintenance?',
    answer:
      'Yes, automatic pool cleaners can be reliable for routine maintenance. They come in various types, including suction-side, pressure-side, and robotic cleaners, each with its advantages. Regular supervision and occasional manual cleaning may still be necessary.',
  },
];

const Page = () => {
  return (
    <MaxWidthWrapper className='mt-20'>
      <div className='max-w-4xl mx-auto text-center'>
        <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium rounded-full shadow-sm'>
          FAQs
        </span>
        <h2 className='mb-4 text-4xl md:text-5xl leading-tight text-coolGray-900 font-bold tracking-tighter'>
          Frequently Asked Questions
        </h2>
        <p className='mb-24 text-lg md:text-xl text-coolGray-500 font-medium'>
          Discover More About Our Services
        </p>
      </div>
      <div className='max-w-3xl mx-auto'>
        {poolCleaningFAQs.map((faq, index) => (
          <Link
            key={index}
            className='flex flex-wrap w-full p-10 mb-8 text-coolGray-300 hover:text-coolGray-400 bg-coolGray-50 text-left border border-transparent hover:border-coolGray-200 rounded-md shadow-lg transition duration-200'
            href='#informationWeCollect'
          >
            <div className='w-full md:w-3/4 lg:w-auto lg:pr-10'>
              <h3 className='mb-4 text-xl text-coolGray-900 font-bold'>
                {faq.question}
              </h3>
              <p className='text-coolGray-500 font-medium'>{faq.answer}</p>
            </div>
            <div className='ml-auto'>
              <svg
                width={24}
                height={24}
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12.71 8.29C12.6149 8.19896 12.5028 8.12759 12.38 8.08C12.1365 7.97998 11.8635 7.97998 11.62 8.08C11.4972 8.12759 11.3851 8.19896 11.29 8.29L8.29 11.29C8.1017 11.4783 7.99591 11.7337 7.99591 12C7.99591 12.2663 8.1017 12.5217 8.29 12.71C8.4783 12.8983 8.7337 13.0041 9 13.0041C9.2663 13.0041 9.5217 12.8983 9.71 12.71L11 11.41L11 15C11 15.2652 11.1054 15.5196 11.2929 15.7071C11.4804 15.8946 11.7348 16 12 16C12.2652 16 12.5196 15.8946 12.7071 15.7071C12.8946 15.5196 13 15.2652 13 15L13 11.41L14.29 12.71C14.383 12.8037 14.4936 12.8781 14.6154 12.9289C14.7373 12.9797 14.868 13.0058 15 13.0058C15.132 13.0058 15.2627 12.9797 15.3846 12.9289C15.5064 12.8781 15.617 12.8037 15.71 12.71C15.8037 12.617 15.8781 12.5064 15.9289 12.3846C15.9797 12.2627 16.0058 12.132 16.0058 12C16.0058 11.868 15.9797 11.7373 15.9289 11.6154C15.8781 11.4936 15.8037 11.383 15.71 11.29L12.71 8.29ZM12 2C10.0222 2 8.08879 2.58649 6.4443 3.6853C4.79981 4.78412 3.51808 6.3459 2.7612 8.17316C2.00433 10.0004 1.80629 12.0111 2.19215 13.9509C2.578 15.8907 3.53041 17.6725 4.92893 19.0711C6.32746 20.4696 8.10929 21.422 10.0491 21.8078C11.9889 22.1937 13.9996 21.9957 15.8268 21.2388C17.6541 20.4819 19.2159 19.2002 20.3147 17.5557C21.4135 15.9112 22 13.9778 22 12C22 9.34783 20.9464 6.80429 19.0711 4.92893C18.1425 4.00034 17.0401 3.26375 15.8268 2.7612C14.6136 2.25865 13.3132 2 12 2ZM12 20C10.4177 20 8.87103 19.5308 7.55544 18.6518C6.23984 17.7727 5.21446 16.5233 4.60896 15.0615C4.00346 13.5997 3.84503 11.9911 4.15372 10.4393C4.4624 8.88743 5.22432 7.46196 6.34314 6.34314C7.46196 5.22432 8.88743 4.4624 10.4393 4.15371C11.9911 3.84503 13.5997 4.00346 15.0615 4.60896C16.5233 5.21446 17.7727 6.23984 18.6518 7.55543C19.5308 8.87103 20 10.4177 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20Z'
                  fill='currentColor'
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
