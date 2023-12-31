'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { format } from 'date-fns';
import { Input } from './ui/input';
import { toast } from '@/components/ui/use-toast';

declare global {
  interface Window {
    initGooglePlaces: (form: any) => void;
  }
}

const initGooglePlaces = (form: any) => {
  // Ensure that the Google Maps API script has loaded
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    console.error('Google Maps API script not loaded');
    return;
  }

  // Select the input element for the address field
  const addressInput = document.getElementById('address') as HTMLInputElement;
  if (!addressInput) {
    console.error('Address input not found');
    return;
  }

  // Create a new instance of the Google Places Autocomplete
  const autocomplete = new google.maps.places.Autocomplete(addressInput, {
    types: ['address'],
  });

  // Add a listener for the 'place_changed' event
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();
    const address = place.formatted_address;
    if (address) {
      form.setValue('address', address, { shouldValidate: true });
    }
  });
};

const loadGooglePlacesScript = (callback: () => void) => {
  if (typeof window !== 'undefined') {
    const isScriptLoaded = document.querySelector(
      "script[src*='maps.googleapis.com/maps/api/js']"
    );
    if (!isScriptLoaded) {
      window.initGooglePlaces = callback;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initGooglePlaces`;
      document.head.appendChild(script);
    } else if (window.google && window.google.maps) {
      callback();
    }
  }
};

const mergeRefs = (...refs: React.Ref<any>[]) => {
  return (element: HTMLInputElement) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref != null) {
        (ref as React.MutableRefObject<HTMLInputElement>).current = element;
      }
    });
  };
};

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
  address: z.string({
    required_error: 'Please enter your address.',
  }),
});

interface BookingFormProps {
  activeStep: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ activeStep }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const addressInputRef = React.useRef<HTMLInputElement>(null);
  const onAddressInputMount = mergeRefs(
    addressInputRef,
    form.register('address').ref
  );
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
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    address: '',
    service: '',
  });

  React.useEffect(() => {
    loadGooglePlacesScript(() => initGooglePlaces(form));
  }, [form]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <>
      <Separator className='my-4 mx-2 ' />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-6'
        >
          {activeStep === 0 ? (
            <div className='flex flex-col -mx-4 mb-8 rounded-md w-full text-center'>
              <h2 className='text-2xl font-bold'>
                Enter Your Contact Information
              </h2>
              <div className='px-4 mt-6 mb-2'>
                <FormField
                  control={form.control}
                  name='fullName'
                  render={({ field }) => (
                    <FormItem className='flex flex-row justify-center items-center w-full mt-0'>
                      <FormLabel className='min-w-fit mr-2 mt-2'>
                        Full Name
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='Full Name' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className='px-4 my-2 flex flex-row items-center text-center align-middle '>
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem className='flex flex-row justify-center items-center w-full mt-0'>
                      <FormLabel className='min-w-fit mr-2 mt-2'>
                        Home Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='Home Address' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='px-4 my-2 flex flex-row items-center text-center align-middle '>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='flex flex-row justify-center items-center w-full mt-0'>
                      <FormLabel className='min-w-fit mr-2 mt-2'>
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='john@alwaysclean.com' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className='px-4 my-2 flex flex-row items-center text-center align-middle '>
                <FormField
                  control={form.control}
                  name='phoneNumber'
                  render={({ field }) => (
                    <FormItem className='flex flex-row justify-center items-center w-full mt-0'>
                      <FormLabel className='min-w-fit mr-2 mt-2'>
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input placeholder='760-912-7396' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ) : null}

          {activeStep === 1 ? (
            <>
              <div className='flex flex-col items-center'>
                <h2 className='text-2xl font-bold'>Select a Service</h2>
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem className='w-1/2 mt-2'>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Select a service' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {components.map((component) => (
                            <SelectItem
                              onChange={() =>
                                setFormData({
                                  ...formData,
                                  service: component.title,
                                })
                              }
                              value={component.title}
                              key={component.title}
                            >
                              {component.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>
          ) : null}

          {activeStep === 2 ? (
            <div className='flex flex-col items-center px-4'>
              <div className='flex flex-col items-center px-4'>
                <h2 className='text-2xl font-bold'>Select a date and time</h2>
              </div>
              <Separator className='my-1 mx-2 w-[50%]' />

              <div className='flex flex-row items-start px-4 py-4 gap-4'>
                <div className='flex flex-col items-center'>
                  <Calendar
                    mode='single'
                    selected={date}
                    onSelect={setDate}
                    className='rounded-md'
                  />
                </div>
                <div className='flex flex-col items-center mt-2'>
                  <h3 className='text-lg font-semibold'>
                    {date ? format(date, 'EEEE, d MMMM') : 'No date selected'}
                  </h3>

                  <div className='grid grid-cols-2 gap-2'>
                    {availableTimes.map((time) => (
                      <Button
                        key={time}
                        className=' hover:text-white text-slate-600 bg-transparent border rounded-md px-4 py-2 my-2'
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </form>
      </Form>
    </>
  );
};

export default BookingForm;
