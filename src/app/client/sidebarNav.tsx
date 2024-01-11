'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronsUpDown } from 'lucide-react';
import { format } from 'date-fns';

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
  serviceHistoryData: {
    id: string;
    dateCompleted: Date;
    customerId: string | null;
    notes: string | null;
    chemicalsUsed: string[] | null;
    name: string;
    files:
      | {
          id: string;
          name: string;
          uploadStatus: string;
          url: string;
          key: string;
          createdAt: Date;
          serviceEventId: string | null;
        }[]
      | [];
    tasksPerformed: string | null;
  }[];
}

type Service = {
  date: string;
  notes: string;
  chemicalsUsed: string[];
  photos: string[];
  servicesCompleted: string[];
};

export function SidebarNav({
  className,
  items,
  serviceHistoryData,
  ...props
}: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        'flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            pathname === item.href
              ? 'bg-primary text-white hover:bg-primary hover:text-white'
              : 'hover:bg-transparent hover:underline',
            'justify-start'
          )}
        >
          {item.title}
        </Link>
      ))}

      <Collapsible className='p-4'>
        <CollapsibleTrigger
          disabled={serviceHistoryData.length === 0}
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'hover:bg-primary hover:text-white'
          )}
        >
          Service History
          <ChevronsUpDown className='ml-5 h-4 w-4' />
          <span className='sr-only'>Toggle</span>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <ScrollArea className='p-4  max-h-fit md:h-60'>
            {serviceHistoryData.map((service) => (
              <React.Fragment key={service.id}>
                <Link
                  key={service.id}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'text-sm cursor-pointer'
                  )}
                  href={`/client/service-history/${service.id}`}
                >
                  {format(service.dateCompleted, 'MMMM d, yyyy')}
                </Link>
                <Separator className='my-2' />
              </React.Fragment>
            ))}
          </ScrollArea>
        </CollapsibleContent>
      </Collapsible>
    </nav>
  );
}
