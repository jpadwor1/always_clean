import { getUserSubscriptionPlan } from '@/lib/stripe';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import ServiceHistory from '@/components/ServiceHistory';
import { db } from '@/db';
import { User } from '@prisma/client';

interface PageProps {
  params: {
    serviceId: string;
    customerId: string;
  };
}
const Page = async ({ params }: PageProps) => {
  const { serviceId } = params;
  const subscriptionPlan = await getUserSubscriptionPlan();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;

  const dbUser = await db.customer.findFirst({
    where: {
      id: userId,
    },
  });
  const serviceEvent = await db.serviceEvent.findFirst({
    where: {
      id: serviceId,
    },
    include: {
      files: true,
      serviceChemicals: {
        include: {
          chemical: true,
        },
      },
    },
  });

  if (!serviceEvent) {
    return <div>Service event not found</div>;
  }

  const technician: User = await db.customer.findFirst({
    where: {
      id: serviceEvent.technicianId,
    },
  });

  const transformedServiceEvent = {
    ...serviceEvent,
    tasksPerformed: serviceEvent.tasksPerformed || '',
    role: dbUser?.role,
    technicianId: technician.id,
    technicianName: technician.name,
    technicianPhotoUrl: technician.photoURL,
  };
  return <ServiceHistory serviceEvent={transformedServiceEvent} />;
};

export default Page;
