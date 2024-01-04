import { privateProcedure, publicProcedure, router } from './trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/db';
import z from 'zod';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { CustomerType } from '@/lib/utils';
import { randomUUID } from 'crypto';
import { getUserSubscriptionPlan, stripe } from '@/lib/stripe';
import { absoluteUrl } from '@/lib/utils';
import { addDays, format } from 'date-fns';

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
      await db.user.create({
        data: {
          id: user.id,
          email: user.email,
          name: '',
          address: '',
          phone: '',
        },
      });

      await db.customer.create({
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
  updateCustomer: privateProcedure
    .input(
      z.object({
        id: z.string().optional(),
        name: z.string().optional(),
        address: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        customerType: z.nativeEnum(CustomerType).optional(),
        nextServiceDate: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const dbCustomer = await db.customer.findFirst({
        where: {
          id: input.id,
        },
      });

      const dbUser = await db.user.findFirst({
        where: {
          id: input.id,
          address: input.address,
        },
      });

      if (dbCustomer) {
        const customer = await db.customer.update({
          where: {
            id: input.id,
          },
          data: {
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone,
          },
        });

        if (dbUser) {
          await db.user.update({
            where: {
              id: input.id,
            },
            data: {
              name: input.name,
              address: input.address,
              email: input.email,
              phone: input.phone,
            },
          });
        }
      }

      return { success: true };
    }),
  deleteCustomer: privateProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      await db.customer.delete({
        where: {
          id: input.id,
        },
      });
      return { success: true };
    }),
  updateUserProfileSettings: privateProcedure
    .input(
      z.object({
        name: z.string().optional(),
        address: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        customerType: z.nativeEnum(CustomerType).optional(),
        nextServiceDate: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const dbCustomer = await db.customer.findFirst({
        where: {
          id: user.id,
        },
      });

      const dbUser = await db.user.findFirst({
        where: {
          id: user.id,
        },
      });

      if (dbCustomer) {
        await db.customer.update({
          where: {
            id: user.id,
          },
          data: {
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone,
          },
        });

        if (dbUser) {
          await db.user.update({
            where: {
              id: user.id,
            },
            data: {
              name: input.name,
              address: input.address,
              email: input.email,
              phone: input.phone,
            },
          });
        }
      }

      return { success: true };
    }),
  createServiceRequest: publicProcedure
    .input(
      z.object({
        fullName: z.string(),
        email: z.string(),
        address: z.string(),
        phoneNumber: z.string(),
        customerType: z.nativeEnum(CustomerType),
        nextServiceDate: z.string(),
        service: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const currentCustomer = await db.customer.findFirst({
        where: {
          email: input.email,
          address: input.address,
        },
      });

      const currentUser = await db.user.findFirst({
        where: {
          email: input.email,
          address: input.address,
        },
      });

      if (!currentCustomer && !currentUser) {
        await db.customer.create({
          data: {
            id: randomUUID(),
            name: input.fullName,
            email: input.email,
            address: input.address,
            phone: input.phoneNumber,
            customerType: 'ACTIVE',
            nextServiceDate: input.nextServiceDate,
          },
        });
      }

      const sendBookingConfirmationEmail = async (
        to: string,
        subject: string
      ) => {
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(
          process.env.SENDGRID_API_KEY ? process.env.SENDGRID_API_KEY : ''
        );

        const msg = {
          to: to,
          from: 'john@johnpadworski.dev',
          html: ' ',
          text: ' ',
          subject: subject,
          template_id: 'd-83550735ad044882b563fd4f9600180e',
          dynamic_template_data: {
            full_name: input.fullName,
            address: input.address,
            phoneNumber: input.phoneNumber,
            service: input.service,
            service_date: format(
              new Date(input.nextServiceDate),
              'EEEE, d MMMM'
            ),
          },
        };

        sgMail
          .send(msg)
          .then(() => {
            console.log('Email sent');
          })
          .catch((error: any) => {
            console.error(error);
          });
      };

      await sendBookingConfirmationEmail(input.email, 'Booking Confirmation');

      return;
    }),
  createServiceEvent: privateProcedure
    .input(
      z.object({
        customerId: z.string().optional(),
        service: z.string(),
        dateCompleted: z.string(),
        tasksPerformed: z.array(z.string()),
        chemicalsUsed: z.array(
          z.object({ name: z.string(), quantity: z.number() })
        ),
        notes: z.string().optional(),
        files: z.array(
          z
            .object({
              id: z.string(),
              downloadURL: z.string(),
              fileName: z.string(),
              serviceEventId: z.string(),
            })
            .optional()
        ),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;
      const nextServiceDate = addDays(new Date(input.dateCompleted), 7);
      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      console.log('files', input.files);
      const dbCustomer = await db.customer.findFirst({
        where: {
          id: input.customerId,
        },
      });

      if (!dbCustomer) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Customer does not exist',
        });
      }

      await db.customer.update({
        where: {
          id: input.customerId,
        },
        data: {
          nextServiceDate: nextServiceDate,
        },
      });

      const dbUser = await db.user.findFirst({
        where: {
          id: input.customerId,
        },
      });

      if (dbUser) {
        await db.user.update({
          where: {
            id: input.customerId,
          },
          data: {
            nextServiceDate: nextServiceDate,
          },
        });
      }

      const dbServiceEvent = await db.serviceEvent.create({
        data: {
          id: randomUUID(),
          customerId: input.customerId,
          dateCompleted: input.dateCompleted,
          tasksPerformed: input.tasksPerformed.toString(),
          notes: input.notes,
          name: input.service,
          serviceChemicals: {
            create: input.chemicalsUsed.map((chemical) => ({
              chemical: {
                connect: { name: chemical.name },
              },
              quantity: chemical.quantity,
            })),
          },
          technicianId: userId,
        },
      });

      if (input.files.length > 0) {
        input.files.map(async (file) => {
          if (!file) {
            throw new Error('File is undefined');
          }

          const currentFile = await db.file.findFirst({
            where: {
              key: file.downloadURL,
            },
          });

          if (currentFile) {
            await db.file.update({
              where: {
                id: currentFile.id,
              },
              data: {
                key: file.downloadURL,
                name: file.fileName,
                serviceEventId: dbServiceEvent.id,
                url: file.downloadURL,
                uploadStatus: 'SUCCESS',
              },
            });
          }
        });
      }

      return dbServiceEvent;
    }),

  getChemicals: privateProcedure.query(async ({ ctx }) => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();

    if (!user?.id || !user?.email)
      throw new TRPCError({ code: 'UNAUTHORIZED' });

    const chemicals = await db.chemical.findMany();

    return chemicals;
  }),

  updateChemical: privateProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        units: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const dbChemical = await db.chemical.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!dbChemical) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Chemical does not exist',
        });
      }

      await db.chemical.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          units: input.units,
          price: input.price,
        },
      });

      return { success: true };
    }),

  addChemical: privateProcedure
    .input(
      z.object({
        name: z.string(),
        units: z.string(),
        price: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const dbChemical = await db.chemical.findFirst({
        where: {
          name: input.name,
        },
      });

      if (dbChemical) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Chemical already exists',
        });
      }

      await db.chemical.create({
        data: {
          name: input.name,
          units: input.units,
          price: input.price,
        },
      });

      return { success: true };
    }),

  getFile: privateProcedure
    .input(z.object({ downloadURL: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const file = await db.file.findFirst({
        where: {
          key: input.downloadURL,
        },
      });

      if (!file) throw new TRPCError({ code: 'NOT_FOUND' });

      return file;
    }),

  getCreateFile: privateProcedure
    .input(
      z.object({
        downloadURL: z.string(),
        fileName: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }
      console.log('Input received:', input);
      const doesFileExist = await db.file.findFirst({
        where: {
          key: input.downloadURL,
        },
      });

      if (doesFileExist) return;
      console.log('going to create file');

      const createdFile = await db.file.create({
        data: {
          key: input.downloadURL,
          name: input.fileName,
          url: input.downloadURL,
          uploadStatus: 'PROCESSING',
        },
      });

      if (!createdFile) throw new TRPCError({ code: 'NOT_FOUND' });

      try {
        const response = await fetch(input.downloadURL);

        await db.file.update({
          where: { id: createdFile.id },
          data: {
            uploadStatus: 'SUCCESS',
          },
        });
      } catch (err) {
        await db.file.update({
          where: { id: createdFile.id },
          data: {
            uploadStatus: 'FAILED',
          },
        });
      }

      return createdFile;
    }),

  getAddCalendarEvent: privateProcedure.input(z.object({
    title: z.string(),
    start: z.string(),
    end: z.string(),
    description: z.string(),
    location: z.string(),
    allDay: z.boolean(),
    customerId: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const { userId, user } = ctx;

    if (!userId || !user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const dbCalendarEvent = await db.calendarEvent.create({
      data: {
        id: randomUUID(),
        title: input.title,
        start: input.start,
        end: input.end,
        description: input.description,
        location: input.location,
        customerName: input.customerName,
        customerAddress: input.customerAddress,
        customerEmail: input.customerEmail,
        customerPhone: input.customerPhone,
        customerType: input.customerType,
        nextServiceDate: input.nextServiceDate,
      },
    });

    return dbCalendarEvent;
  }),
  

  createStripeSession: privateProcedure.mutation(async ({ ctx }) => {
    const { userId } = ctx;

    const billingUrl = absoluteUrl('/profile/billing');

    if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const dbUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!dbUser) throw new TRPCError({ code: 'UNAUTHORIZED' });

    const subscriptionPlan = await getUserSubscriptionPlan();

    if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: dbUser.stripeCustomerId,
        return_url: billingUrl,
      });
      return { url: stripeSession.url };
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: billingUrl,
      cancel_url: billingUrl,
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      line_items: [
        // {
        //   price: PLANS.find((plan) => plan.name === 'Pro')?.price.priceIds.test,
        //   quantity: 1,
        // },
      ],

      metadata: {
        userId: userId,
      },
    });
    return { url: stripeSession.url };
  }),
});

export type AppRouter = typeof appRouter;
