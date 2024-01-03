import React from 'react';
import { db } from '@/db';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { CustomerType, cn } from '@/lib/utils';
import { trpc } from '@/app/_trpc/client';
import ServiceForm from './ServiceForm';

interface PageProps {
  params: {
    customerId: string;
  };
}

type FormFields =
  | 'fullName'
  | 'email'
  | 'phoneNumber'
  | 'address'
  | 'service'
  | undefined;

const FormSchema = z.object({
  fullName: z.string({
    required_error: 'Please enter your full name.',
  }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  phoneNumber: z.string({
    required_error: 'Please enter your phone number.',
  }),
  address: z.string().min(1, 'Please enter your address.'),
  service: z.string().min(1, 'Please select a service.'),
});

const Page = async ({ params }: PageProps) => {
  const { customerId } = params;
  const dbCustomer = await db.customer.findFirst({
    where: {
      id: customerId,
    },
  });

 

  return (
    <div className='space-y-6 bg-white shadow-md p-6 rounded-md'>
      <div>
        <h3 className='text-lg font-medium'>Customer Service Center</h3>
        <p className='text-sm text-muted-foreground'>
          Create service events for {dbCustomer?.name}.
        </p>
      </div>
      <Separator />
      <ServiceForm customerId={dbCustomer?.id} />
    </div>
  );
};

export default Page;
