'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/components/ui/use-toast';
import { Customer } from '@prisma/client';
import { format } from 'date-fns';
import { Textarea } from '@/components/ui/textarea';
import { trpc } from '@/app/_trpc/client';

const notificationsFormSchema = z.object({
  serviceDay: z.enum(['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'], {
    required_error: 'You need to select a preferred service day.',
  }),
  special_instructions: z
    .string()
    .max(300, 'The max amount of characters is 300.')
    .optional(),
  communication_emails: z.boolean().default(false).optional(),
  communication_texts: z.boolean().default(false).optional(),
});

type NotificationsFormValues = z.infer<typeof notificationsFormSchema>;

const serviceDays = [
  { label: 'Thursday', value: 'THURSDAY' },
  { label: 'Friday', value: 'FRIDAY' },
  { label: 'Saturday', value: 'SATURDAY' },
];

interface NotificationsFormProps {
  customer: Customer;
}
export function NotificationsForm({ customer }: NotificationsFormProps) {
  const defaultValues: Partial<NotificationsFormValues> = {
    communication_emails: customer.communicationEmails,
    communication_texts: customer.communicationTexts,
    serviceDay: customer.preferredServiceDay,
    special_instructions: customer.specialInstructions,
  };
  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues,
  });
  const updatePreferences = trpc.updateCustomerPreferences.useMutation();

  function onSubmit(data: NotificationsFormValues) {
    updatePreferences.mutate(data, {
      onSuccess: () => {
        toast({
          title: 'Preferences updated successfully',
          description: 'Your preferences have been updated.',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'An error occurred',
          description: error.message,
        });
      },
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div>
          <h3 className='text-xl font-medium mb-3'>
            Service Preferences & Customizations
          </h3>
          <h2 className='text-base mb-3'>
            Your next scheduled service is on{' '}
            <span className='font-medium'>
              {format(customer.nextServiceDate, 'MMM do, yyyy.')}
            </span>
          </h2>
          <FormField
            control={form.control}
            name='serviceDay'
            render={({ field }) => (
              <FormItem className='space-y-3 border p-4 rounded-md'>
                <FormLabel className='text-base'>
                  I would like cleaning performed on...
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className='flex sm:flex-row flex-col sm:space-x-3'
                  >
                    {serviceDays.map((day) => (
                      <FormItem
                        key={day.label}
                        className='flex items-center space-x-1 space-y-0'
                      >
                        <FormControl>
                          <RadioGroupItem value={day.value} />
                        </FormControl>
                        <FormLabel className='font-normal'>
                          {day.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='special_instructions'
            render={({ field }) => (
              <FormItem className='space-y-3 border p-4 rounded-md my-4'>
                <FormLabel className='text-base'>
                  Special Instructions for technicians
                </FormLabel>
                <FormControl>
                  <FormItem className='flex items-center space-x-1 space-y-0'>
                    <Textarea
                      {...field}
                      placeholder='e.g., focus on the spa, check the filter, gate code is 1234'
                    />
                  </FormItem>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <h3 className='mb-4 text-lg font-medium'>Email Notifications</h3>
          <div className='space-y-4'>
            <FormField
              control={form.control}
              name='communication_emails'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      Communication emails
                    </FormLabel>
                    <FormDescription>
                      Receive emails about your account activity.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='communication_texts'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel className='text-base'>
                      Service notifications
                    </FormLabel>
                    <FormDescription>
                      Receive text messages about your account activity.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type='submit'>Update preferences</Button>
      </form>
    </Form>
  );
}
