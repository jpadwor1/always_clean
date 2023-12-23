'use client';
import React from 'react';
import { useState, useEffect, Fragment } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
  Draggable,
  DropArg,
} from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventSourceInput } from '@fullcalendar/core/index.js';
import { CheckIcon, AlertTriangle } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';

import { trpc } from '@/app/_trpc/client';
import { CustomerType } from '@/lib/utils';

interface Event {
  extendedProps: {
    location: string;
    email: string;
    phone: string;
    customerType: CustomerType;
  };
  description?: string;
  editable: boolean | string;
  title: string;
  start: Date | string;
  end: Date | string;
  allDay: boolean | string;
  id: string;
}

const Calendar = () => {
  const { data: customers, isLoading, error } = trpc.getCustomers.useQuery();
  const [events, setEvents] = useState([
    { title: 'event 1', id: '1' },
    { title: 'event 2', id: '2' },
    { title: 'event 3', id: '3' },
    { title: 'event 4', id: '4' },
    { title: 'event 5', id: '5' },
    { title: 'test', id: '6', end: new Date(), allDay: false },
  ]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Event>({
    extendedProps: {
      location: '',
      email: '',
      phone: '',
      customerType: CustomerType.Lead,
    },
    description: '',
    editable: true,
    title: '',
    start: '',
    end: '',
    allDay: false,
    id: '0',
  });

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
          customerType: customer.customerType as CustomerType,
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

  function addEvent(data: DropArg) {
    const event = {
      ...newEvent,
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      end: data.date.toISOString(),
      id: new Date().getTime(),
    };
    setAllEvents([...allEvents, event]);
  }

  function handleDeleteModal(data: { event: { id: string } }) {
    setShowDeleteModal(true);
    setIdToDelete(Number(data.event.id));
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
      },
      description: '',
      editable: true,
      title: '',
      start: '',
      end: '',
      allDay: false,
      id: 0,
    });
    setShowDeleteModal(false);
    setIdToDelete(null);
  }

  const handleTitleChange = (
    title: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewEvent({
      ...newEvent,
      title: title.target.value,
    });
  };

  const handleStartTimeChange = (
    time: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const startDate = new Date(time.target.value);

    setNewEvent({
      ...newEvent,
      start: startDate,
    });
  };

  const handleEndTimeChange = (
    time: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const endDate = new Date(time.target.value);

    setNewEvent({
      ...newEvent,
      end: endDate,
    });
  };

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAllEvents([...allEvents, newEvent]);
    setShowModal(false);
    setNewEvent({
      extendedProps: {
        location: '',
      },
      description: '',
      editable: true,
      title: '',
      start: '',
      end: '',
      allDay: false,
      id: 0,
    });
  }

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
        drop={(data) => addEvent(data)}
        eventClick={(data) => handleDeleteModal(data)}
      />

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
          <form
            className='flex flex-col items-center'
            action='submit'
            onSubmit={handleSubmit}
          >
            <div className='mx-2 my-4 flex flex-col w-full'>
              <div className='mt-2'>
                <Label htmlFor='title'>Event Title</Label>
                <Input
                  type='text'
                  name='title'
                  value={newEvent.title}
                  onChange={(e) => handleTitleChange(e)}
                  placeholder='Title'
                />
              </div>
              <div className='flex flex-row justify-between w-full'>
                <div className='mt-2'>
                  <Label htmlFor='start'>Start Time</Label>
                  <Input
                    name='start'
                    type='datetime-local'
                    onChange={handleStartTimeChange}
                  />
                </div>
                {!newEvent.allDay ? (
                  <div className='mt-2'>
                    <Label htmlFor='end'>End Time</Label>
                    <Input
                      type='datetime-local'
                      name='end'
                      onChange={(e) => handleEndTimeChange(e)}
                      placeholder='End Time'
                    />
                  </div>
                ) : null}
              </div>
            </div>

            <div className='mt-2 flex items-center'>
              <Label htmlFor='allDay'>Is this an all day event?</Label>
              <Checkbox
                className='ml-2'
                name='allDay'
                onCheckedChange={(checked) =>
                  setNewEvent({
                    ...newEvent,
                    allDay: checked,
                  })
                }
              />
            </div>

            <div className='mt-2 flex items-center'>
              <Label htmlFor='allDay'>Is this an all day event?</Label>
              <Input
                type='address'
                name='location'
                onChange={(e) => handleEndTimeChange(e)}
                placeholder='End Time'
              />
            </div>
            <Textarea
              placeholder='Add Description'
              className='mt-2'
              name='description'
              value={newEvent.description}
              onChange={(e) =>
                setNewEvent({ ...newEvent, description: e.target.value })
              }
            />
            <div className='mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
              <Button disabled={newEvent.title === ''}>Create</Button>
              <Button onClick={handleCloseModal}>Cancel</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default Calendar;
