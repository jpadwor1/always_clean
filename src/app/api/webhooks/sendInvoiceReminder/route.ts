import { db } from '@/db';
import { Customer } from '@prisma/client';
import sgMail from '@sendgrid/mail';


export async function POST(request: Request) {
  const body = await request.text();


  try {
   const customersBehind = await db.customer.findMany({
    where: {
        stripeBalanceDue: true,
    }
   });

    if(customersBehind.length < 0){
        return new Response(null, { status: 200 });
    }

    sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

    Promise.all(customersBehind.map(async(customer: Customer) => {
        //send email to customer
        const sendEmail = async (to: string) => {
            const msg = {
              to: to,
              from: 'support@krystalcleanpools.com',
              subject: ' ',
              html: ' ',
              text: ' ',
              template_id: 'd-88b5d2c4ae1a4896be481061e664a409',
              dynamic_template_data: {
                sender_message: `Invoice Sent to Customer, ${customer.name}`,
              },
            };
  
            try {
              await sgMail.send(msg);
            } catch (error) {
              console.error('Error sending email:', error);
  
              throw new Error('Failed to send email');
            }
          };
  
          await sendEmail(customer.email);
    }))
   
  } catch (err) {
   
  }

  

  return new Response(null, { status: 200 });
}
