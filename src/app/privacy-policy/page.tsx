import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <section
      className='py-24 bg-white scroll-smooth'
      style={{
        backgroundImage: 'url("flex-ui-assets/elements/pattern-white.svg")',
        backgroundPosition: 'center',
      }}
    >
      <div className='container px-4 mx-auto'>
        <div className='max-w-4xl mx-auto text-center'>
          <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-green-500 bg-green-100 font-medium rounded-full shadow-sm'>
            Privacy
          </span>
          <h2 className='mb-4 text-4xl md:text-5xl leading-tight text-coolGray-900 font-bold tracking-tighter'>
            Privacy Policy
          </h2>
          <p className='mb-24 text-lg md:text-xl text-coolGray-500 font-medium'>
            Learn more about how Krystal Clean collects and uses data and your
            rights as a user.
          </p>
        </div>
        <div className='max-w-3xl mx-auto'>
          <Link
            className='flex flex-wrap w-full p-10 mb-8 text-coolGray-300 hover:text-coolGray-400 bg-coolGray-50 text-left border border-transparent hover:border-coolGray-200 rounded-md shadow-lg transition duration-200'
            href='#informationWeCollect'
          >
            <div className='w-full md:w-3/4 lg:w-auto lg:pr-10'>
              <h3 className='mb-4 text-xl text-coolGray-900 font-bold'>
                What personal data does Krystal Clean collect?
              </h3>
              <p className='text-coolGray-500 font-medium'>
                Understand what types of personal information we collect,
                including details like contact info, payment details, and usage
                data.
              </p>
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
          <Link
            className='flex flex-wrap w-full p-10 mb-8 text-coolGray-300 hover:text-coolGray-400 bg-coolGray-50 text-left border border-transparent hover:border-coolGray-200 rounded-md shadow-lg transition duration-200'
            href='#processData'
          >
            <div className='w-full md:w-3/4 lg:w-auto lg:pr-10'>
              <h3 className='text-xl text-coolGray-900 font-bold'>
                How is my data used by Krystal Clean?
              </h3>
              <p className='text-coolGray-500 font-medium'>
                Learn about the ways we use your data, such as providing
                services, customer support, and improving our offerings.
              </p>
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
                  d='M11.29 15.71C11.3851 15.801 11.4972 15.8724 11.62 15.92C11.8635 16.02 12.1365 16.02 12.38 15.92C12.5028 15.8724 12.6149 15.801 12.71 15.71L15.71 12.71C15.8983 12.5217 16.0041 12.2663 16.0041 12C16.0041 11.7337 15.8983 11.4783 15.71 11.29C15.5217 11.1017 15.2663 10.9959 15 10.9959C14.7337 10.9959 14.4783 11.1017 14.29 11.29L13 12.59L13 9C13 8.73479 12.8946 8.48043 12.7071 8.2929C12.5196 8.10536 12.2652 8 12 8C11.7348 8 11.4804 8.10536 11.2929 8.2929C11.1054 8.48043 11 8.73479 11 9L11 12.59L9.71 11.29C9.61704 11.1963 9.50644 11.1219 9.38458 11.0711C9.26272 11.0203 9.13201 10.9942 9 10.9942C8.86799 10.9942 8.73728 11.0203 8.61542 11.0711C8.49356 11.1219 8.38296 11.1963 8.29 11.29C8.19627 11.383 8.12188 11.4936 8.07111 11.6154C8.02034 11.7373 7.9942 11.868 7.9942 12C7.9942 12.132 8.02034 12.2627 8.07111 12.3846C8.12188 12.5064 8.19627 12.617 8.29 12.71L11.29 15.71ZM12 22C13.9778 22 15.9112 21.4135 17.5557 20.3147C19.2002 19.2159 20.4819 17.6541 21.2388 15.8268C21.9957 13.9996 22.1937 11.9889 21.8079 10.0491C21.422 8.10929 20.4696 6.32746 19.0711 4.92894C17.6725 3.53041 15.8907 2.578 13.9509 2.19215C12.0111 1.8063 10.0004 2.00433 8.17317 2.76121C6.3459 3.51809 4.78412 4.79981 3.6853 6.4443C2.58649 8.08879 2 10.0222 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7363 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22ZM12 4C13.5823 4 15.129 4.4692 16.4446 5.34825C17.7602 6.2273 18.7855 7.47673 19.391 8.93854C19.9965 10.4003 20.155 12.0089 19.8463 13.5607C19.5376 15.1126 18.7757 16.538 17.6569 17.6569C16.538 18.7757 15.1126 19.5376 13.5607 19.8463C12.0089 20.155 10.4003 19.9965 8.93853 19.391C7.47672 18.7855 6.22729 17.7602 5.34824 16.4446C4.46919 15.129 4 13.5823 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84286 9.87827 4 12 4Z'
                  fill='currentColor'
                />
              </svg>
            </div>
          </Link>
          <Link
            className='flex flex-wrap w-full p-10 mb-8 text-coolGray-300 hover:text-coolGray-400 bg-coolGray-50 text-left border border-transparent hover:border-coolGray-200 rounded-md shadow-lg transition duration-200'
            href='#dataSharing'
          >
            <div className='w-full md:w-3/4 lg:w-auto lg:pr-10'>
              <h3 className='text-xl text-coolGray-900 font-bold'>
                Is my personal information shared with third parties?
              </h3>
              <p className='text-coolGray-500 font-medium'>
                Find out about our policy on sharing data with external entities
                and under what circumstances this might occur.
              </p>
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
                  d='M11.29 15.71C11.3851 15.801 11.4972 15.8724 11.62 15.92C11.8635 16.02 12.1365 16.02 12.38 15.92C12.5028 15.8724 12.6149 15.801 12.71 15.71L15.71 12.71C15.8983 12.5217 16.0041 12.2663 16.0041 12C16.0041 11.7337 15.8983 11.4783 15.71 11.29C15.5217 11.1017 15.2663 10.9959 15 10.9959C14.7337 10.9959 14.4783 11.1017 14.29 11.29L13 12.59L13 9C13 8.73479 12.8946 8.48043 12.7071 8.2929C12.5196 8.10536 12.2652 8 12 8C11.7348 8 11.4804 8.10536 11.2929 8.2929C11.1054 8.48043 11 8.73479 11 9L11 12.59L9.71 11.29C9.61704 11.1963 9.50644 11.1219 9.38458 11.0711C9.26272 11.0203 9.13201 10.9942 9 10.9942C8.86799 10.9942 8.73728 11.0203 8.61542 11.0711C8.49356 11.1219 8.38296 11.1963 8.29 11.29C8.19627 11.383 8.12188 11.4936 8.07111 11.6154C8.02034 11.7373 7.9942 11.868 7.9942 12C7.9942 12.132 8.02034 12.2627 8.07111 12.3846C8.12188 12.5064 8.19627 12.617 8.29 12.71L11.29 15.71ZM12 22C13.9778 22 15.9112 21.4135 17.5557 20.3147C19.2002 19.2159 20.4819 17.6541 21.2388 15.8268C21.9957 13.9996 22.1937 11.9889 21.8079 10.0491C21.422 8.10929 20.4696 6.32746 19.0711 4.92894C17.6725 3.53041 15.8907 2.578 13.9509 2.19215C12.0111 1.8063 10.0004 2.00433 8.17317 2.76121C6.3459 3.51809 4.78412 4.79981 3.6853 6.4443C2.58649 8.08879 2 10.0222 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7363 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22ZM12 4C13.5823 4 15.129 4.4692 16.4446 5.34825C17.7602 6.2273 18.7855 7.47673 19.391 8.93854C19.9965 10.4003 20.155 12.0089 19.8463 13.5607C19.5376 15.1126 18.7757 16.538 17.6569 17.6569C16.538 18.7757 15.1126 19.5376 13.5607 19.8463C12.0089 20.155 10.4003 19.9965 8.93853 19.391C7.47672 18.7855 6.22729 17.7602 5.34824 16.4446C4.46919 15.129 4 13.5823 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84286 9.87827 4 12 4Z'
                  fill='currentColor'
                />
              </svg>
            </div>
          </Link>
          <Link
            className='flex flex-wrap w-full p-10 text-coolGray-300 hover:text-coolGray-400 bg-coolGray-50 text-left border border-transparent hover:border-coolGray-200 rounded-md shadow-lg transition duration-200'
            href='#dataSecurity'
          >
            <div className='w-full md:w-3/4 lg:w-auto lg:pr-10'>
              <h3 className='text-xl text-coolGray-900 font-bold'>
                How does Krystal Clean ensure my data is secure?
              </h3>
              <p className='text-coolGray-500 font-medium'>
                Discover the security measures we employ to protect your
                personal information from unauthorized access or breaches.
              </p>
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
                  d='M11.29 15.71C11.3851 15.801 11.4972 15.8724 11.62 15.92C11.8635 16.02 12.1365 16.02 12.38 15.92C12.5028 15.8724 12.6149 15.801 12.71 15.71L15.71 12.71C15.8983 12.5217 16.0041 12.2663 16.0041 12C16.0041 11.7337 15.8983 11.4783 15.71 11.29C15.5217 11.1017 15.2663 10.9959 15 10.9959C14.7337 10.9959 14.4783 11.1017 14.29 11.29L13 12.59L13 9C13 8.73479 12.8946 8.48043 12.7071 8.2929C12.5196 8.10536 12.2652 8 12 8C11.7348 8 11.4804 8.10536 11.2929 8.2929C11.1054 8.48043 11 8.73479 11 9L11 12.59L9.71 11.29C9.61704 11.1963 9.50644 11.1219 9.38458 11.0711C9.26272 11.0203 9.13201 10.9942 9 10.9942C8.86799 10.9942 8.73728 11.0203 8.61542 11.0711C8.49356 11.1219 8.38296 11.1963 8.29 11.29C8.19627 11.383 8.12188 11.4936 8.07111 11.6154C8.02034 11.7373 7.9942 11.868 7.9942 12C7.9942 12.132 8.02034 12.2627 8.07111 12.3846C8.12188 12.5064 8.19627 12.617 8.29 12.71L11.29 15.71ZM12 22C13.9778 22 15.9112 21.4135 17.5557 20.3147C19.2002 19.2159 20.4819 17.6541 21.2388 15.8268C21.9957 13.9996 22.1937 11.9889 21.8079 10.0491C21.422 8.10929 20.4696 6.32746 19.0711 4.92894C17.6725 3.53041 15.8907 2.578 13.9509 2.19215C12.0111 1.8063 10.0004 2.00433 8.17317 2.76121C6.3459 3.51809 4.78412 4.79981 3.6853 6.4443C2.58649 8.08879 2 10.0222 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7363 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22ZM12 4C13.5823 4 15.129 4.4692 16.4446 5.34825C17.7602 6.2273 18.7855 7.47673 19.391 8.93854C19.9965 10.4003 20.155 12.0089 19.8463 13.5607C19.5376 15.1126 18.7757 16.538 17.6569 17.6569C16.538 18.7757 15.1126 19.5376 13.5607 19.8463C12.0089 20.155 10.4003 19.9965 8.93853 19.391C7.47672 18.7855 6.22729 17.7602 5.34824 16.4446C4.46919 15.129 4 13.5823 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84286 9.87827 4 12 4Z'
                  fill='currentColor'
                />
              </svg>
            </div>
          </Link>
          <Link
            className='flex flex-wrap w-full p-10 text-coolGray-300 hover:text-coolGray-400 bg-coolGray-50 text-left border border-transparent hover:border-coolGray-200 rounded-md shadow-lg transition duration-200'
            href='#dataRights'
          >
            <div className='w-full md:w-3/4 lg:w-auto lg:pr-10'>
              <h3 className='text-xl text-coolGray-900 font-bold'>
                What are my rights regarding my personal data?
              </h3>
              <p className='text-coolGray-500 font-medium'>
                Understand your rights about accessing, modifying, or requesting
                the deletion of your personal data.
              </p>
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
                  d='M11.29 15.71C11.3851 15.801 11.4972 15.8724 11.62 15.92C11.8635 16.02 12.1365 16.02 12.38 15.92C12.5028 15.8724 12.6149 15.801 12.71 15.71L15.71 12.71C15.8983 12.5217 16.0041 12.2663 16.0041 12C16.0041 11.7337 15.8983 11.4783 15.71 11.29C15.5217 11.1017 15.2663 10.9959 15 10.9959C14.7337 10.9959 14.4783 11.1017 14.29 11.29L13 12.59L13 9C13 8.73479 12.8946 8.48043 12.7071 8.2929C12.5196 8.10536 12.2652 8 12 8C11.7348 8 11.4804 8.10536 11.2929 8.2929C11.1054 8.48043 11 8.73479 11 9L11 12.59L9.71 11.29C9.61704 11.1963 9.50644 11.1219 9.38458 11.0711C9.26272 11.0203 9.13201 10.9942 9 10.9942C8.86799 10.9942 8.73728 11.0203 8.61542 11.0711C8.49356 11.1219 8.38296 11.1963 8.29 11.29C8.19627 11.383 8.12188 11.4936 8.07111 11.6154C8.02034 11.7373 7.9942 11.868 7.9942 12C7.9942 12.132 8.02034 12.2627 8.07111 12.3846C8.12188 12.5064 8.19627 12.617 8.29 12.71L11.29 15.71ZM12 22C13.9778 22 15.9112 21.4135 17.5557 20.3147C19.2002 19.2159 20.4819 17.6541 21.2388 15.8268C21.9957 13.9996 22.1937 11.9889 21.8079 10.0491C21.422 8.10929 20.4696 6.32746 19.0711 4.92894C17.6725 3.53041 15.8907 2.578 13.9509 2.19215C12.0111 1.8063 10.0004 2.00433 8.17317 2.76121C6.3459 3.51809 4.78412 4.79981 3.6853 6.4443C2.58649 8.08879 2 10.0222 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7363 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22ZM12 4C13.5823 4 15.129 4.4692 16.4446 5.34825C17.7602 6.2273 18.7855 7.47673 19.391 8.93854C19.9965 10.4003 20.155 12.0089 19.8463 13.5607C19.5376 15.1126 18.7757 16.538 17.6569 17.6569C16.538 18.7757 15.1126 19.5376 13.5607 19.8463C12.0089 20.155 10.4003 19.9965 8.93853 19.391C7.47672 18.7855 6.22729 17.7602 5.34824 16.4446C4.46919 15.129 4 13.5823 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84286 9.87827 4 12 4Z'
                  fill='currentColor'
                />
              </svg>
            </div>
          </Link>
        </div>
        <div className='flex flex-col space-y-2 px-8 leading-6 mt-20'>
          <h2 className='text-2xl font-semibold'>PRIVACY POLICY</h2>
          <p>Last updated January 31, 2024</p>
          <p>
            This privacy notice for Krystal Clean Pool Service LLC.
            (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), describes how
            and why we might collect, store, use, and/or share
            (&quot;process&quot;) your information when you use our services
            (&quot;Services&quot;), such as when you:
          </p>
          <ul>
            <li>
              Visit our website at{' '}
              <Link href='https://krystalcleanpools.com/'>
                https://krystalcleanpools.com/
              </Link>
              , or any website of ours that links to this privacy notice
            </li>
            <li>
              Engage with us in other related ways, including any sales,
              marketing, or events
            </li>
          </ul>
          <p>
            Questions or concerns? Reading this privacy notice will help you
            understand your privacy rights and choices. If you do not agree with
            our policies and practices, please do not use our Services. If you
            still have any questions or concerns, please contact us at{' '}
            <Link href='mailto:support@krystalcleanpools.com'>
              support@krystalcleanpools.com
            </Link>
            .
          </p>
          <h3 className='text-2xl font-semibold my-4 self-center'>
            SUMMARY OF KEY POINTS
          </h3>
          <p>
            This summary provides key points from our privacy notice, but you
            can find out more details about any of these topics by clicking the
            link following each key point or by using our table of contents
            below to find the section you are looking for.
          </p>
          <h3
            id='informationWeCollect'
            className='text-2xl font-semibold pt-20 self-center '
          >
            1. WHAT INFORMATION DO WE COLLECT?
          </h3>
          <p>Personal information you disclose to us</p>
          <p>
            We collect personal information that you voluntarily provide to us
            when you register on the Services, express an interest in obtaining
            information about us or our products and Services, when you
            participate in activities on the Services, or otherwise when you
            contact us.
          </p>
          <p>Personal Information Provided by You.</p>
          <ul>
            <li className='list-disc'>phone numbers</li>
            <li className='list-disc'>email addresses</li>
            <li className='list-disc'>names</li>
            <li className='list-disc'>mailing addresses</li>
          </ul>
          <p>Sensitive Information. We do not process sensitive information.</p>
          <p>
            Payment Data. We may collect data necessary to process your payment
            if you make purchases, such as your payment instrument number, and
            the security code associated with your payment instrument. All
            payment data is stored by Stripe Inc.. You may find their privacy
            notice link(s) here:{' '}
            <Link href='https://stripe.com/privacy'>
              https://stripe.com/privacy
            </Link>
            .
          </p>
          <p>
            Social Media Login Data. We may provide you with the option to
            register with us using your existing social media account details,
            like your Facebook, Twitter, or other social media account. If you
            choose to register in this way, we will collect the information
            described in the section called &quot;HOW DO WE HANDLE YOUR SOCIAL
            LOGINS?&quot; below.
          </p>
          <p>
            All personal information that you provide to us must be true,
            complete, and accurate, and you must notify us of any changes to
            such personal information.
          </p>
          <p>Information automatically collected</p>
          <p>
            Some information — such as your Internet Protocol (IP) address
            and/or browser and device characteristics — is collected
            automatically when you visit our Services.
          </p>
          <p>
            We automatically collect certain information when you visit, use, or
            navigate the Services. This information does not reveal your
            specific identity (like your name or contact information) but may
            include device and usage information, such as your IP address,
            browser and device characteristics, operating system, language
            preferences, referring URLs, device name, country, location,
            information about how and when you use our Services, and other
            technical information. This information is primarily needed to
            maintain the security and operation of our Services, and for our
            internal analytics and reporting purposes.
          </p>
          <p>
            Like many businesses, we also collect information through cookies
            and similar technologies.
          </p>
          <p>The information we collect includes:</p>
          <ul>
            <li className='list-disc'>
              Log and Usage Data. Log and usage data is service-related,
              diagnostic, usage, and performance information our servers
              automatically collect when you access or use our Services and
              which we record in log files. Depending on how you interact with
              us, this log data may include your IP address, device information,
              browser type, and settings and information about your activity in
              the Services (such as the date/time stamps associated with your
              usage, pages and files viewed, searches, and other actions you
              take such as which features you use), device event information
              (such as system activity, error reports (sometimes called
              &quot;crash dumps&quot;), and hardware settings).
            </li>
            <li className='list-disc'>
              Device Data. We collect device data such as information about your
              computer, phone, tablet, or other device you use to access the
              Services. Depending on the device used, this device data may
              include information such as your IP address (or proxy server),
              device and application identification numbers, location, browser
              type, hardware model, Internet service provider and/or mobile
              carrier, operating system, and system configuration information.
            </li>
            <li className='list-disc'>
              Location Data. We collect location data such as information about
              your device&apos;s location, which can be either precise or
              imprecise. How much information we collect depends on the type and
              settings of the device you use to access the Services. For
              example, we may use GPS and other technologies to collect
              geolocation data that tells us your current location (based on
              your IP address). You can opt out of allowing us to collect this
              information either by refusing access to the information or by
              disabling your Location setting on your device. However, if you
              choose to opt out, you may not be able to use certain aspects of
              the Services.
            </li>
          </ul>
          <h3
            id='processData'
            className='text-2xl font-semibold pt-20 my-4 self-center'
          >
            2. HOW DO WE PROCESS YOUR INFORMATION?
          </h3>
          <p>
            We process your information to provide, improve, and administer our
            Services, communicate with you, for security and fraud prevention,
            and to comply with law. We may also process your information for
            other purposes with your consent. We process your information only
            when we have a valid legal reason to do so.
          </p>
          <h3
            id='dataSharing'
            className='text-2xl font-semibold my-4 pt-20 self-center'
          >
            3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
          </h3>
          <p>
            We may share information in specific situations and with specific
            third parties. Learn more about when and with whom we share your
            personal information.
          </p>
          <ul>
            <li className='list-disc'>
              Business Transfers. We may share or transfer your information in
              connection with, or during negotiations of, any merger, sale of
              company assets, financing, or acquisition of all or a portion of
              our business to another company.
            </li>
            <li className='list-disc'>
              When we use Google Analytics. We may share your information with
              Google Analytics to track and analyze the use of the Services. The
              Google Analytics Advertising Features that we may use include:
              Remarketing with Google Analytics. To opt out of being tracked by
              Google Analytics across the Services, visit{' '}
              <Link href='https://tools.google.com/dlpage/gaoptout'>
                https://tools.google.com/dlpage/gaoptout
              </Link>
              . You can opt out of Google Analytics Advertising Features through
              Ads Settings and Ad Settings for mobile apps. Other opt out means
              include{' '}
              <Link href='http://optout.networkadvertising.org/'>
                http://optout.networkadvertising.org/
              </Link>{' '}
              and{' '}
              <Link href='http://www.networkadvertising.org/mobile-choice'>
                http://www.networkadvertising.org/mobile-choice
              </Link>
              . For more information on the privacy practices of Google, please
              visit the Google Privacy & Terms page.
            </li>
            <li className='list-disc'>
              When we use Google Maps Platform APIs. We may share your
              information with certain Google Maps Platform APIs (e.g., Google
              Maps API, Places API).
            </li>
          </ul>
          <h3 className='text-2xl font-semibold my-4 self-center'>
            4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
          </h3>
          <p>
            We may use cookies and other tracking technologies to collect and
            store your information.
          </p>
          <p>
            We may use cookies and similar tracking technologies (like web
            beacons and pixels) to access or store information. Specific
            information about how we use such technologies and how you can
            refuse certain cookies is set out in our Cookie Notice.
          </p>
          <h3 className='text-2xl font-semibold my-4 self-center'>
            5. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
          </h3>
          <p>
            If you choose to register or log in to our Services using a social
            media account, we may have access to certain information about you.
          </p>
          <p>
            Our Services offer you the ability to register and log in using your
            third-party social media account details (like your Facebook or
            Twitter logins). Where you choose to do this, we will receive
            certain profile information about you from your social media
            provider. The profile information we receive may vary depending on
            the social media provider concerned, but will often include your
            name, email address, friends list, and profile picture, as well as
            other information you choose to make public on such a social media
            platform.
          </p>
          <p>
            We will use the information we receive only for the purposes that
            are described in this privacy notice or that are otherwise made
            clear to you on the relevant Services.
          </p>
          <p>
            Please note that we do not control, and are not responsible for,
            other uses of your personal information by your third-party social
            media provider. We recommend that you review their privacy notice to
            understand how they collect, use, and share your personal
            information, and how you can set your privacy preferences on their
            sites and apps.
          </p>
          <h3 className='text-2xl font-semibold my-4 self-center pt-20'>
            6. HOW LONG DO WE KEEP YOUR INFORMATION?
          </h3>
          <p>
            We keep your information for as long as necessary to fulfill the
            purposes outlined in this privacy notice unless otherwise required
            by law.
          </p>
          <p>
            We will only keep your personal information for as long as it is
            necessary for the purposes set out in this privacy notice, unless a
            longer retention period is required or permitted by law (such as
            tax, accounting, or other legal requirements). No purpose in this
            notice will require us keeping your personal information for longer
            than the period of time in which users have an account with us.
          </p>
          <p>
            When we have no ongoing legitimate business need to process your
            personal information, we will either delete or anonymize such
            information, or, if this is not possible (for example, because your
            personal information has been stored in backup archives), then we
            will securely store your personal information and isolate it from
            any further processing until deletion is possible.
          </p>
          <h3
            id='dataSecurity'
            className='text-2xl font-semibold my-4 self-center pt-20'
          >
            7. HOW DO WE KEEP YOUR INFORMATION SAFE?
          </h3>
          <p>
            We aim to protect your personal information through a system of
            organizational and technical security measures.
          </p>
          <p>
            We have implemented appropriate and reasonable technical and
            organizational security measures designed to protect the security of
            any personal information we process. However, despite our safeguards
            and efforts to secure your information, no electronic transmission
            over the Internet or information storage technology can be
            guaranteed to be 100% secure, so we cannot promise or guarantee that
            hackers, cybercriminals, or other unauthorized third parties will
            not be able to defeat our security and improperly collect, access,
            steal, or modify your information. Although we will do our best to
            protect your personal information, transmission of personal
            information to and from our Services is at your own risk. You should
            only access the Services within a secure environment.
          </p>
          <h3 className='text-2xl font-semibold my-4 self-center pt-20'>
            8. DO WE COLLECT INFORMATION FROM MINORS?
          </h3>
          <p>
            We do not knowingly collect data from or market to children under 18
            years of age.
          </p>
          <p>
            We do not knowingly solicit data from or market to children under 18
            years of age. By using the Services, you represent that you are at
            least 18 or that you are the parent or guardian of such a minor and
            consent to such minor dependent&apos;s use of the Services. If we
            learn that personal information from users less than 18 years of age
            has been collected, we will deactivate the account and take
            reasonable measures to promptly delete such data from our records.
            If you become aware of any data we may have collected from children
            under age 18, please contact us at{' '}
            <Link href='mailto:john@krystalclean.com'>
              john@krystalclean.com
            </Link>
            .
          </p>
          <h3
            id='dataRights'
            className='text-2xl font-semibold my-4 self-center pt-20'
          >
            9. WHAT ARE YOUR PRIVACY RIGHTS?
          </h3>
          <p>You may review, change, or terminate your account at any time.</p>
          <p>
            Withdrawing your consent: If we are relying on your consent to
            process your personal information, which may be express and/or
            implied consent depending on the applicable law, you have the right
            to withdraw your consent at any time. You can withdraw your consent
            at any time by contacting us by using the contact details provided
            in the section &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot;
            below.
          </p>
          <p>
            However, please note that this will not affect the lawfulness of the
            processing before its withdrawal nor, when applicable law allows,
            will it affect the processing of your personal information conducted
            in reliance on lawful processing grounds other than consent.
          </p>
          <p>
            Opting out of marketing and promotional communications: You can
            unsubscribe from our marketing and promotional communications at any
            time by clicking on the unsubscribe link in the emails that we send,
            or by contacting us using the details provided in the section
            &quot;HOW CAN YOU CONTACT US ABOUT THIS NOTICE?&quot; below. You
            will then be removed from the marketing lists. However, we may still
            communicate with you — for example, to send you service-related
            messages that are necessary for the administration and use of your
            account, to respond to service requests, or for other non-marketing
            purposes.
          </p>
          <h3 className='text-2xl font-semibold my-4 self-center pt-20'>
            10. CONTROLS FOR DO-NOT-TRACK FEATURES
          </h3>
          <p>
            Most web browsers and some mobile operating systems and mobile
            applications include a Do-Not-Track (&quot;DNT&quot;) feature or
            setting you can activate to signal your privacy preference not to
            have data about your online browsing activities monitored and
            collected. At this stage no uniform technology standard for
            recognizing and implementing DNT signals has been finalized. As
            such, we do not currently respond to DNT browser signals or any
            other mechanism that automatically communicates your choice not to
            be tracked online. If a standard for online tracking is adopted that
            we must follow in the future, we will inform you about that practice
            in a revised version of this privacy notice.
          </p>
          <h3 className='text-2xl font-semibold my-4 self-center pt-20'>
            11. DO WE MAKE UPDATES TO THIS NOTICE?
          </h3>
          <p>
            Yes, we will update this notice as necessary to stay compliant with
            relevant laws.
          </p>
          <p>
            We may update this privacy notice from time to time. The updated
            version will be indicated by an updated &quot;Revised&quot; date and
            the updated version will be effective as soon as it is accessible.
            If we make material changes to this privacy notice, we may notify
            you either by prominently posting a notice of such changes or by
            directly sending you a notification. We encourage you to review this
            privacy notice frequently to be informed of how we are protecting
            your information.
          </p>
          <h3 className='text-2xl font-semibold my-4 self-center pt-20'>
            12. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
          </h3>
          <p>
            If you have questions or comments about this notice, you may email
            us at{' '}
            <Link href='mailto:support@krystalcleanpools.com'>
              support@krystalcleanpools.com
            </Link>{' '}
            or contact us by post at:
          </p>
          <p>Krystal Clean Pool Service LLC.</p>
          <p>11676 E Sunflower Lane</p>
          <p>Florence, AZ 85132</p>
          <p>United States</p>
          <h3>
            13. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM
            YOU?
          </h3>
          <p>
            Based on the applicable laws of your country, you may have the right
            to request access to the personal information we collect from you,
            change that information, or delete it. To request to review, update,
            or delete your personal information, please fill out and submit a
            data subject access request.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Page;
