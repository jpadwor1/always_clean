import { db } from '@/db';
import { Customer } from '@prisma/client';
import sgMail from '@sendgrid/mail';

export async function GET(request: Request) {
  const { secret } = Object.fromEntries(request.headers);

  if (secret !== process.env.CRON_SECRET) {
    return new Response('Unauthorized', { status: 401 });
  }

 return new Response('OK', { status: 200 });
}
