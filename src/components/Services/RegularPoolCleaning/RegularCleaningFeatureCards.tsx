import { CheckSquare } from 'lucide-react';
import React from 'react';

interface RegularCleaningFeatureCardProps {
  badgeTitle: string;
}

const RegularCleaningFeatureCards = ({badgeTitle}: RegularCleaningFeatureCardProps) => {
  return (
    <section
    className='py-24 md:pb-32 bg-white'
    style={{
      backgroundImage: 'url("/pattern-white.svg")',
      backgroundPosition: 'center',
    }}
  >
    <div className='container px-4 mx-auto'>
      <div className='md:max-w-4xl mb-12 mx-auto text-center'>
        <span className='inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-full shadow-sm'>
        {badgeTitle}
        </span>
        <h1 className='mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter'>
          Discover the Brilliance of Regular Pool Care
        </h1>
        <p className='text-lg md:text-xl text-gray-500 font-medium'>
          Embrace the ease and reliability of our comprehensive pool
          cleaning services. With our dedicated team&apos;s expertise, we
          ensure every aspect of your pool maintenance is handled
          professionally, providing you with peace of mind and more time to
          enjoy your pristine pool.
        </p>
      </div>
      <div className='flex flex-wrap -mx-4'>
        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
          <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
            <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />
            <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
              Surface Cleaning
            </h3>
            <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
              Pristine Surface, Crystal Clear Waters
            </h2>
            <p className='text-gray-500 font-medium'>
              Every visit includes thorough skimming of the pool&apos;s
              surface to remove leaves, debris, and other floating
              impurities, ensuring a spotless and inviting look every time.
            </p>
          </div>
        </div>
        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
          <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
            <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

            <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
              Vacuuming and Brushing
            </h3>
            <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
              Deep Clean, Lasting Shine
            </h2>
            <p className='text-gray-500 font-medium'>
              Our team meticulously vacuums and brushes the pool floor and
              walls, removing dirt, algae, and build-up. This not only keeps
              your pool looking great but also helps in maintaining a
              healthy swimming environment.
            </p>
          </div>
        </div>
        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
          <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
            <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

            <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
              Filter Cleaning
            </h3>
            <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
              Optimal Performance, Enhanced Longevity
            </h2>
            <p className='text-gray-500 font-medium'>
              Regular cleaning and inspection of the pool&apos;s filter
              system are crucial. We ensure that filters are clean and
              functioning efficiently, which is essential for maintaining
              water clarity and hygiene.
            </p>
          </div>
        </div>
        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
          <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
            <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

            <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
              Chemical Balancing
            </h3>
            <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
              Balanced Waters for Safe Swimming
            </h2>
            <p className='text-gray-500 font-medium'>
              Balancing the chemicals in your pool is vital for preventing
              bacteria and algae growth. Our experts test and adjust
              chlorine, pH, and other chemical levels to ensure your pool
              water is safe and comfortable for swimming.
            </p>
          </div>
        </div>
        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
          <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
            <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

            <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
              Equipment Check
            </h3>
            <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
              Smooth Operation, Reliable Enjoyment
            </h2>
            <p className='text-gray-500 font-medium'>
              We perform routine checks on all pool equipment, including
              pumps, heaters, and automatic cleaners, to ensure everything
              is in perfect working order, thus avoiding any unexpected
              disruptions.
            </p>
          </div>
        </div>
        <div className='w-full md:w-1/2 lg:w-1/3 px-4'>
          <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
            <CheckSquare className='text-blue-600 inline-flex h-16 w-16 mb-6 mx-auto' />

            <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
              Seasonal Services
            </h3>
            <h2 className='mb-2 text-md leading-tight font-medium text-blue-600'>
              Adapting Care for Every Season
            </h2>
            <p className='text-gray-500 font-medium'>
              Our services adapt to the changing seasons. Whether it&apos;s
              preparing your pool for summer use or winterizing it to
              prevent damage during colder months, we&apos;ve got you
              covered year-round.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
};

export default RegularCleaningFeatureCards;
