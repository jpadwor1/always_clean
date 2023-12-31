'use client';

import React from 'react';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import Stepper from '@/components/Stepper';
import StepperForm from '@/components/Stepper';

const Page = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [step, setStep] = React.useState(0);
  const availableTimes = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];
  const components: { title: string; href: string; description: string }[] = [
    {
      title: 'Regular Pool Cleaning',
      href: '/services/regular-cleaning',
      description:
        'Routine cleaning services including skimming, vacuuming, and brushing to keep your pool pristine.',
    },
    {
      title: 'Chemical Balancing',
      href: '/services/chemical-balancing',
      description:
        'Expert testing and adjustment of pool water chemicals to ensure a safe and balanced swimming environment.',
    },
    {
      title: 'Algae Treatment',
      href: '/services/algae-treatment',
      description:
        'Effective solutions for algae removal and prevention, keeping your pool clean and clear.',
    },
    {
      title: 'Tile and Deck Cleaning',
      href: '/services/tile-deck-cleaning',
      description:
        'Specialized cleaning for pool tiles and decks to remove dirt, grime, and mildew, ensuring a spotless pool area.',
    },
    {
      title: 'Pool Opening & Closing',
      href: '/services/opening-closing',
      description:
        'Seasonal services to prepare your pool for the summer and winterize it for the off-season.',
    },
  ];
  return (
    <MaxWidthWrapper className='mt-10'>
      <div className='flex flex-col justify-between items-start mb-5 bg-white shadow-md rounded-md'>
        <div className='flex flex-col px-4 py-4'>
          <h1 className='text-3xl font-bold'>Booking</h1>
          <p className='mt-4 text-md text-slate-500 '>
            {' '}
            Check our availability and schedule your service
          </p>
        </div>
        <Separator className='my-4 mx-2 w-[95%]' />
        <StepperForm />
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
