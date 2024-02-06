'use client';
import { trpc } from '@/app/_trpc/client';
import { Draggable } from '@fullcalendar/interaction';
import { CustomerType, Role } from '@prisma/client';
import format from 'date-fns/format';
import getDay from 'date-fns/getDay';
import enUS from 'date-fns/locale/en-US';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';

const locales = {
  'en-US': enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

interface CalendarProps {
  props: any;
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
  customerType: CustomerType;
  nextServiceDate: string;
  lastServiceDate: string;
  role: Role;
  isProfileComplete: boolean;
  stripeCustomerId: string | null;
  stripeSubscriptionId: string | null;
  stripePriceId: string | null;
  stripeCurrentPeriodEnd: string | null;
};

const MyCalendar = ({ props }: CalendarProps) => {
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

  const { data: customers, isLoading, error } = trpc.getCustomers.useQuery();
  const createEvent = trpc.getAddCalendarEvent.useMutation();
  const { data: calendarEvents } = trpc.getCalendarEvents.useQuery();
  const deleteEvent = trpc.getDeleteCalendarEvent.useMutation();

  React.useEffect(() => {
    if (customers) {
      const formattedCustomerEvents = customers.map((customer: Customer) => ({
        title: customer.name,
        start: customer.nextServiceDate,
        editable: true,
        end: '', // Assuming end date is not available, you might want to adjust this
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
          start: event.start,
          end: event.end,
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

  React.useEffect(() => {
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
  return (
    <div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor='start'
        endAccessor='end'
        style={{ height: 500 }}
      />
    </div>
  );
};
