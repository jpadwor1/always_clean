import { db } from '@/db';
import { Customer } from '@prisma/client';

export async function POST(request: Request) {
  const body = await request.text();

  try {
    const customers = await db.customer.findMany({
      where: {
        nextServiceDate: {
          lt: new Date(), // 'less than' current date
        },
      },
    });

    const updatedCustomers = await Promise.all(
      customers.map(async (customer: Customer) => {
        return await db.customer.update({
          where: {
            id: customer.id,
          },
          data: {
            lastServiceDate: customer.nextServiceDate,
            nextServiceDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Set to 7 days later
          },
        });
      })
    );

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(
      `Webhook Error: ${
        error instanceof Error ? error.message : 'Unknown Error'
      }`,
      { status: 400 }
    );
  }
}

// export const notAllowedHandler = (req: NextApiRequest, res: NextApiResponse) => {
//     res.setHeader('Allow', ['POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
