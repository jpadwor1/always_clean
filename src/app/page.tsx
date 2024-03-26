import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import PricingModule from '@/components/Home/PricingModule';
import Link from 'next/link';
import FeaturedPosts from '@/components/Blog/FeaturedPosts';
import ServiceCTACard from '@/components/Services/ServiceCTACard';
import CommunityCTA from '@/components/Services/CommunityCTA';
import ContactInfo from '@/components/ContactInfo';
import TestimonialSection from '@/components/Home/TestimonialSection';

export default function Home() {
  return (
    <MaxWidthWrapper>
      {/* hero section */}
      <div className='py-20 md:py-28'>
        <div className='container px-4 mx-auto'>
          <div className='flex flex-wrap xl:items-center -mx-4'>
            <div className='w-full md:w-1/2 px-4 mb-16 md:mb-0'>
              <h1 className='mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight'>
                Pristine Pools, Exceptional Service{' '}
              </h1>
              <p className='mb-8 text-lg md:text-xl text-slate-600'>
                Expert Pool Cleaning for a Sparkling, Hassle-Free Summer. We
                offer a wide range of pool cleaning services that will suit your
                needs and budget. Contact us today to learn more about our
                services. Or book directly below.
              </p>
              <div className='flex flex-wrap'>
                <div className='w-full md:w-auto py-1 md:py-0 md:mr-4'>
                  <Link href='/booking'>
                    <Button
                      variant={'secondary'}
                      className='shadow-lg hover:shadow-xl'
                    >
                      Book Here
                    </Button>
                  </Link>

                  <Link
                    className='md:hidden inline-flex'
                    href='tel:760-912-7396'
                  >
                    <Button className='shadow-lg hover:shadow-xl ml-2'>
                      Call Now
                    </Button>
                  </Link>
                  <Link
                    className='md:inline-flex hidden'
                    href='tel:760-912-7396'
                  >
                    <Button className='shadow-lg hover:shadow-xl ml-2'>
                      760-912-7396
                    </Button>
                  </Link>
                </div>
                <div className='w-full md:w-auto py-1 md:py-0' />
              </div>
            </div>
            <div className='w-full md:w-1/2 px-4'>
              <div className='relative mx-auto md:mr-0 max-w-max'>
                <Image
                  width={500}
                  height={500}
                  className='absolute z-10 -left-14 -top-12 w-28 md:w-auto'
                  src='/circle3-yellow.svg'
                  priority={true}
                  alt=''
                />
                <Image
                  width={500}
                  height={500}
                  className='absolute z-10 -right-7 -bottom-8 w-28 md:w-auto'
                  src='/dots3-blue.svg'
                  priority={true}
                  alt=''
                />
                <Image
                  width={500}
                  height={500}
                  className='relative rounded-7xl'
                  src='/pool.webp'
                  alt=''
                  priority={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Big Testimonial */}
      <TestimonialSection />

      {/* Pricing Section */}
      <PricingModule linkVisibility={true} />

      {/* Featured Posts */}
      <FeaturedPosts />

      {/* CTASection */}
      <CommunityCTA buttonType='call' />

      {/* Contact Section */}
      <ContactInfo />

      {/* CTA Section */}
      <ServiceCTACard />
    </MaxWidthWrapper>
  );
}
