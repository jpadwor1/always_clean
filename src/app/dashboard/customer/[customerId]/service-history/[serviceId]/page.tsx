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
  const { getUser } = getKindeServerSession();
  const user = await getUser();
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

  const technician: User = await db.customer.findFirst({
    where: {
      id: serviceEvent.technicianId,
    },
  });

  const userRole = await db.customer.findFirst({
    where: {
      id: user?.id,
    },
    select: {
      role: true,
    },
  });

  if (!serviceEvent) {
    return <div>Service event not found</div>;
  }

  const transformedServiceEvent = {
    ...serviceEvent,
    tasksPerformed: serviceEvent.tasksPerformed || '',
    role: userRole?.role || 'USER',
    technicianId: technician.id,
    technicianName: technician.name,
    technicianPhotoUrl: technician.photoURL,
  };
  return <ServiceHistory serviceEvent={transformedServiceEvent} />;
};

export default Page;
