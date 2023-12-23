import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import z from 'zod';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { CustomerType } from '@/lib/utils';
import { randomUUID } from 'crypto';

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user?.email)
      throw new TRPCError({ code: 'UNAUTHORIZED' });

    // check if the user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        id: user.id,
      },
    });

    if (!dbUser) {
      // create user in db
      console.log('creating user in db');
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: '',
          address: '',
          phone: '',
        },
      });
    }

    return { success: true };
  }),

  getCustomers: privateProcedure.query(async ({ ctx }) => {
    const customers = await db.customer.findMany();

    return customers;
  }),
  addCustomer: privateProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        email: z.string(),
        phone: z.string(),
        customerType: z.nativeEnum(CustomerType),
        nextServiceDate: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const dbUser = await db.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (dbUser) {
        const customer = await db.customer.update({
          where: {
            email: dbUser.email,
          },
          data: {
            id: dbUser.id,
            name: input.name,
            address: input.address,
            email: dbUser.email,
            phone: input.phone,
            customerType: input.customerType,
            nextServiceDate: input.nextServiceDate,
          },
        });

        return customer;
      }

      const currentCustomer = await db.customer.findFirst({
        where: {
          email: input.email,
          address: input.address,
        },
      });

      if (currentCustomer) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Customer already exists',
        });
      }

      const customer = await db.customer.create({
        data: {
          id: randomUUID(),
          name: input.name,
          address: input.address,
          email: input.email,
          phone: input.phone,
          nextServiceDate: input.nextServiceDate,
          customerType: input.customerType,
        },
      });

      return customer;
    }),
  updateServiceDates: privateProcedure.mutation(async ({ ctx }) => {
    const customers = await db.customer.findMany({
      where: {
        nextServiceDate: {
          lt: new Date(), // lt = 'less than'
        },
      },
    });

    const updatedCustomers = await Promise.all(
      customers.map(async (customer) => {
        return await db.customer.update({
          where: {
            id: customer.id,
          },
          data: {
            lastServiceDate: customer.nextServiceDate,
            nextServiceDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days later
          },
        });
      })
    );

    return updatedCustomers;
  }),
});

export type AppRouter = typeof appRouter;
