import { getClientInvoices, getUserSubscriptionPlan } from '@/lib/stripe';
import BillingForm from '@/components/DashBoard/BillingForm';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '@/db';

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;
  const subscriptionPlan = await getUserSubscriptionPlan();

  const customer = await db.customer.findFirst({
    where: {
      id: userId,
    },
  });
  const invoices = await getClientInvoices(customer);


  return (
    <BillingForm
      role={'CUSTOMER'}
      customer={customer}
      invoices={invoices}
      subscriptionPlan={subscriptionPlan}
      userId={!!userId}
    />
  );
};

export default Page;
