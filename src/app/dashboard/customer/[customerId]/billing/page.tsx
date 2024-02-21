import { getCustomerInvoices, getUserSubscriptionPlan } from '@/lib/stripe';
import BillingForm from '@/components/DashBoard/BillingForm';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { db } from '@/db';

interface PageProps {
  params: {
    customerId: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { customerId } = params;
  const subscriptionPlan = await getUserSubscriptionPlan();
  const invoices = await getCustomerInvoices(customerId);
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const userId = user?.id;

  const customer = await db.customer.findUnique({
    where: {
      id: customerId,
    },
  });

  return (
    <BillingForm
    role="ADMIN"
      customer={customer}
      invoices={invoices}
      subscriptionPlan={subscriptionPlan}
      userId={!!userId}
    />
  );
};

export default Page;
