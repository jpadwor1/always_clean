import React from 'react';
import { db } from '@/db';
import { Separator } from '@/components/ui/separator';
import { ProfileForm } from './ProfileForm';

interface PageProps {
  params: {
    customerId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { customerId } = params;
  const dbUser = await db.customer.findFirst({
    where: {
      id: customerId,
    },
  });

  return (
    <div className='space-y-6 bg-white shadow-md p-6 rounded-md'>
      <div>
        <h3 className='text-lg font-medium'>Customer Account Settings</h3>
        <p className='text-sm text-muted-foreground'>
          Update {dbUser?.name}&apos;s account settings.
        </p>
      </div>
      <Separator />
      <ProfileForm user={dbUser} />
    </div>
  );
};

export default Page;
