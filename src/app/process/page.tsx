import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { CheckSquare } from 'lucide-react';
import React from 'react';

const poolCleaningProcess = [
  {
    step: 1,
    title: 'Pool Inspection',
    description:
      'We begin by inspecting your pool area, removing any debris, and checking the filtration system and equipment to ensure everything is functioning properly before proceeding with the cleaning.',
  },
  {
    step: 2,
    title: 'Clean the Pump Basket',
    description:
      'To maintain optimal filtration efficiency, we clean the pump basket as needed, ensuring it is free from debris and residue. This ensures the circulation system operates at peak performance.',
  },
  {
    step: 3,
    title: 'Scrub Pool Walls',
    description:
      "Our team uses specialized brushes and pool wall soap to thoroughly scrub your pool's walls, ensuring they are spotless, including grout line stains.",
  },
  {
    step: 4,
    title: 'Skim the Pool',
    description:
      'After wall cleaning, we use a skimmer net and telescopic pole to remove floating debris such as leaves, sticks, or pollen, leaving your pool surface clean and clear.',
  },
  {
    step: 5,
    title: 'Empty the Skimmer Basket',
    description:
      'Before vacuuming, we empty the skimmer basket to maximize suction efficiency for the pool vacuum.',
  },
  {
    step: 6,
    title: 'Vacuum the Pool',
    description:
      "Using the appropriate vacuuming method for your pool, we ensure the pool's floor is thoroughly cleaned, leaving no visible debris behind.",
  },
  {
    step: 7,
    title: 'Backwash Sand and DE Filters',
    description:
      'For pools equipped with sand or diatomaceous earth (DE) filters, we perform a monthly backwash to maintain their effectiveness, ensuring crystal clear and debris-free water.',
  },
  {
    step: 8,
    title: 'Test the Pool Water and Add Chemicals',
    description:
      'We regularly test your pool water using a pool water test kit to check and adjust the water chemistry as necessary. We add the appropriate pool chemicals to ensure optimal water balance.',
  },
  {
    step: 9,
    title: 'Perform a Post-Cleaning Safety Check',
    description:
      'After completing the cleaning process, we conduct a final safety check to ensure the pool cover is secure, all pool systems are functioning smoothly, and pool area gates are locked if applicable. We also confirm that all pool toys and equipment are safely stored.',
  },
  {
    step: 10,
    title: 'Documenting the Cleaning',
    description:
      'Our technicians meticulously document the cleaning process on our website, providing all the details of the cleaning. This information is made visible in your customer service history tab in your account, allowing you to track the progress and details of each cleaning service.',
  },
];

const Page = () => {
  return (
    <MaxWidthWrapper>
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
              Our Process
            </span>
            <h1 className='mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter'>
              Our 10-Step Pool Cleaning Process
            </h1>
            <p className='text-lg md:text-xl text-gray-500 font-medium'>
              At Krystal Clean Pools, we take pride in providing top-notch pool
              cleaning services to keep your swimming pool in pristine
              condition. Our comprehensive 9-step pool cleaning process ensures
              your pool remains a safe and enjoyable oasis all year round.
            </p>
          </div>
          <div className='flex flex-wrap -mx-4'>
            {poolCleaningProcess.map((step) => (
              <div key={step.step} className='w-full md:w-1/2 lg:w-1/2 px-4'>
                <div className='h-full p-6 text-center hover:bg-white rounded-md hover:shadow-xl transition duration-200'>
                  <h3 className='mb-4 text-xl md:text-2xl leading-tight font-bold'>
                    <span className='text-blue-600 text-3xl font-bold'>
                      {step.step}.
                    </span>{' '}
                    {step.title}
                  </h3>

                  <p className='text-gray-500 font-medium'>
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default Page;
