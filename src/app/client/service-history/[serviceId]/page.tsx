import { getUserSubscriptionPlan } from '@/lib/stripe';
import BillingForm from '@/components/BillingForm';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import ServiceHistory from '@/components/ServiceHistory';

const Page = async () => {
  const subscriptionPlan = await getUserSubscriptionPlan();
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;

  return <ServiceHistory />;
};

export default Page;
