"use client";
import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Marquee from "react-fast-marquee";

export function TestimonialsMarqueeGrid() {
  return (
    <div className="relative mx-auto h-full w-full max-w-7xl overflow-hidden px-4 md:px-8">
      <div className="pb-20">
        <h1 className="pt-4 text-lg font-bold text-blue-900 dark:text-white md:text-4xl">
          Trusted by Pool Owners, Loved for Our Care
        </h1>
        <p className="mt-4 text-base text-neutral-600 dark:text-neutral-200">
          See why homeowners and businesses in Florence, AZ, rely on Krystal Clean Pool Service for pristine pools and exceptional customer care.
        </p>
      </div>

      <div className="relative">
        <div className="bg-charcoal h-full w-full overflow-hidden">
          <TestimonialsGrid />
        </div>
      </div>

      <div className="from-charcoal absolute inset-x-0 bottom-0 h-40 w-full bg-gradient-to-t to-transparent"></div>
    </div>
  );
}

export const TestimonialsGrid = () => {
  const first = testimonials.slice(0, 6);
  const second = testimonials.slice(6, 12);

  return (
    <div className="relative [mask-image:linear-gradient(to_right,transparent_0%,white_10%,white_90%,transparent_100%)]">
      <Marquee direction="right" pauseOnHover speed={50}>
        {first.map((testimonial, index) => (
          <Card key={`testimonial-${testimonial.src}-${index}`}>
            <Quote>{testimonial.quote}</Quote>
            <div className="mt-8 flex items-center gap-2">
              <Image
                src={testimonial.src}
                alt="Manu Arora"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <QuoteDescription className="text-neutral-600 dark:text-neutral-300">
                  {testimonial.name}
                </QuoteDescription>
                <QuoteDescription className="text-neutral-400">
                  {testimonial.designation}
                </QuoteDescription>
              </div>
            </div>
          </Card>
        ))}
      </Marquee>
      <Marquee className="mt-10" direction="right" pauseOnHover speed={70}>
        {second.map((testimonial, index) => (
          <Card key={`testimonial-${testimonial.src}-${index}`}>
            <Quote>{testimonial.quote}</Quote>
            <div className="mt-8 flex items-center gap-2">
              <Image
                src={testimonial.src}
                alt="Manu Arora"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <QuoteDescription className="text-neutral-300">
                  {testimonial.name}
                </QuoteDescription>
                <QuoteDescription className="text-neutral-400">
                  {testimonial.designation}
                </QuoteDescription>
              </div>
            </div>
          </Card>
        ))}
      </Marquee>
    </div>
  );
};
export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "group mx-4 h-full min-h-[230px] max-w-md rounded-xl bg-white p-4 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] dark:bg-neutral-900 md:max-w-lg md:p-8",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3
      className={cn(
        "py-2 text-sm font-semibold text-black dark:text-white md:text-base",
        className,
      )}
    >
      {children}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn(
        "max-w-sm text-xs font-normal text-neutral-600 dark:text-neutral-400 md:text-sm",
        className,
      )}
    >
      {children}
    </p>
  );
};

interface Testimonial {
  src: string;
  quote: string;
  name: string;
  designation?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Lionel",
    quote:
      "John Padworski Senior, the Technician,did a terrific job maintaining my pool and spa. He went above and Beyond and repaired a leaky pump instead of calling in a repair team.",
    src: "https://i.pravatar.cc/150?img=68",
    designation: "Florence, AZ",
  },
  {
    name: "Catherine",
    quote:
      "John helped me clean up my above ground hot tub and it looked great after. He was helpful and informative. I recommend his services for great work!",
    src: "https://i.pravatar.cc/150?img=2",
    designation: "San Tan Valley, AZ",
  },
  {
    name: "Leslie",
    quote:
      "John is reliable, knowledgeable and always prompt and a pleasure to work with. He keeps our pool crystal clear!",
    src: "https://i.pravatar.cc/150?img=45",
    designation: "Coolidge, AZ",
  },
  {
    name: "Jennifer",
    quote:
      "I am beyond impressed with Krystal Clean Pool Service and would 100% recommend this company to any and everyone. ",
    src: "https://i.pravatar.cc/150?img=46",
    designation: "Florence, AZ",
  },
  {
    name: "Aiden",
    quote:
      "Great work and customer service. First company I have had that shows up and keeps track of maintenance and cleanings in their website. Way more services for less money than most companies in my area. Overall great company.",
    src: "https://i.pravatar.cc/150?img=5",
    designation: "San Tan Valley, AZ",
  },
  {
    name: "Elizabeth",
    quote:
      "This company is great. They're reliable, affordable, and know their business. I use them and they give me my time back in my day.",
    src: "https://i.pravatar.cc/150?img=38",
    designation: "San Tan Valley, AZ",
  },
  {
    name: "Jennifer",
    quote:
      "John checks for everything and leaves your pool looking amazing, because of this company it's one less thing I have to worry about and know that my pool is being well take care of.",
    src: "https://i.pravatar.cc/150?img=47",
    designation: "Florence, AZ",
  },
  {
    name: "Kayla",
    quote:
      "John has been very helpful upfront and goes outta his way to communicate with us!",
    src: "https://i.pravatar.cc/150?img=8",
    designation: "Coolidge, AZ",
  },
  {
    name: "Thomas Anderson",
    quote:
      "Thanks to Krystal Clean, my family can enjoy a spotless pool year-round. Their reliability and professionalism are unmatched.",
    src: "https://i.pravatar.cc/150?img=9",
    designation: "Queen Creek, AZ",
  },
  {
    name: "Jessica Brown",
    quote:
      "I couldn't be happier with their service! They handle everything so efficiently, giving us more time to enjoy our pool.",
    src: "https://i.pravatar.cc/150?img=10",
    designation: "San Tan Valley, AZ",
  },
  {
    name: "Mark Wilson",
    quote:
      "Krystal Clean's expertise makes all the difference. Our pool is always sparkling clean and perfectly balanced.",
    src: "https://i.pravatar.cc/150?img=11",
    designation: "Queen Creek, AZ",
  },
  {
    name: "Hannah Davis",
    quote:
      "Their team is always on time, professional, and leaves our pool in perfect condition after every visit.",
    src: "https://i.pravatar.cc/150?img=12",
    designation: "San Tan Valley, AZ",
  },
  {
    name: "Daniel Evans",
    quote:
      "I've never worked with a pool service this thorough and efficient. Krystal Clean Pool Service is simply the best.",
    src: "https://i.pravatar.cc/150?img=13",
    designation: "Queen Creek, AZ",
  },
  {
    name: "Sophia Harris",
    quote:
      "Krystal Clean Pool Service takes all the hassle out of pool care. I can't recommend them enough!",
    src: "https://i.pravatar.cc/150?img=14",
    designation: "San Tan Valley, AZ",
  },
];

