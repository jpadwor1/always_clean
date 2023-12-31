import { Metadata } from 'next';
import Image from 'next/image';

import { Separator } from '@/components/ui/separator';
import { SidebarNav } from './sidebarNav';

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

export default function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const { customerId } = params;
  const sidebarNavItems = [
    {
      title: 'Account',
      href: `/dashboard/customer/${customerId}`,
    },
    {
      title: 'Billing',
      href: `/dashboard/customer/${customerId}/billing`,
    },
    {
      title: 'Service History',
      href: `/dashboard/customer/${customerId}/service-history`,
    },
  ];
  return (
    <>
      <div className='space-y-6 p-10 pb-16 block '>
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
          <aside className='-mx-4 lg:w-1/5'>
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className='flex-1 lg:max-w-3xl'>{children}</div>
        </div>
      </div>
    </>
  );
}
