import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './sidebarNav';
import { db } from '@/db';
import { ServiceEvent } from '@prisma/client';

export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
};


interface SettingsLayoutProps {
  children: React.ReactNode;
  params: {
    customerId: string;
  };
}

export default async function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const { customerId } = params;

  const customerServiceEvents = await db.serviceEvent.findMany({
    orderBy: {
      dateCompleted: 'asc',
    },
    where: {
      customerId: customerId,
    },
    include: {
      files: true,
    },
  });

  const formattedServiceEvents = customerServiceEvents.map(
    (event: ServiceEvent) => ({
      ...event,
      dateCompleted: new Date(event.dateCompleted),
      chemicalsUsed: [], // Convert to Date object if necessary
    })
  );

  const sidebarNavItems = [
    {
      title: 'Account',
      href: `/dashboard/customer/${customerId}`,
    },
    {
      title: 'Preferences',
      href: `/dashboard/customer/${customerId}/preferences`,
    },
    {
      title: 'Billing',
      href: `/dashboard/customer/${customerId}/billing`,
    },
    {
      title: 'Service Form',
      href: `/dashboard/customer/${customerId}/service-history-form`,
    },
  ];
  return (
    <>
      <div className='space-y-6 md:p-10 p-4 pb-16 block '>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>
            Customer Account Settings
          </h2>
          <p className='text-muted-foreground'>
            Manage your customer account settings and manage billing.
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='md:-mx-4 lg:w-1/5'>
            <SidebarNav
              serviceHistoryData={formattedServiceEvents}
              items={sidebarNavItems}
            />
          </aside>
          <div className='flex-1 lg:max-w-3xl'>{children}</div>
        </div>
      </div>
    </>
  );
}
