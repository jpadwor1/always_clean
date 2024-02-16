import React from 'react';
import { db } from '@/db';
import { Separator } from '@/components/ui/separator';
import ServiceForm from './ServiceForm';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

interface PageProps {
  params: {
    customerId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { customerId } = params;
  const dbCustomer = await db.customer.findFirst({
    where: {
      id: customerId,
    },
  });

  return (
    <div className='space-y-6 bg-white shadow-md p-6 rounded-md'>
      <div>
        <h3 className='text-lg font-medium'>Customer Service Center</h3>
        <p className='text-sm text-muted-foreground'>
          Create service event for {dbCustomer?.name}.
        </p>
      </div>
      <Separator />
      <ServiceForm customerId={dbCustomer?.id} userId={user?.id} />
    </div>
  );
};

export default Page;
