'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronsUpDown } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

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
        'flex flex-wrap space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1',
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
      <Sheet>
        <SheetTrigger asChild>
          <Button className='sm:hidden' variant='ghost'>Service History</Button>
        </SheetTrigger>
        <SheetContent className=' flex flex-col items-center'>
          <SheetHeader>
            <SheetTitle>Service Dates</SheetTitle>
            <SheetDescription className='overflow-y-scroll'></SheetDescription>
          </SheetHeader>
          <div className='flex flex-col items-center h-full w-full overflow-y-scroll'>
            {serviceHistoryData.map((service) => (
              <SheetClose asChild key={service.id}>
                <Link
                  key={service.id}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'text-sm cursor-pointer my-1'
                  )}
                  href={`/dashboard/customer/${service.customerId}/service-history/${service.id}`}
                >
                  {format(service.dateCompleted, 'MMMM d, yyyy')}
                </Link>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
      <Collapsible className=''>
        <CollapsibleTrigger
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'hover:bg-primary hover:text-white hidden md:flex'
          )}
        >
          Service History
          <ChevronsUpDown className='ml-5 h-4 w-4' />
          <span className='sr-only'>Toggle</span>
        </CollapsibleTrigger>
        <CollapsibleContent className='z-40'>
          <ScrollArea type='auto' className='p-2 max-h-fit md:h-60'>
            {serviceHistoryData.map((service) => (
              <React.Fragment key={service.id}>
                <Link
                  key={service.id}
                  className={cn(
                    buttonVariants({ variant: 'outline' }),
                    'text-sm cursor-pointer'
                  )}
                  href={`/dashboard/customer/${service.customerId}/service-history/${service.id}`}
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
