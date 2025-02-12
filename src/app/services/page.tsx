import React from 'react';
import Image from 'next/image';
import PricingModule from '@/components/Home/PricingModule';
import { Home, Hotel, School } from 'lucide-react';
import AlgaeFeatureCards from '@/components/Services/AlgaeTreatment/AlgaeFeatureCards';
import RegularCleaningFeatureCards from '@/components/Services/RegularPoolCleaning/RegularCleaningFeatureCards';
import ServiceCTACard from '@/components/Services/ServiceCTACard';
import ContactSection from '@/components/ContactSection';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pool Maintenance & Cleaning Services in Florence, San Tan Valley, and Queen Creek | Krystal Clean Pools',
  description:
    'Discover tailored pool cleaning and maintenance services for residential, commercial, and community pools in Florence, San Tan Valley, and Queen Creek, AZ. From chemical balancing to algae treatments, our veteran-owned team delivers unmatched quality and reliability. Contact us today for a free quote!',
};

const Page = () => {
  return (
    <div className='md:px-10 py-18'>

      <section
        className="py-20 bg-white overflow-hidden"
        style={{
          backgroundImage: 'url("/pattern-white.svg")',
          backgroundPosition: 'center',
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="md:max-w-4xl mb-16 md:mb-20">
            <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-full shadow-sm">
              Our Services
            </span>
            <h1 className="mb-4 text-3xl md:text-4xl leading-tight font-bold tracking-tighter">
              Tailored Pool Maintenance for Every Need in Florence, San Tan Valley, and Queen Creek, AZ
            </h1>
            <p className="text-lg md:text-xl text-gray-500 font-medium">
              Discover our range of pool maintenance plans, designed to cater to
              different needs and pool sizes. From residential play pools to expansive
              commercial pools, we offer customized care solutions across Florence, San Tan Valley, and Queen Creek.
              Our services include chemical balancing, cleaning, and equipment maintenance, ensuring your pool remains
              a sparkling oasis all year round.
            </p>
            <div className='w-full flex items-center mt-6'>
              <a className=' mx-auto' href="tel:5205255956">
                <button className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
                  <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
                  <span className="relative z-20 text-xl">
                    Call Now
                  </span>
                  <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

                </button>
              </a>
            </div>

          </div>
          <div className="flex flex-wrap lg:items-center -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-8 md:mb-0">
              <div className="flex flex-wrap p-8 text-center md:text-left hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div className="w-full self-center md:w-auto mb-6 md:mb-0 md:pr-6">
                  <div className="inline-flex h-14 w-14 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg">
                    <Home className="h-8 w-8" />
                  </div>
                </div>
                <div className="w-full md:flex-1 md:pt-3">
                  <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-full shadow-sm">
                    Play Pools
                  </span>
                  <h3 className="mb-4 text-xl md:text-2xl leading-tight text-gray-900 font-bold">
                    Perfect for Residential Pools
                  </h3>
                  <p className="text-gray-500 font-medium">
                    Our Play Pool service offers comprehensive care for your
                    home pool. We focus on maintaining a healthy, balanced
                    environment for your family&apos;s enjoyment in Florence and beyond.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap p-8 text-center md:text-left hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div className="w-full self-center md:w-auto mb-6 md:mb-0 md:pr-6">
                  <div className="inline-flex h-14 w-14 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg">
                    <School className="h-8 w-8" />
                  </div>
                </div>
                <div className="w-full md:flex-1 md:pt-3">
                  <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-full shadow-sm">
                    Diving or Extra Large Pools
                  </span>
                  <h3 className="mb-4 text-xl md:text-2xl leading-tight text-gray-900 font-bold">
                    Specialized for Larger Pools
                  </h3>
                  <p className="text-gray-500 font-medium">
                    Ideal for diving and extra-large pools, this plan covers
                    extensive areas, ensuring every corner of your large pool in
                    San Tan Valley is perfectly maintained.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap p-8 text-center md:text-left hover:bg-white rounded-md hover:shadow-xl transition duration-200">
                <div className="w-full self-center md:w-auto mb-6 md:mb-0 md:pr-6">
                  <div className="inline-flex h-14 w-14 mx-auto items-center justify-center text-white bg-blue-500 rounded-lg">
                    <Hotel className="h-8 w-8" />
                  </div>
                </div>
                <div className="w-full md:flex-1 md:pt-3">
                  <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium uppercase rounded-full shadow-sm">
                    Commercial and Community Pools
                  </span>
                  <h3 className="mb-4 text-xl md:text-2xl leading-tight text-gray-900 font-bold">
                    Designed for High-Usage Pools
                  </h3>
                  <p className="text-gray-500 font-medium">
                    Our services for commercial and community pools address the
                    unique challenges of high-traffic pools, providing top-tier
                    maintenance for public enjoyment in Queen Creek and surrounding areas.
                  </p>
                </div>
              </div>
            </div>
            <div className='w-full md:w-1/2 px-4'>
              <div className='relative mx-auto md:mr-0 max-w-max'>
                <Image
                  className='absolute z-10 -left-8 -top-8 w-28 md:w-auto text-yellow-400'
                  src='/circle3-yellow.svg'
                  alt=''
                  height={100}
                  width={100}
                />
                <Image
                  className='absolute z-10 -right-7 -bottom-8 w-28 md:w-auto text-blue-500'
                  src='/dots3-blue.svg'
                  alt=''
                  height={100}
                  width={100}
                />
                <Image
                  src='/pool.webp'
                  alt=''
                  className='rounded-lg'
                  height={400}
                  width={400}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}

      <PricingModule linkVisibility={false} />

      {/* Regular Cleaning Features */}
      <RegularCleaningFeatureCards badgeTitle='Regular Cleaning' />

      {/* Algae Treatment Section */}
      <AlgaeFeatureCards />

      {/* CTA Card */}
      <ServiceCTACard />

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
};

export default Page;
