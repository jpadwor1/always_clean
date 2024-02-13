import { getCustomerInvoices, getUserSubscriptionPlan } from '@/lib/stripe';
import BillingForm from '@/components/BillingForm';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

interface PageProps {
  params: {
    customerId: string;
  };
};

  const Page = async ({ params }: PageProps) => {
    const {customerId} = params
    const subscriptionPlan = await getUserSubscriptionPlan();
    const invoices = await getCustomerInvoices(customerId)
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const userId = user?.id;
  
  
   
    return <BillingForm invoices={invoices} subscriptionPlan={subscriptionPlan} userId={!!userId}/> 
  };

export default Page;
