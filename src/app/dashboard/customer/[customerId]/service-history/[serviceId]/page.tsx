import { getUserSubscriptionPlan } from '@/lib/stripe';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import ServiceHistory from '@/components/ServiceHistory';
import { db } from '@/db';

interface PageProps {
  params: {
    serviceId: string;
    customerId: string;
  };
}
const Page = async ({ params }: PageProps) => {
  const { customerId, serviceId } = params;
  const subscriptionPlan = await getUserSubscriptionPlan();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;

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
      }
  });

  if (!serviceEvent) {
    return <div>Service event not found</div>;
  }

  const transformedServiceEvent = {
    ...serviceEvent,
    tasksPerformed: serviceEvent.tasksPerformed || '',
  };

  console.log(transformedServiceEvent.serviceChemicals)
  return <ServiceHistory serviceEvent={transformedServiceEvent} />;
};

export default Page;
