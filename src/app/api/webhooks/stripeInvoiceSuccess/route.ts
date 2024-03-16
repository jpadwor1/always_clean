import { db } from '@/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import type Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = headers().get('stripe-signature') ?? '';

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.UPDATE_BALANCE_DUE_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
      { status: 400 }
    );
  }

  if (event.type === 'invoice.payment_succeeded') {
    // Retrieve the details from Stripe.
    const customer = await stripe.customers.retrieve(
      event.data.object.customer as string
    );

    const dbCustomer = await db.customer.findFirst({
      where: {
        stripe_customer_id: customer.id,
      },
    });

    dbCustomer.update({
      where: {
        id: dbCustomer.id,
      },
      data: {
        stripeBalanceDue:
          dbCustomer.amountDue - event.data.object.amount_due > 0
            ? true
            : false,
        amountDue: dbCustomer.amountDue - event.data.object.amount_due,
      },
    });
  }

  return new Response(null, { status: 200 });
}
