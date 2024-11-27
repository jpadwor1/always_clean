import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import PricingModule from '@/components/Home/PricingModule';
import Link from 'next/link';
import FeaturedPosts from '@/components/Blog/FeaturedPosts';
import ServiceCTACard from '@/components/Services/ServiceCTACard';
import CommunityCTA from '@/components/Services/CommunityCTA';
import ContactInfo from '@/components/ContactInfo';
import ServiceShowcase from '@/components/Home/service-showcase';
import { TestimonialsMarqueeGrid } from '@/components/Home/testimonial-section';
import { CTAWithDashedGridLines } from '@/components/Home/cta-with-gridlines';
import { FeaturesGrid } from '@/components/Home/feature-grid';
import { LogosWithBlurFlip } from '@/components/Home/logo-blur';
import { PricingGrid } from '@/components/Home/all-pricing-grid';
import BlogPostList from '@/components/Home/blog-post-list';

export default function Home() {
  return (
    <main className='bg-white overflow-x-hidden'>
      {/* hero section */}
      <section className="relative flex h-screen items-center justify-center">
        <div className="absolute inset-0 z-0">
          <video
            className="h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/videos/hero.mp4"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
        <div className="relative z-10 text-center text-white mx-20">
          <h1 className="mb-4 text-4xl font-bold md:text-6xl">
            Pristine Pools, Exceptional Service
          </h1>
          <p className="mb-8 text-xl md:text-2xl">
            Expert Pool Cleaning for a Sparkling, Hassle-Free Summer. We
            offer a wide range of pool cleaning services that will suit your
            needs and budget. Contact us today to learn more about our
            services. Or book directly below.
          </p>
          <Link href="/booking">
            <button className="px-8 py-2 rounded-full relative bg-slate-700 text-white text-sm hover:shadow-2xl hover:shadow-white/[0.1] transition duration-200 border border-slate-600">
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-blue-600 to-transparent" />
              <span className="relative z-20">
                Book Today
              </span>
              <div className="absolute inset-x-0 h-px w-1/2 mx-auto -bottom-px shadow-2xl  bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

            </button>
          </Link>
        </div>
      </section>

      {/* Service Section */}
      <section className="mt-16">
        <ServiceShowcase />
      </section>

      {/* Testimonial Section */}
      <section className="bg-background mt-20">
        <TestimonialsMarqueeGrid />
      </section>

      {/* CTA Section */}
      <section className="mb-0 pb-0 px-16">
        <CTAWithDashedGridLines />
      </section>


      {/* Features Section */}
      <section className="mt-24 bg-background px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <h1 className="mb-4 text-4xl font-bold text-primary md:text-6xl">
            Crystal Clear Pools, <br />Expert Care
          </h1>
          <p className="mb-8 text-xl text-neutral-600">
            Experience the professional pool cleaning and maintenance services that set Krystal Clean Pool Service apart. From small pools to commercial properties, we&apos;re dedicated to keeping your pool pristine, safe, and ready to enjoy year-round.
          </p>
        </div>

        <FeaturesGrid />
      </section>

      {/*Credentials Section */}
      <section className="mt-16">
        <LogosWithBlurFlip />
      </section>



      {/* Featured Posts */}
      <PricingGrid />

      {/* Featured Posts */}
      <BlogPostList />

      {/* CTASection */}
      <ServiceCTACard />

      {/* Contact Section */}
      <section className="px-6">
        <ContactInfo />
      </section>

    </main>
  );
}
