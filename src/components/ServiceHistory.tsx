'use client';
import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';

const serviceHistoryData = [
  // Each object represents a service date and its details
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  {
    date: 'Thursday, July 1, 2021',
    notes: 'Cleaned pool filters',
    chemicalsUsed: ['Chlorine', 'Algaecide'],
    photos: ['', ''],
    servicesCompleted: [
      'Vacuumed pool',
      'Balanced pH',
      'Added Chlorine Tablets',
      'Cleaned pool filters',
      'Added Algaecide',
    ],
    // ... other details
  },
  // ... other service dates
];

type Service = {
  date: string;
  notes: string;
  chemicalsUsed: string[];
  photos: string[];
  servicesCompleted: string[];
};

const ServiceHistory = () => {
  const [selectedService, setSelectedService] = React.useState<Service | null>(
    null
  );

  const handleDateClick = (serviceData: Service) => {
    setSelectedService(serviceData);
  };
  return (
    <div className='flex flex-col space-x-6 bg-white shadow-md p-6 rounded-md min-h-[calc(100vh-30rem)]'>
      <div className='flex flex-row space-x-6'>
        <ScrollArea className='h-72 w-48 rounded-md border'>
          <div className='p-4'>
            <h4 className='mb-4 text-lg font-medium leading-none'>
              Service History
            </h4>
            {serviceHistoryData.map((service) => (
              <React.Fragment key={service.date}>
                <div
                  key={service.date}
                  className='text-sm cursor-pointer'
                  onClick={() => handleDateClick(service)}
                >
                  {service.date}
                </div>
                <Separator className='my-2' />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
        <div className='flex flex-col'>
          <h4 className='mb-4 text-lg font-medium leading-none'>
            Details for service completed on:{' '}
            {selectedService?.date ? selectedService.date : null}
          </h4>
          <p>Notes: {selectedService?.notes ? selectedService?.notes : null}</p>
          <p>
            Chemicals Used:{' '}
            {selectedService?.chemicalsUsed.join(', ')
              ? selectedService.chemicalsUsed.join(', ')
              : null}
          </p>
        </div>
      </div>

      {/* Conditional rendering of selected service details */}
      {selectedService && (
        <div className='flex flex-col items-center justify-center mt-20'>
          <div>
            <Carousel className='max-w-md'>
              <CarouselContent>
                {selectedService.photos.map((photo) => (
                  <CarouselItem key={photo}>
                    <div className='p-1'>
                      <Card>
                        <CardContent className='flex aspect-square items-center justify-center p-6'>
                          <Image
                            height={427}
                            width={640}
                            key={photo}
                            src='/test.jpg'
                            alt='Service Photo'
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
  );
};

export default ServiceHistory;
