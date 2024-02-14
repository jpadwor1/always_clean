import { trpc } from '@/app/_trpc/client';
import { db } from '@/db';
import { Customer } from '@prisma/client';
import sgMail from '@sendgrid/mail';

export async function GET() {
  try {
    const customersBehind = await db.customer.findMany({
      where: {
        stripeBalanceDue: true,
      },
    });

    if (customersBehind.length === 0) {
      return new Response(null, { status: 200 });
    }
    sgMail.setApiKey(
      process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : ''
    );
    await Promise.all(
      customersBehind.map(async (customer: Customer) => {
        const customerEmail = customer.email;
        const sendEmail = async (to: string) => {
          const msg = {
            to: to,
            from: 'support@krystalcleanpools.com',
            subject: ' ',
            html: ' ',
            text: ' ',
            template_id: 'd-278110de1f534178ac8e13e19a4f3c2c',
          };

          try {
            await sgMail.send(msg);
          } catch (error: any) {
            console.error('Error sending email:', error.response.body);

            throw new Error('Failed to send email');
          }
        };

        await sendEmail(customerEmail);
      })
    );
  } catch (error) {
    return new Response(
      `Webhook Error: ${
        error instanceof Error ? error.message : 'Unknown Error'
      }`,
      { status: 400 }
    );
  }

  return new Response(null, { status: 200 });
}
