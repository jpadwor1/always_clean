'use client';
import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { EventClickArg } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import {
  CheckIcon,
  AlertTriangle,
  MapPinned,
  User,
  Mail,
  Info,
  Phone,
  CalendarIcon,
} from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { trpc } from '@/app/_trpc/client';
import { cn } from '@/lib/utils';

interface Event {
  extendedProps: {
    location: string;
    email: string;
    phone: string;
    customerId: string;
    description?: string;
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

const initGooglePlaces = (addressInput: HTMLInputElement | null, form: any) => {
  // Ensure that the Google Maps API script has loaded
  if (!window.google || !window.google.maps || !window.google.maps.places) {
    console.error('Google Maps API script not loaded');
    return;
  }

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
  title: z.string({
    required_error: 'Please enter a title for the event.',
  }),
  startTime: z.string({
    required_error: 'Please select the event start time.',
  }),
  endTime: z.string({
    required_error: 'Please select the event end time.',
  }),
  address: z.string({
    required_error: 'Please enter your address.',
  }),
  allDay: z.boolean().default(false).optional(),
  description: z.string().optional(),
});

const Calendar = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
  });
  const { data: customers, isLoading, error } = trpc.getCustomers.useQuery();
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEventDetailsModal, setShowEventDetailsModal] = useState(false);
  const [currentEventDetails, setCurrentEventDetails] = useState<Event | null>(
    null
  );
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
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
  const addressInputRef = React.useRef<HTMLInputElement>(null);
  const onAddressInputMount = mergeRefs(
    addressInputRef,
    form.register('address').ref
  );

  useEffect(() => {
    if (showModal) {
      loadGooglePlacesScript(() =>
        initGooglePlaces(addressInputRef.current, form)
      );
    }
  }, [showModal, form]);

  useEffect(() => {
    if (customers) {
      const formattedEvents = customers.map((customer) => ({
        title: customer.name,
        start: customer.nextServiceDate,
        editable: true,
        end: '',
        allDay: false,
        id: customer.id,
        extendedProps: {
          location: customer.address,
          email: customer.email,
          phone: customer.phone,
          customerId: customer.id,
          description: 'Regularly Scheduled Cleaning',
        },
      }));
      setAllEvents(formattedEvents);
    }
  }, [customers]);

  useEffect(() => {
    let draggableEl = document.getElementById('draggable-el');
    if (draggableEl) {
      new Draggable(draggableEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
          let title = eventEl.getAttribute('title');
          let id = eventEl.getAttribute('data');
          let start = eventEl.getAttribute('start');
          return { title, id, start };
        },
      });
    }
  }, []);

  function handleDateClick(arg: { date: Date; allDay: boolean }) {
    setNewEvent({
      ...newEvent,
      start: arg.date,
      id: new Date().getTime().toString(),
    });
    setShowModal(true);
  }

  function handleDelete() {
    setAllEvents(
      allEvents.filter((event) => Number(event.id) !== Number(idToDelete))
    );
    setShowDeleteModal(false);
    setIdToDelete(null);
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
    setIdToDelete(null);
  }

  function handleSubmit(data: z.infer<typeof FormSchema>) {
    setAllEvents([...allEvents, newEvent]);
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
  }

  const showEventDetails = (data: EventClickArg) => {
    const event = data.event._def;
    const eventDetails: Event = {
      extendedProps: {
        location: event.extendedProps.location,
        customerId: '',
        email: event.extendedProps.email,
        phone: event.extendedProps.phone,
        description: event.extendedProps.description,
      },
      title: event.title,
      start: data.event._instance?.range.start ?? new Date(),
      end: data.event._instance?.range.end ?? new Date(),
      allDay: data.event.allDay,
      id: data.event.id,
      editable: event.ui.startEditable ?? true,
    };

    setShowEventDetailsModal(true);

    setCurrentEventDetails(eventDetails);
  };

  const formatDateForDisplay = (date: string | Date | undefined) => {
    if (!date) return '';

    return format(new Date(date), "MMM. do, yyyy 'at' h:mm aa");
  };

  return (
    <main className='flex min-h-screen flex-col p-12'>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek',
        }}
        events={allEvents as EventSourceInput}
        nowIndicator={true}
        editable={true}
        droppable={true}
        selectable={true}
        selectMirror={true}
        dateClick={handleDateClick}
        eventClick={(data) => showEventDetails(data)}
      />

      <Dialog
        open={showEventDetailsModal}
        onOpenChange={setShowEventDetailsModal}
      >
        <DialogContent className='bg-blue-600'>
          <div className='flex flex-col items-start space-y-2'>
            <div className='flex flex-row'>
              {currentEventDetails?.start && (
                <h3 className='text-white text-sm font-medium tracking-wider'>
                  {format(
                    new Date(currentEventDetails?.start),
                    'EEEE, MMM dd @ HH:mm a'
                  )}
                </h3>
              )}
            </div>

            <div className=''>
              <h1 className='text-xl text-white font-medium'>
                {currentEventDetails?.title}
              </h1>
            </div>

            <div className='flex flex-row space-x-2 items-center justify-center'>
              <Link
                href={`https://www.google.com/maps/place/${currentEventDetails?.extendedProps.location}`}
                target='_blank'
              >
                <div className='flex flex-row space-x-2 items-center justify-center'>
                  <MapPinned className='h-6 w-6 text-white' />
                  <h1 className='text-sm text-white font-medium tracking-wider'>
                    {currentEventDetails?.extendedProps.location}
                  </h1>
                </div>
              </Link>
            </div>

            <div className='flex flex-row space-x-2 items-center justify-center'>
              <Info className='h-6 w-6 text-white' />
              <h3 className='text-sm text-white font-medium tracking-wider'>
                {currentEventDetails?.extendedProps.description}
              </h3>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent>
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
          <DialogHeader className='flex flex-col items-center'>
            <CheckIcon className='h-6 w-6 text-green-600' aria-hidden='true' />
            <DialogTitle>Add Event</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className='w-full space-y-6'
            >
              <div className='flex flex-col -mx-4 mb-8 rounded-md w-full text-center'>
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
                    name='address'
                    defaultValue=''
                    render={({ field }) => (
                      <FormItem className='flex flex-col justify-start items-start w-full mt-0'>
                        <FormLabel className='min-w-fit mr-2 mt-2'>
                          Event Location
                        </FormLabel>
                        <div className='flex flex-col justify-center items-center w-full'>
                          <FormControl>
                            <Input
                              ref={onAddressInputMount}
                              id='address'
                              name='address'
                              onChange={field.onChange}
                              onBlur={field.onBlur}
                              placeholder='12348 Express Way'
                              value={field.value}
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
                              name='start'
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
                                name='end'
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
                            value={newEvent.extendedProps.description}
                            onChange={(e) =>
                              setNewEvent({
                                ...newEvent,
                                extendedProps: {
                                  ...newEvent.extendedProps,
                                  description: e.target.value,
                                },
                              })
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                  <Button disabled={!form.formState.isValid}>Create</Button>
                  <Button onClick={handleCloseModal}>Cancel</Button>
                </div>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Calendar;
