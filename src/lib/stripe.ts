import { PLANS } from '@/config/stripe';
import { db } from '@/db';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Customer } from '@prisma/client';
import { redirect } from 'next/navigation';
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? '', {
  apiVersion: '2023-10-16',
  typescript: true,
});

export async function getUserSubscriptionPlan() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user?.id) {
    return {
      ...PLANS[0],
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    };
  }

  const dbUser = await db.user.findFirst({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    return {
      ...PLANS[0],
      isSubscribed: false,
      isCanceled: false,
      stripeCurrentPeriodEnd: null,
    };
  }

  const isSubscribed = Boolean(
    dbUser.stripePriceId &&
      dbUser.stripeCurrentPeriodEnd && // 86400000 = 1 day
      dbUser.stripeCurrentPeriodEnd.getTime() + 86_400_000 > Date.now()
  );

  const plan = isSubscribed
    ? PLANS.find((plan) => plan.price.priceIds.test === dbUser.stripePriceId)
    : null;

  let isCanceled = false;
  if (isSubscribed && dbUser.stripeSubscriptionId) {
    const stripePlan = await stripe.subscriptions.retrieve(
      dbUser.stripeSubscriptionId
    );
    isCanceled = stripePlan.cancel_at_period_end;
  }

  return {
    ...plan,
    stripe_subscription_id: dbUser.stripeSubscriptionId,
    stripe_current_period_end: dbUser.stripeCurrentPeriodEnd,
    stripe_customer_id: dbUser.stripeCustomerId,
    isSubscribed,
    isCanceled,
  };
}

export async function getClientInvoices(customer: Customer) {

  try {
    if (!customer) {
      console.error('Customer not found');
      return [];
    }

    if (!customer.stripe_customer_id) {
      console.error('Customer does not have a stripe customer id');
      return [];
    }
    const invoices = await stripe.invoices.list({
      customer: customer.stripe_customer_id,
    });

    if (!invoices.data || invoices.data.length === 0) {
      return [];
    }
    return invoices.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getCustomerInvoices(customerId?: string | null) {
  try {
    if (!customerId) {  
        return [];
    }

    const dbCustomer = await db.customer.findUnique({
      where: {
        id: customerId,
      },
    });

    if (!dbCustomer) {
      console.error('Customer not found');
      return [];
    }
    if(dbCustomer.stripe_customer_id !== null ){
    const invoices = await stripe.invoices.list({
      customer: dbCustomer.stripe_customer_id,
    });

    if (!invoices.data || invoices.data.length === 0) {
      return [];
    }
    const customer_invoices = invoices.data.filter((invoice) => invoice.status === 'paid' || invoice.status === 'open')
    return customer_invoices;
  }
  return [];
  } catch (error) {
    console.error(error);
    return [];
  }
}
