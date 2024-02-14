'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button, buttonVariants } from './ui/button';
import Image from 'next/image';
import { Separator } from './ui/separator';
import {
  Clock,
  MoreVertical,
  Wrench,
  Droplet,
  Brush,
  Filter,
  Leaf,
  TestTube,
  Biohazard,
  Camera,
  Pencil,
  Trash,
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import DualSeparator from './ui/DualSeparator';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { format, utcToZonedTime } from 'date-fns-tz';
import { trpc } from '@/app/_trpc/client';
import { toast } from '@/components/ui/use-toast';
import { useRouter } from 'next/navigation';

interface ServiceHistoryProps {
  serviceEvent: {
    id: string;
    dateCompleted: Date;
    customerId: string | null;
    notes: string | null;
    name: string;
    role: string | undefined;
    technicianId: string | null;
    serviceChemicals: ({
      chemical: {
        id: string;
        name: string;
        price: number;
        units: string;
      };
    } & {
      id: string;
      serviceEventId: string;
      chemicalId: string;
      quantity: number;
    })[];
    files: {
      id: string;
      name: string;
      uploadStatus: string;
      url: string;
      key: string;
      createdAt: Date;
      serviceEventId: string | null;
    }[];
    tasksPerformed: string;
    technicianName: string;
    technicianPhotoURL: string;
  };
}

type PoolTask = {
  label: string;
  icon: string;
  description: string;
};

const poolTasks: PoolTask[] = [
  {
    label: 'Vacuuming the Pool',
    icon: 'vacuum-icon', // Replace with actual icon reference
    description:
      'Thorough vacuuming of the pool floor and walls to remove debris.',
  },
  {
    label: 'Balanced Chemicals',
    icon: 'water-drop-icon', // Replace with actual icon reference
    description:
      'Adjusting and balancing pool chemicals for safe and comfortable swimming.',
  },
  {
    label: 'Cleaned Tile Band',
    icon: 'brush-icon', // Replace with actual icon reference
    description:
      'Scrubbing the tile band around the pool to remove buildup and stains.',
  },
  {
    label: 'Cleaned Filters',
    icon: 'filter-icon', // Replace with actual icon reference
    description:
      'Cleaning and inspecting the filters for optimal water filtration.',
  },
  {
    label: 'Skimmed',
    icon: 'leaf-icon', // Replace with actual icon reference
    description: 'Removing leaves and floating debris from the pool surface.',
  },
  {
    label: 'Performed pH test',
    icon: 'ph-test-icon', // Replace with actual icon reference
    description:
      "Conducting a pH test to ensure the water's acidity/alkalinity levels are balanced.",
  },
];

const ServiceHistory = ({ serviceEvent }: ServiceHistoryProps) => {
  const tasksPerformed = serviceEvent?.tasksPerformed.split(',');
  const technician = {
    name: serviceEvent.technicianName,
    photoURL: serviceEvent.technicianPhotoURL,
  };
  const router = useRouter();
  const createInvoice = trpc.getCreateInvoice.useMutation();
  const handleRefresh = () => {
    router.refresh();
  };
  function mapTasks(
    tasksPerformed: string[],
    poolTasks: PoolTask[]
  ): PoolTask[] {
    return tasksPerformed.map((task) => {
      const foundTask = poolTasks.find((poolTask) =>
        poolTask.label.startsWith(task)
      );

      return (
        foundTask || {
          label: task,
          icon: 'default-icon',
          description: 'No description available.',
        }
      );
    });
  }

  const detailedTasks = mapTasks(tasksPerformed, poolTasks);

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'vacuum-icon':
        return (
          <div className=' bg-gray-100 flex items-center justify-center w-10 h-10 px-2 py-1 rounded-full text-center tracking-wider'>
            <Icon className='text-gray-700 h-5 w-5' icon='mdi:vacuum' />
          </div>
        );
      case 'water-drop-icon':
        return (
          <div className=' bg-blue-100 flex items-center justify-center w-10 h-10 px-2 py-1 rounded-full text-center tracking-wider'>
            <Droplet className='text-blue-600 h-5 w-5' />
          </div>
        );
      case 'brush-icon':
        return (
          <div className=' bg-brown-100 flex items-center justify-center w-10 h-10 px-2 py-1 rounded-full text-center tracking-wider'>
            <Brush className='text-brown-600 h-5 w-5' />
          </div>
        );
      case 'filter-icon':
        return (
          <div className=' bg-orange-100 flex items-center justify-center w-10 h-10 px-2 py-1 rounded-full text-center tracking-wider'>
            <Filter className='text-orange-600 h-5 w-5' />
          </div>
        );
      case 'leaf-icon':
        return (
          <div className=' bg-green-100 flex items-center justify-center w-10 h-10 px-2 py-1 rounded-full text-center tracking-wider'>
            <Leaf className='text-green-600 h-5 w-5' />
          </div>
        );
      case 'ph-test-icon':
        return (
          <div className=' bg-red-100 flex items-center justify-center w-10 h-10 px-2 py-1 rounded-full text-center tracking-wider'>
            <TestTube className='text-red-600 h-5 w-5' />
          </div>
        );
      default:
        return <span>🔍</span>; // Default icon
    }
  };

  const formatInTimeZone = (date: Date, fmt: string, tz: string) =>
    format(utcToZonedTime(date, tz), fmt, { timeZone: tz });

  const formattedTime = formatInTimeZone(
    serviceEvent.dateCompleted,
    'hh:mm a',
    'UTC'
  );

  const deleteServiceEvent = trpc.getDeleteServiceEvent.useMutation();

  const handleDelete = () => {
    deleteServiceEvent.mutate(
      {
        id: serviceEvent.id,
      },
      {
        onSuccess: () => {
          toast({
            title: 'Service Event Deleted',
            description: (
              <>
                <p>Ensure a new Service Form is completed if necessary.</p>
              </>
            ),
          });
          router.push(`/dashboard/customer/${serviceEvent?.customerId}`);
          handleRefresh();
        },
        onError: (error: any) => {
          toast({
            title: 'Oops Something went wrong',
            description: (
              <>
                <p>try again later</p>
                <p>{error.message}</p>
              </>
            ),
          });
          handleRefresh();
        },
      }
    );
  };

  const handleInvoice = () => {
    const invoiceData = {
      customerId: serviceEvent?.customerId as string,
      serviceEventId: serviceEvent?.id,
      dateCompleted: serviceEvent?.dateCompleted.toISOString() as string,
      serviceName: serviceEvent?.name,
      notes: serviceEvent?.notes as string,
      technician: technician.name,
      technicianId: serviceEvent.technicianId,
      tasksPerformed: serviceEvent?.tasksPerformed,
      serviceChemicals: serviceEvent?.serviceChemicals,
    };

    createInvoice.mutate(invoiceData, {
      onSuccess: () => {
        toast({
          title: 'Invoice Sent',
          description: (
            <>
              <p>Invoice Sent</p>
            </>
          ),
        });
        router.push(`/dashboard/customer/${serviceEvent?.customerId}`);
        handleRefresh();
      },
      onError: (error: any) => {
        toast({
          title: 'Oops Something went wrong',
          description: (
            <>
              <p>try again later</p>
              <p>{error.message}</p>
            </>
          ),
        });
        handleRefresh();
      },
    });
  };
  console.log(technician)
  return (
    <div className='flex flex-col bg-white shadow-md p-6 rounded-md min-h-[calc(100vh-30rem)]'>
      <div className='flex flex-col justify-center items-center text-center space-y-4'>
        <div className='flex flex-row justify-between w-full mb-10'>
          <h1 className='mb-2 text-3xl font-medium leading-none text-gray-900'>
            Service Details
          </h1>
          <Popover>
            <PopoverTrigger>
              {' '}
              <MoreVertical />
            </PopoverTrigger>
            <PopoverContent className='w-fit flex flex-col p-0'>
              <Link
                className={buttonVariants({ variant: 'ghost' })}
                href={`/contact`}
              >
                Contact Us
              </Link>
              <Link
                className={buttonVariants({ variant: 'ghost' })}
                href={`/FAQs`}
              >
                FAQs
              </Link>

              {serviceEvent.role === 'ADMIN' && (
                <Button variant='ghost' onClick={handleDelete}>
                  Delete
                  <Trash className='h-5 w-5 ml-2 text-red-600' />
                </Button>
              )}
            </PopoverContent>
          </Popover>
        </div>

        <div className='flex flex-row justify-between items-center w-full'>
          <h4 className='sm:mb-2 sm:text-sm text-md font-medium leading-none text-gray-700'>
            Completed on
          </h4>
          <p className='sm:text-sm text-md text-gray-900 font-medium tracking-wider'>
            {format(new Date(serviceEvent.dateCompleted), 'MMM dd, yyyy')}
          </p>
        </div>

        <div className='flex flex-row justify-between items-center w-full'>
          <h4 className='sm:mb-2 sm:text-sm text-md font-medium leading-none text-gray-700'>
            Technician
          </h4>
          <div className='flex flex-row gap-1 items-center'>
            <Avatar>
              <AvatarImage src={technician.photoURL} />
              <AvatarFallback>
                {/* {technician.name[0] + technician.name.split(' ')[1][0]} */}
              </AvatarFallback>
            </Avatar>
            <p className='sm:text-sm text-md text-gray-900 font-medium tracking-wider ml-2'>
              {technician.name}
            </p>
          </div>
        </div>

        <div className='flex flex-row justify-between items-center w-full'>
          <h4 className='mb-2 sm:text-sm text-md font-medium leading-none text-gray-700'>
            Service completed
          </h4>
          <p className='sm:text-sm text-md text-gray-900 font-medium tracking-wider'>
            {serviceEvent.name}
          </p>
        </div>
      </div>

      <Button className='my-8'>Contact us</Button>
      {serviceEvent.role === 'ADMIN' && (
        <Button onClick={handleInvoice} className='bg-gray-600'>
          Send Invoice
        </Button>
      )}

      <Separator />

      <div className='max-w-[80px] px-2 py-1 rounded-r-xl bg-gray-300 text-center text-gray-700 tracking-wider mt-10'>
        <p className='text-xs font-medium'>
          {format(new Date(serviceEvent.dateCompleted), 'MMM dd')}
        </p>
      </div>

      <div className='flex flex-row items-center justify-start w-full align-middle text-center mt-6'>
        <div className=' bg-indigo-100 flex items-center justify-center w-10 h-10 px-2 py-1 rounded-full text-center text-indigo-400 tracking-wider'>
          <Clock className='h-5 w-5' />
        </div>
        <div className='flex flex-col text-left justify-start ml-5 space-y-1 w-full'>
          <h4 className='text-md font-medium leading-none text-gray-700'>
            Technician Arrived
          </h4>
          <p className='text-sm italic leading-none text-gray-600'>
            {formattedTime}
          </p>
        </div>
      </div>

      <DualSeparator />

      <div className='flex flex-row space-y-2 items-start justify-start w-full align-middle text-center mb-2'>
        <div className=' bg-blue-100 flex items-center justify-center w-10 h-10 px-2 py-1 rounded-full text-center text-blue-300 tracking-wider'>
          <Wrench className='h-5 w-5' />
        </div>
        <div className='flex flex-col text-left justify-start ml-5 mt-3 space-y-1 w-full'>
          <h4 className='text-md font-medium leading-none text-gray-700 mb-3'>
            Tasks Performed
          </h4>
          <Separator className='mb-4' />
          <div className='grid grid-cols-4 gap-2 text-center items-start justify-center mt-4 relative'>
            <Separator
              orientation='vertical'
              className='absolute -left-[2.35rem] mb-1'
            />
            {detailedTasks.map((task) => (
              <div className='col-span-2 mt-4' key={task.label}>
                <div className='flex flex-col space-y-1 items-center'>
                  {getIconComponent(task.icon)}
                  <h3 className='text-gray-900 font-medium text-md '>
                    {task.label}
                  </h3>
                </div>
                <div className='text-gray-700 text-sm '>
                  <p>{task.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center justify-center'>
        <div className='flex flex-row space-y-2 items-start justify-start w-full align-middle text-center relative'>
          <div className=' bg-black  text-yellow-400 flex items-center justify-center w-10 h-10 px-2 py-1 rounded-full text-center'>
            <Biohazard className='h-5 w-5' />
          </div>
          <div className='flex flex-col text-left justify-start ml-5 mt-3 space-y-1 w-full relative'>
            <h4 className='text-md font-medium leading-none text-gray-700 mb-3'>
              Chemicals Used
            </h4>
            <Separator className='mb-4' />
            <Separator
              orientation='vertical'
              className='absolute -left-[2.35rem] top-[2.25rem] mb-1 sm:h-14 h-16'
            />
          </div>
        </div>

        <div className='grid sm:grid-cols-5 grid-cols-2 place-items-center mt-4 relative'>
          {serviceEvent.serviceChemicals.map((chemical) => (
            <div
              className='col-span-1 mt-4 place-items-center text-center'
              key={chemical.chemical.id}
            >
              <div
                key={chemical.chemical.id}
                className='flex items-center justify-center rounded-full px-2 py-1 bg-black max-w-fit'
              >
                <p className='text-yellow-400 font-medium text-xs md:text-md '>
                  {chemical.chemical.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='flex flex-row space-y-2 items-start justify-start w-full align-middle text-center mt-2'>
        <div className=' bg-pink-100 text-pink-300 flex items-center justify-center w-10 h-10 px-2 py-1 rounded-full text-center tracking-wider'>
          <Pencil className='h-5 w-5' />
        </div>
        <div className='flex flex-col text-left justify-start ml-5 mt-3 space-y-1 w-full'>
          <h4 className='text-md font-medium leading-none text-gray-700 mb-3'>
            Technician&apos;s Notes
          </h4>
          <Separator className='mb-4' />
          <div className='grid grid-cols-4 gap-2 text-center items-start justify-center mt-4 relative'>
            <Separator
              orientation='vertical'
              className='absolute -left-[2.35rem] mb-1'
            />
            <div className='col-span-4 mt-4 px-1 py-1 rounded-md '>
              <p className='text-md text-gray-700 font-medium tracking-wide'>
                {serviceEvent.notes}
              </p>
            </div>
          </div>
        </div>
      </div>

      {serviceEvent.files.length > 0 && (
        <div className='flex flex-col items-center justify-center mt-4'>
          <div className='flex flex-row space-y-2 items-start justify-start w-full align-middle text-center '>
            <div className=' bg-green-200  text-green-400 flex items-center justify-center w-10 h-10 px-2 py-1 rounded-full text-center'>
              <Camera className='h-5 w-5' />
            </div>
            <div className='flex flex-col text-left justify-start ml-5 mt-3 space-y-1 w-full'>
              <h4 className='text-md font-medium leading-none text-gray-700 mb-3'>
                Technician&apos;s Photos
              </h4>
              <Separator className='mb-4' />
            </div>
          </div>

          {serviceEvent && (
            <div className='flex flex-col items-center justify-center mt-10'>
              <div>
                <Carousel className='max-w-md'>
                  <CarouselContent>
                    {serviceEvent.files.map((photo) => (
                      <CarouselItem key={photo.id}>
                        <div className='p-1'>
                          <Card>
                            <CardContent className='flex aspect-square items-center justify-center p-6'>
                              <Image
                                height={400}
                                width={400}
                                key={photo.id}
                                src={photo.url}
                                alt='Service Photo'
                                className='rounded-md max-h-[400px]'
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceHistory;
