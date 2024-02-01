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
import sgMail from '@sendgrid/mail';
import { PLANS } from '@/lib/PLANS';

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
        fullName: z.string().optional(),
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
            name: input.fullName,
            address: input.address,
            email: input.email,
            phone: input.phone,
            isProfileComplete: true,
          },
        });

        if (dbUser) {
          await db.user.update({
            where: {
              id: user.id,
            },
            data: {
              name: input.fullName,
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
        },
      });

      const currentUser = await db.user.findFirst({
        where: {
          email: input.email,
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
  sendContactFormEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        message: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

      const sendEmail = async (to: string) => {
        const msg = {
          to: to,
          from: 'john@johnpadworski.dev',
          subject: ' ',
          html: ' ',
          text: ' ',
          template_id: 'd-aa89f78d44df4fa9a92e24dcf3fcfbfe',
          dynamic_template_data: {
            sender_email: input.email,
            sender_message: input.message,
          },
        };

        try {
          await sgMail.send(msg);
          console.log('Email sent');
        } catch (error) {
          console.error('Error sending email:', error);

          throw new Error('Failed to send email');
        }
      };

      await sendEmail(input.email);
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

  getDeleteServiceEvent: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      await db.serviceEvent.delete({
        where: {
          id: input.id,
        },
      });

      return { success: true };
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

  getAddCalendarEvent: privateProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        start: z.string(),
        end: z.string(),
        allDay: z.boolean(),
        extendedProps: z.object({
          description: z.string().optional(),
          location: z.string(),
          email: z.string().optional(),
          phone: z.string().optional(),
          customerId: z.string().optional(),
          customerName: z.string().optional(),
        }),
        editable: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;
      console.log('input', input);
      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      const dbCalendarEvent = await db.calendarEvent.create({
        data: {
          title: input.title,
          start: new Date(input.start),
          end: new Date(input.end),
          allDay: input.allDay as boolean,
          description: input.extendedProps.description,
          location: input.extendedProps.location,
          email: input.extendedProps.email,
          phone: input.extendedProps.phone,
          customerId: input.extendedProps.customerId,
          editable: input.editable,
          customerName: input.extendedProps.customerName,
        },
      });

      return dbCalendarEvent;
    }),

  getCalendarEvents: privateProcedure.query(async ({ ctx }) => {
    const { userId, user } = ctx;

    if (!userId || !user) {
      throw new TRPCError({ code: 'UNAUTHORIZED' });
    }

    const calendarEvents = await db.calendarEvent.findMany();

    return calendarEvents;
  }),

  getDeleteCalendarEvent: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      await db.calendarEvent.delete({
        where: {
          id: input.id,
        },
      });

      return { success: true };
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

  getCreateInvoice: privateProcedure
    .input(
      z.object({
        customerId: z.string(),
        serviceEventId: z.string(),
        serviceName: z.string(),
        notes: z.string().optional(),
        serviceChemicals: z.array(
          z.object({
            chemical: z.object({
              id: z.string(),
              name: z.string(),
              price: z.number(),
              units: z.string(),
            }),
            quantity: z.number(),
            id: z.string(),
            serviceEventId: z.string(),
            chemicalId: z.string(),
          })
        ),
        tasksPerformed: z.string(),
        dateCompleted: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      try {
        // Look up a customer in your database
        let customer = await db.customer.findUnique({
          where: {
            id: input.customerId,
          },
        });
        let email = customer?.email;

        let customerStripeId;
        let stripeCustomer;

        if (!customer?.stripeCustomerId) {
          // Create a new Customer
          stripeCustomer = await stripe.customers.create({
            email,
            description: 'Customer to invoice',
            name: customer?.name,
            phone: customer?.phone,
          });
          // Store the Customer ID in your database to use for future purchases
          await db.customer.update({
            where: {
              id: input.customerId,
            },
            data: {
              stripeCustomerId: stripeCustomer.id,
              stripeBalanceDue: true,
            },
          });
          customerStripeId = stripeCustomer.id;
        } else {
          // Read the Customer ID from your database
          customerStripeId = customer.stripeCustomerId;
        }

        // Create an Invoice
        const invoice = await stripe.invoices.create({
          customer: customerStripeId,
          currency: 'usd',
          collection_method: 'send_invoice',
          days_until_due: 30,
          automatic_tax: {
            enabled: false,
          },
        });

        // Create an Invoice Item with the Price, and Customer you want to charge
        const invoiceItem = await stripe.invoiceItems.create({
          customer: customerStripeId,
          price: PLANS.find((plan) => plan.type === input.serviceName)?.priceIds
            .production,
          invoice: invoice.id,
        });

        // Send the Invoice
        await stripe.invoices.sendInvoice(invoice.id);

        sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

        const sendEmail = async (to: string) => {
          const msg = {
            to: to,
            from: 'john@johnpadworski.dev',
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
            console.log('Email sent');
          } catch (error) {
            console.error('Error sending email:', error);

            throw new Error('Failed to send email');
          }
        };

        await sendEmail('johnpadworski@gmail.com');
      } catch (err) {
        console.error(err);
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    }),
});

export type AppRouter = typeof appRouter;
