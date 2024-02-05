import { db } from '@/db';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import type Stripe from 'stripe';

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature') || '';

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
      // process.env.INVOICE_SENT_WEBHOOK_SECRET || ''
    );

    if (event.type === 'invoice.sent') {
      const customer = await stripe.customers.retrieve(
        event.data.object.customer as string
      );
      console.log(customer);

      await db.customer.update({
        where: {
          stripeSubscriptionId: customer.id,
        },
        data: {
          stripeBalanceDue: true,
        },
      });

      return new Response(null, { status: 200 });
    } else if (event.type === 'invoice.paid') {
      console.log('invoice.paid');
    } else {
      return new Response('Webhook event not handled', { status: 400 });
    }
  } catch (err) {
    console.error('Webhook Error:', err);

    if (err instanceof stripe.errors.StripeSignatureVerificationError) {
      return new Response('Invalid Stripe signature', { status: 400 });
    } else {
      return new Response('Internal server error', { status: 500 });
    }
  }
}
