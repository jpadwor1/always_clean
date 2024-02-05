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
      process.env.INVOICE_SENT_WEBHOOK_SECRET || ''
    );
  } catch (err) {
    return new Response(
      `Webhook Error: ${err instanceof Error ? err.message : 'Unknown Error'}`,
      { status: 400 }
    );
  }

  if (event.type === 'invoice.sent') {
    // Retrieve the details from Stripe.
    const customer = await stripe.customers.retrieve(
      event.data.object.customer as string
    );

    await db.customer.update({
      where: {
        stripeSubscriptionId: customer.id,
      },
      data: {
        stripeBalanceDue: true,
      },
    });
  }

  return new Response(null, { status: 200 });
}
