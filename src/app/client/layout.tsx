import { Metadata } from 'next';

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './sidebarNav';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '@/db';
import { ServiceEvent } from '@prisma/client';
export const metadata: Metadata = {
  title: 'Forms',
  description: 'Advanced form example using react-hook-form and Zod.',
};



const sidebarNavItems = [
  {
    title: 'Account',
    href: '/client',
  },
  {
    title: 'Notifications',
    href: '/client/notifications',
  },
  {
    title: 'Billing',
    href: '/client/billing',
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}


export default async function SettingsLayout({ children }: SettingsLayoutProps) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const dbUser = await db.customer.findFirst({
    where: {
      id: user?.id,
    },
  });
  const customerServiceEvents = await db.serviceEvent.findMany({
    orderBy: {
      dateCompleted: 'asc',
    },
    where: {
      customerId: user?.id,
    },
    include: {
      files: true,
    },
  });
  
  const formattedServiceEvents = customerServiceEvents.map((event: ServiceEvent) => ({
    ...event,
    dateCompleted: new Date(event.dateCompleted),
    chemicalsUsed: [],
  }));

  return (
    <>
     
      <div className='space-y-6 p-10 pb-16 block '>
        <div className='space-y-0.5'>
          <h2 className='text-2xl font-bold tracking-tight'>Settings</h2>
          <p className='text-muted-foreground'>
            Manage your account settings and view service history.
          </p>
        </div>
        <Separator className='my-6' />
        <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <aside className='-mx-4 lg:w-1/5'>
            <SidebarNav serviceHistoryData={formattedServiceEvents} items={sidebarNavItems} />
          </aside>
          <div className='flex-1 lg:max-w-3xl'>{children}</div>
        </div>
      </div>
    </>
  );
}
