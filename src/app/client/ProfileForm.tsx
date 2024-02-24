'use client';

import { useEffect, useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import SignatureCanvas from 'react-signature-canvas';
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
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { trpc } from '../_trpc/client';
import Link from 'next/link';
import { Avatar } from '@radix-ui/react-avatar';
import AvatarUploadDropzone from '@/components/Profile/AvatarUploadDropzone';
import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';

const profileFormSchema = z.object({
  fullName: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 40 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  phone: z.string().min(10).max(15),
  address: z.string().max(160).min(4),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  user: User;
}

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

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const defaultValues: Partial<ProfileFormValues> = {
    fullName: user.name,
    email: user.email,
    phone: user.phone,
    address: user.address,
  };
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  });
  const [openModel, setOpenModal] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const mutation = trpc.updateUserProfileSettings.useMutation();
  const updateServiceAgreement =
    trpc.updateCustomerServiceAgreement.useMutation();
  const updateProfilePicture = trpc.updateCustomerAvatar.useMutation();
  let sigPad: SignatureCanvas | null = null;
  function onSubmit(data: ProfileFormValues) {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: 'Updated Successfully',
          description: <p>Your profile settings have been updated</p>,
        });
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Oops, something went wrong!',
          description: (
            <p>
              <span className='font-medium'>{error.message}</span>
            </p>
          ),
        });
      },
    });
  }

  const addressInputRef = useRef<HTMLInputElement>(null);
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);
  const onAddressInputMount = mergeRefs(
    addressInputRef,
    form.register('address').ref
  );

  useEffect(() => {
    loadGooglePlacesScript(() => initGooglePlaces(form));
  }, [form]);

  const submitSignature = () => {
    const serviceAgreementURL = sigPad?.toDataURL('image/png');
    const data = {
      serviceAgreementURL: serviceAgreementURL as string,
      customerId: user.id as string,
    };
    updateServiceAgreement.mutate(data, {
      onSuccess: () => {
        toast({
          title: 'Updated Successfully',
          description: <p>Your service agreement has been signed</p>,
        });
        setOpenModal(false);
      },
      onError: (error) => {
        toast({
          variant: 'destructive',
          title: 'Oops, something went wrong!',
          description: (
            <p>
              <span className='font-medium'>{error.message}</span>
            </p>
          ),
        });
        setOpenModal(false);
      },
    });
  };

  const onFileUpload = (downloadURL: string, fileName: string) => {
    const data = {
      photoURL: downloadURL,
      customerId: user.id as string,
    };
    updateProfilePicture.mutate(data, {
      onSuccess: () => {
        toast({
          title: 'Updated Successfully',
          description: <p>Your profile picture has been updated</p>,
        });
        router.refresh();
      },
      onError: (error: any) => {
        toast({
          variant: 'destructive',
          title: 'Oops, something went wrong!',
          description: (
            <p>
              <span className='font-medium'>{error.message}</span>
            </p>
          ),
        });
      },
    });
  };
  return (
    <>
      <AvatarUploadDropzone user={user} onFileUpload={onFileUpload} />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <FormField
            control={form.control}
            name='fullName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder={user.name} {...field} />
                </FormControl>
                <FormDescription>
                  This should be your full name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder={user.phone} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder={user.email} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='address'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input
                    ref={onAddressInputMount}
                    id='address'
                    defaultValue={field.value}
                    onChange={field.onChange} // Bind the onChange event
                    onBlur={field.onBlur} // Bind the onBlur event
                    placeholder={user.address}
                  />
                </FormControl>
                <FormDescription>
                  You should only enter the service address.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {user.serviceAgreementURL === null ? (
            <div className='flex flex-col space-y-3 text-left'>
              <FormItem className='flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4'>
                <FormControl>
                  <Button
                    className='block bg-green-600 self-center hover:bg-green-300'
                    type='button'
                    onClick={() => setOpenModal(true)}
                    disabled={!downloaded}
                  >
                    Sign
                  </Button>
                </FormControl>
                <div className='space-y-1 leading-none'>
                  <FormLabel>
                    Please download the service agreement and read through the
                    document.
                  </FormLabel>
                  <FormDescription>
                    <Link
                      onClick={() => setDownloaded(true)}
                      className='text-blue-600'
                      href='/files/ServiceAgreement.pdf'
                      target='_blank'
                    >
                      Download Service Agreement
                    </Link>{' '}
                    or view online at{' '}
                    <Link
                      onClick={() => setDownloaded(true)}
                      href='/service-agreement'
                      target='_blank'
                      className='text-blue-600'
                    >
                      Service Agreement Page
                    </Link>
                  </FormDescription>
                  <FormDescription>
                    By signing, you acknowledge that you have read, understood,
                    and agreed to the terms and conditions outlined in the
                    Service Agreement.
                  </FormDescription>
                </div>
              </FormItem>
              {openModel && (
                <div className='md:h-full h-[150px] flex justify-center items-center bg-blue-gray-100'>
                  <div className='w-[90%] h-full border padding-2 bg-white flex flex-col'>
                    <SignatureCanvas
                      penColor='black'
                      canvasProps={{ className: 'w-full h-full' }}
                      ref={(ref) => {
                        sigPad = ref;
                      }}
                    />
                    <div className='flex flex-row items-center justify-between'>
                      <div className='text-left'>
                        <button
                          type='button'
                          className='px-2 rounded-md py-1 border-2 m-2'
                          onClick={() => sigPad?.clear()}
                        >
                          Clear
                        </button>
                        <button
                          className='px-2 rounded-md py-1 border-2 m-2'
                          onClick={() => setOpenModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                      <div className='text-right'>
                        <button
                          className='px-2 py-1 rounded-md m-2 bg-green-600 text-white hover:bg-green-300'
                          type='button'
                          onClick={() => submitSignature()}
                        >
                          Submit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <Button className='' type='submit'>
            Update profile
          </Button>
        </form>
      </Form>
    </>
  );
}
