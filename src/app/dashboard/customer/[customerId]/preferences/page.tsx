import { Separator } from '@/components/ui/separator';
import { NotificationsForm } from './notificationsForm';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '@/db';

interface PageProps {
  params: {
    customerId: string;
  };
}

export default async function SettingsNotificationsPage({ params }: PageProps) {
  const { customerId } = params;
  const customer = await db.customer.findFirst({
    where: {
      id: customerId,
    },
  });

  return (
    <div className='space-y-6 bg-white shadow-md p-6 rounded-md'>
      <div>
        <h3 className='text-lg font-medium'>Preferences</h3>
        <p className='text-sm text-muted-foreground'>
          Configure how we communicate.
        </p>
      </div>
      <Separator />
      <NotificationsForm customer={customer} />
    </div>
  );
}
