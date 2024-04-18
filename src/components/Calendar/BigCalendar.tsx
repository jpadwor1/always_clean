'use client';
import { trpc } from '@/app/_trpc/client';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Customer as customer, Role } from '@prisma/client';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import React, { useState } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { AlertTriangle, CheckIcon, Info, MapPin, User, X } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { toast } from '../ui/use-toast';

dayjs.extend(timezone);

interface CalendarProps {
  props?: any;
}

interface Event {
  extendedProps: {
    location: string;
    email: string | null;
    phone: string | null;
    customerId: string | null;
    description?: string | null;
    customerName?: string | null;
  };
  editable: boolean | string;
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean | string;
  id: string;
}

declare global {
  interface Window {
    initGooglePlaces: (form: any) => void;
  }
}

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  customerType: customer;
  nextServiceDate: string;
  lastServiceDate: string;
  role: Role;
  isProfileComplete: boolean;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  stripeCurrentPeriodEnd: string | null;
};

type SlotInfo = {
  start: Date;
  end: Date;
  slots: Array<Date>;
  action: 'select' | 'click' | 'doubleClick';
  resourceId?: number | string; // only if the calendar is resource view
  bounds?: {
    // For "select" action
    x: number;
    y: number;
    top: number;
    right: number;
    left: number;
    bottom: number;
  };
  box?: {
    // For "click" or "doubleClick" actions
    clientX: number;
    clientY: number;
    x: number;
    y: number;
  };
};
const FormSchema = z.object({
  title: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  address: z.string(),
  allDay: z.boolean().default(false).optional(),
  description: z.string().optional(),
  customer: z.string().optional(),
});

const MyCalendar = ({ props }: CalendarProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [customerAttending, setCustomerAttending] = useState<Customer>();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [currentEventDetails, setCurrentEventDetails] = useState<Event | null>(
    null
  );
  const [idToDelete, setIdToDelete] = useState<string>('');
  const [newEvent, setNewEvent] = useState<Event>({
    extendedProps: {
      location: '',
      email: '',
      phone: '',
      customerId: '',
      description: '',
      customerName: '',
    },
    editable: true,
    title: '',
    start: '',
    end: '',
    allDay: false,
    id: '0',
  });
  const djLocalizer = dayjsLocalizer(dayjs);
  const { data: customers, isLoading, error } = trpc.getCustomers.useQuery();
  const createEvent = trpc.getAddCalendarEvent.useMutation();
  const { data: calendarEvents } = trpc.getCalendarEvents.useQuery();
  const deleteEvent = trpc.getDeleteCalendarEvent.useMutation();
  const { views } = React.useMemo(
    () => ({
      defaultDate: new Date(2024, 2, 1),
      max: dayjs().endOf('day').subtract(1, 'hours').toDate(),
      views: {
        month: true,
        week: true,
        day: true,
      },
    }),
    []
  );
  React.useEffect(() => {
    if (customers) {
      const formattedCustomerEvents = customers.map((customer: Customer) => ({
        title: customer.name,
        start: new Date(customer.nextServiceDate),
        editable: true,
        end:
          customer.nextServiceDate.toString().length > 0
            ? new Date(customer.nextServiceDate)
            : '',
        allDay: false,
        id: customer.id,
        extendedProps: {
          location: customer.address,
          email: customer.email,
          phone: customer.phone,
          customerId: customer.id,
          description: 'Regularly Scheduled Cleaning',
          customerName: customer.name,
        },
      }));
      setAllEvents((prevEvents) => {
        const newEvents = formattedCustomerEvents.filter(
          (fe: Event) => !prevEvents.some((pe) => pe.id === fe.id)
        );
        return [...prevEvents, ...newEvents];
      });
    }
  }, [customers]);

  React.useEffect(() => {
    if (calendarEvents) {
      const formattedCalendarEvents = calendarEvents.map(
        (event: {
          title: string;
          start: Date | string;
          end: Date | string;
          allDay: boolean | string;
          id: string;
          location: string;
          email: string;
          phone: string;
          customerId: string;
          description: string;
          customerName: string;
        }) => ({
          title: event.title,
          start: new Date(event.start),
          end:
            event.end.toString().length > 0
              ? new Date(event.end)
              : new Date(event.start),
          allDay: event.allDay,
          id: event.id,
          editable: true,
          extendedProps: {
            location: event.location,
            email: event.email,
            phone: event.phone,
            customerId: event.customerId,
            description: event.description,
            customerName: event.customerName,
          },
        })
      );
      setAllEvents((prevEvents) => [...prevEvents, ...formattedCalendarEvents]);
    }
  }, [calendarEvents]);

  function handleDateClick(slotInfo: SlotInfo) {
    setNewEvent({
      ...newEvent,
      start: slotInfo.start,
      end: slotInfo.end,
      id: new Date().getTime().toString(),
    });
    setShowModal(true);
  }

  function handleDelete() {
    if (currentEventDetails) {
      deleteEvent.mutate(
        { id: currentEventDetails.id },
        {
          onSuccess: () => {
            setShowDeleteModal(false);
            setShowEventDetailsModal(false);
            setIdToDelete('');
            setAllEvents((prevEvents) =>
              prevEvents.filter((event) => event.id !== currentEventDetails.id)
            );
            toast({
              title: 'Event Deleted!',
              description: 'Check the calendar for updated event details.',
            });
          },
          onError: (error) => {
            toast({
              title: 'Oops, something went wrong!',
              description: error.message,
            });
            setIdToDelete('');

            setShowDeleteModal(false);
            setShowEventDetailsModal(false);
          },
        }
      );
    }
  }

  function handleCloseModal() {
    setShowModal(false);
    setNewEvent({
      extendedProps: {
        location: '',
        email: '',
        phone: '',
        customerId: '',
        description: '',
      },
      editable: true,
      title: '',
      start: '',
      end: '',
      allDay: false,
      id: '0',
    });
    setShowDeleteModal(false);
    setIdToDelete('');
    form.clearErrors();
    form.reset();
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsPageLoading(true);
    const eventCustomer = customers?.find(
      (customer: Customer) => customer.id === data.customer
    );
    const updatedEvent = {
      title: data.title,
      startTime: data.startTime,
      endTime: data.endTime,
      allDay: (data.allDay as boolean) || false,
      extendedProps: {
        description: data.description,
        location: data.address,
        email: eventCustomer?.email || '',
        phone: eventCustomer?.phone || '',
        customerId: data.customer || '',
        customerName: eventCustomer?.name || '',
      },
      editable: '',
      start: data.startTime,
      end: data.endTime,
      id: '',
    };

    setAllEvents([...allEvents, updatedEvent]);

    createEvent.mutate(
      {
        title: data.title,
        start: data.startTime,
        end: data.endTime,
        allDay: data.allDay as boolean,
        extendedProps: {
          description: data.description,
          location: data.address,
          email: eventCustomer?.email,
          phone: eventCustomer?.phone,
          customerId: data.customer,
          customerName: eventCustomer?.name || '',
        },
        editable: '',
        id: '',
      },
      {
        onSuccess: () => {
          setIsPageLoading(false);
          setShowModal(false);
          toast({
            title: 'Event Created!',
            description: 'Check the calendar for new event details.',
          });
        },
        onError: (error) => {
          setIsPageLoading(false);
          toast({
            title: 'OOps, something went wrong!',
            description: error.message,
          });
        },
      }
    );
  }

  const showEventDetails = (data: Event) => {
    const eventCustomer = customers?.find(
      (customer: Customer) => customer.id === data.extendedProps.customerId
    );
    const eventDetails: Event = {
      extendedProps: {
        location: data.extendedProps.location,
        customerId: data.extendedProps.customerId,
        email: data.extendedProps.email,
        phone: data.extendedProps.phone,
        description: data.extendedProps.description,
        customerName: data.extendedProps.customerName,
      },
      title: data.title,
      start: data.start ?? new Date(),
      end: data.end ?? new Date(),
      allDay: data.allDay,
      id: data.id,
      editable: data.editable,
    };

    setShowEventDetailsModal(true);

    setCurrentEventDetails(eventDetails);
  };

  const handleCustomerChange = (customerId: string) => {
    if (customerId) {
      const customer = customers?.find(
        (customer: Customer) => customer.id === customerId
      );
      if (customer) {
        setCustomerAttending(customer);
        form.setValue('address', customer.address);
        form.setValue('customer', customer.id);
      }
    }
  };
  
  return (
    <div className='bg-white rounded-lg w-full sm:p-2 sm:h-[calc(100vh-20rem)] h-[calc(100vh-10rem)]'>
      <Calendar
        events={allEvents}
        localizer={djLocalizer}
        showMultiDayTimes
        style={{ height: '100%', width: '100%' }}
        views={views}
        onSelectEvent={(event) => showEventDetails(event)}
        onSelectSlot={(slotInfo) => handleDateClick(slotInfo)}
        selectable
      />

      <Dialog
        open={showEventDetailsModal}
        onOpenChange={setShowEventDetailsModal}
      >
        <DialogContent className=''>
          <div className='flex flex-col items-start'>
            <div className='flex flex-row items-center justify-between w-full'>
              <h1 className='text-2xl text-gray-900 font-medium'>
                {currentEventDetails?.title}
              </h1>
              <X
                onClick={() => setShowEventDetailsModal(!showEventDetails)}
                className='h-5 w-5 text-gray-700 self-start'
              />
            </div>
            <div className='flex flex-row mb-1'>
              {currentEventDetails?.start && (
                <h3 className='text-gray-700 text-sm font-medium tracking-wider'>
                  {new Date(currentEventDetails?.start).toLocaleDateString(
                    'en-US',
                    {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: true,
                      timeZone: 'America/Los_Angeles',
                    }
                  )}{' '}
                  -{' '}
                  {new Date(currentEventDetails?.end).toLocaleTimeString(
                    'en-US',
                    { hour: 'numeric', minute: 'numeric', hour12: true }
                  )}
                </h3>
              )}
            </div>

            <Separator className='mb-4' />

            <div className='flex flex-row space-x-2 items-center justify-center mb-3'>
              <div className='flex items-center justify-center bg-blue-200 rounded-full px-2 py-2'>
                <User className='h-5 w-5 text-blue-500' aria-hidden='true' />
              </div>

              <div className='flex flex-col items-start justify-start'>
                <p className='text-sm text-gray-700 font-medium'>
                  {currentEventDetails?.extendedProps.customerName}
                </p>
                <p className='text-xs text-gray-700 font-medium'>
                  {currentEventDetails?.extendedProps.phone}
                </p>
              </div>
            </div>

            <div className='flex flex-row space-x-2 items-center justify-center mb-3'>
              <Link
                href={`https://www.google.com/maps/place/${currentEventDetails?.extendedProps.location}`}
                target='_blank'
              >
                <div className='flex flex-row space-x-2 items-center justify-center'>
                  <div className='flex items-center justify-center bg-green-200 rounded-full px-2 py-2'>
                    <MapPin className='h-5 w-5 text-green-500' />
                  </div>
                  <h1 className='text-sm text-gray-700 font-medium tracking-wider'>
                    {currentEventDetails?.extendedProps.location}
                  </h1>
                </div>
              </Link>
            </div>

            <div className='flex flex-row space-x-2 items-center justify-center'>
              <div className='flex items-center justify-center bg-gray-200 rounded-full px-2 py-2'>
                <Info className='h-5 w-5 text-gray-500' />
              </div>
              <h3 className='text-sm text-gray-700 font-medium tracking-wider'>
                {currentEventDetails?.extendedProps.description}
              </h3>
            </div>
          </div>
          <DialogFooter className='flex flex-row justify-end'>
            <Button
              variant='destructive'
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className='max-w-xs'>
          <DialogHeader>
            <div className='flex flex-col items-center'>
              <div
                className='mx-auto flex h-12 w-12 flex-shrink-0 items-center 
                      justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10'
              >
                <AlertTriangle
                  className='h-6 w-6 text-red-600'
                  aria-hidden='true'
                />
              </div>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  Are you sure you want to delete this event?
                </p>
              </div>
              <div className='flex flex-row gap-4 mt-6'>
                <Button variant='destructive' onClick={handleDelete}>
                  Delete
                </Button>
                <Button variant='ghost' onClick={handleCloseModal}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader className='flex flex-col items-start'>
            <CheckIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
            <DialogTitle className='text-2xl text-gray-900'>
              Add Event
            </DialogTitle>
            <h2 className='text-gray-700 text-medium tracing-wide '>
              Complete all the fields to create a calendar event.
            </h2>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full space-y-6'
            >
              <div className='flex flex-col mb-8 rounded-md w-full text-center'>
                <div className='px-4 mt-6 mb-2'>
                  <FormField
                    control={form.control}
                    name='title'
                    defaultValue=''
                    render={({ field }) => (
                      <FormItem className='flex flex-col justify-start items-start w-full mt-0'>
                        <FormLabel className='min-w-fit mr-2 mt-2'>
                          Event Title
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder='Give the event a title.'
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='px-4 mt-6 mb-2'>
                  <FormField
                    control={form.control}
                    name='customer'
                    defaultValue=''
                    render={({ field }) => (
                      <FormItem className='flex flex-col justify-start items-start w-full mt-0'>
                        <FormLabel className='min-w-fit mr-2 mt-2'>
                          Customers
                        </FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={(e) => {
                              handleCustomerChange(e);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder='Select a verified email to display' />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {customers?.map((customer: Customer) => {
                                return (
                                  <SelectItem
                                    key={customer.id}
                                    value={customer.id}
                                  >
                                    {customer.name}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription>
                          If this event is tied to a customer, select them here.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='px-4 mt-6 mb-2'>
                  <FormField
                    control={form.control}
                    name='address'
                    defaultValue={
                      customerAttending ? customerAttending.address : ''
                    }
                    render={({ field }) => (
                      <FormItem className='flex flex-col justify-start items-start w-full mt-0'>
                        <FormLabel className='min-w-fit mr-2 mt-2'>
                          Event Location
                        </FormLabel>
                        <div className='flex flex-col justify-center items-center w-full'>
                          <FormControl>
                            <Input
                              id='address'
                              name='address'
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              placeholder='12348 Express Way'
                              value={
                                customerAttending
                                  ? customerAttending.address
                                  : field.value
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <div className='mx-2 my-4 flex flex-col w-full'>
                  <div
                    className={cn(
                      !newEvent.allDay
                        ? 'flex flex-row justify-between w-full gap-5'
                        : 'w-1/2'
                    )}
                  >
                    <FormField
                      control={form.control}
                      name='startTime'
                      defaultValue=''
                      render={({ field }) => (
                        <FormItem className='flex flex-col justify-start items-start w-full mt-0'>
                          <FormLabel className='min-w-fit mr-2 mt-2'>
                            Start Time
                          </FormLabel>
                          <FormControl>
                            <Input
                              name='startTime'
                              type='datetime-local'
                              onChange={field.onChange}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {!newEvent.allDay ? (
                      <FormField
                        control={form.control}
                        name='endTime'
                        defaultValue=''
                        render={({ field }) => (
                          <FormItem className='flex flex-col justify-start items-start w-full mt-0'>
                            <FormLabel className='min-w-fit mr-2 mt-2'>
                              End Time
                            </FormLabel>
                            <FormControl>
                              <Input
                                name='startTime'
                                type='datetime-local'
                                onChange={field.onChange}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : null}
                  </div>
                </div>

                <div className='mb-4 mt-1'>
                  <FormField
                    control={form.control}
                    name='allDay'
                    defaultValue={false}
                    render={({ field }) => (
                      <FormItem className='flex flex-row justify-start items-start w-full ml-5'>
                        <FormLabel className='min-w-fit mr-2 mt-2'>
                          Is this an all day event?
                        </FormLabel>
                        <FormControl>
                          <Checkbox
                            className='ml-2'
                            name='allDay'
                            onCheckedChange={(checked) => {
                              setNewEvent({
                                ...newEvent,
                                allDay: checked,
                              });
                              field.onChange;
                            }}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className='mt-2 flex items-center mx-2'>
                  <FormField
                    control={form.control}
                    name='description'
                    defaultValue=''
                    render={({ field }) => (
                      <FormItem className='flex flex-col justify-start items-start w-full mt-6'>
                        <FormLabel className='min-w-fit mr-2 mt-2'>
                          Event Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder='Add Description'
                            className='mt-2'
                            name='description'
                            value={field.value}
                            onChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                  <Button disabled={!form.formState.isValid}>Create</Button>
                  <Button
                    type='button'
                    className='bg-red-500/70 hover:bg-red-500'
                    onClick={handleCloseModal}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyCalendar;
