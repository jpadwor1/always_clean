import { getCustomerInvoices, getUserSubscriptionPlan } from '@/lib/stripe';
import BillingForm from '@/components/BillingForm';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '@/db';

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;
  const subscriptionPlan = await getUserSubscriptionPlan();
  const invoices = await getCustomerInvoices(userId)
  


 
  return <BillingForm invoices={invoices} subscriptionPlan={subscriptionPlan} userId={!!userId}/> 
};

export default Page;
