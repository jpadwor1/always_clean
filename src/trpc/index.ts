import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import z from "zod";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { CustomerType } from "@/lib/utils";
import { randomUUID } from "crypto";
import { getUserSubscriptionPlan, stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";
import { addDays, format } from "date-fns";
import sgMail from "@sendgrid/mail";
import { STRIPE_PLANS } from "@/lib/PLANS";
import { addUser } from "@/lib/actions";
import { Customer } from "@prisma/client";
import Stripe from "stripe";
import { openai } from "@/lib/openai";
import { zodResponseFormat } from "openai/helpers/zod";

export const appRouter = router({
  authCallback: publicProcedure.query(async () => {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    if (!user?.id || !user?.email)
      throw new TRPCError({ code: "UNAUTHORIZED" });

    const email = user.email.toLowerCase();

    const dbUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!dbUser) {
      // create user in db
      await db.user.create({
        data: {
          id: user.id,
          email: email,
          name:
            user.given_name && user.family_name
              ? user.given_name + " " + user.family_name
              : "",
          address: "",
          phone: "",
          photoURL: user.picture,
        },
      });

      const dbCustomer = await db.customer.findFirst({
        where: {
          email: email,
        },
      });

      if (!dbCustomer) {
        await db.customer.create({
          data: {
            id: user.id,
            email: email,
            name:
              user.given_name && user.family_name
                ? user.given_name + " " + user.family_name
                : "",
            address: "",
            phone: "",
            photoURL: user.picture,
          },
        });
      }

      await db.customer.update({
        where: {
          email: email,
        },
        data: {
          id: user.id,
        },
      });

      sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

      const sendEmail = async () => {
        const msg = {
          to: "support@krystalcleanpools.com",
          from: "support@krystalcleanpools.com",
          subject: " ",
          html: " ",
          text: " ",
          template_id: "d-f1d2078cbff4449b8ea1ae8c0f60ecc9",
          dynamic_template_data: {
            name:
              user.given_name && user.family_name
                ? user.given_name + " " + user.family_name
                : "",
            email: email,
          },
        };

        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error("Error sending email:", error);

          throw new Error("Failed to send email");
        }
      };

      await sendEmail();
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
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dbUser = await db.user.findFirst({
        where: {
          email: input.email,
        },
      });

      if (dbUser) {
        const customer = await db.customer.update({
          where: {
            id: dbUser.id,
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
          code: "BAD_REQUEST",
          message: "Customer already exists",
        });
      }
      try {
        const response = await addUser({
          name: input.name,
          email: input.email,
        });
        const newUserId = response.id;
        const customer = await db.customer.create({
          data: {
            id: newUserId,
            name: input.name,
            address: input.address,
            email: input.email,
            phone: input.phone,
            nextServiceDate: input.nextServiceDate,
            customerType: input.customerType,
            discount: "",
          },
        });
      } catch (error) {
        console.error("Error in adding user:", error);
      }

      try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

        const msg = {
          to: input.email,
          from: "support@krystalcleanpools.com",
          subject: "",
          html: " ",
          text: " ",
          template_id: "d-f146e5e791104cf99f546d4492360299",
        };

        await sgMail.send(msg);
      } catch (error) {
        console.error("Error sending email:", error);

        throw new Error("Failed to send email");
      }
      return { success: true };
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
        throw new TRPCError({ code: "UNAUTHORIZED" });
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
  updateCustomerAvatar: privateProcedure
    .input(z.object({ customerId: z.string(), photoURL: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dbCustomer = await db.customer.findFirst({
        where: {
          id: input.customerId,
        },
      });

      if (dbCustomer) {
        await db.customer.update({
          where: {
            id: input.customerId,
          },
          data: {
            photoURL: input.photoURL,
          },
        });
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
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const customer = await db.customer.delete({
        where: {
          id: input.id,
        },
      });

      await db.user.delete({
        where: {
          email: customer.email,
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
        throw new TRPCError({ code: "UNAUTHORIZED" });
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
      const email = input.email.toLowerCase();
      const currentCustomer = await db.customer.findFirst({
        where: {
          email: email,
        },
      });

      const currentUser = await db.user.findFirst({
        where: {
          email: email,
        },
      });

      if (!currentCustomer && !currentUser) {
        await db.customer.create({
          data: {
            id: randomUUID(),
            name: input.fullName,
            email: email,
            address: input.address,
            phone: input.phoneNumber,
            customerType: "ACTIVE",
            nextServiceDate: input.nextServiceDate,
          },
        });
      }

      const sendBookingConfirmationEmail = async (
        to: string,
        subject: string
      ) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
        const date = format(
          new Date(input.nextServiceDate),
          "EEEE, d MMMM hh:mm a"
        );
        const msg = {
          to: to,
          from: "support@krystalcleanpools.com",
          html: " ",
          text: " ",
          subject: subject,
          template_id: "d-cd087546446846448257cfe5f199fc80",
          dynamic_template_data: {
            full_name: input.fullName,
            address: input.address,
            phoneNumber: input.phoneNumber,
            service: input.service,
            service_date: date,
          },
        };

        sgMail
          .send(msg)
          .then(() => {})
          .catch((error: any) => {
            console.error(error);
          });
      };

      await sendBookingConfirmationEmail(email, "Booking Confirmation");
      await sendBookingConfirmationEmail(
        "support@krystalcleanpools.com",
        "New Booking Request"
      );

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
      sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

      const sendEmail = async (to: string) => {
        const msg = {
          to: to,
          from: "support@krystalcleanpools.com",
          subject: " ",
          html: " ",
          text: " ",
          template_id: "d-fc576d7863c54a16a540f8d27573ef0f",
          dynamic_template_data: {
            sender_email: input.email,
            sender_message: input.message,
          },
        };

        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error("Error sending email:", error);

          throw new Error("Failed to send email");
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
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const dbCustomer = await db.customer.findFirst({
        where: {
          id: input.customerId,
        },
      });

      if (!dbCustomer) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Customer does not exist",
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
              id: randomUUID(),
            })),
          },
          technicianId: userId,
        },
      });

      if (input.files.length > 0) {
        input.files.map(async (file) => {
          if (!file) {
            throw new Error("File is undefined");
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
                uploadStatus: "SUCCESS",
              },
            });
          }
        });
      }

      if (dbCustomer.communicationEmails) {
        const serviceNotificationSentDate = new Date(
          dbCustomer.serviceNotificationSent
        ).getTime(); // Convert to timestamp
        const currentDate = new Date().getTime();

        const differenceInMilliseconds =
          currentDate - serviceNotificationSentDate;

        // Convert milliseconds to days
        const differenceInDays =
          differenceInMilliseconds / (24 * 60 * 60 * 1000);

        if (differenceInDays > 1) {
          sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
          const msg = {
            to: dbCustomer.email,
            from: "support@krystalcleanpools.com",
            subject: " ",
            html: " ",
            text: " ",
            template_id: "d-1db21318d80c47078998977e3f5a8b05",
            dynamic_template_data: {
              full_name: dbCustomer.name,
              service_date: format(
                new Date(input.dateCompleted),
                "EEEE, d MMMM"
              ),
            },
          };

          try {
            await sgMail.send(msg);
          } catch (error) {
            console.error("Error sending email:", error);

            throw new Error("Failed to send email");
          } finally {
            await db.customer.update({
              where: {
                id: input.customerId,
              },
              data: {
                serviceNotificationSent: new Date(),
              },
            });
          }
        } else {
          console.log("The service notification was sent less than 1 day ago.");
        }
      }

      return dbServiceEvent;
    }),

  getDeleteServiceEvent: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
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
      throw new TRPCError({ code: "UNAUTHORIZED" });

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
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dbChemical = await db.chemical.findFirst({
        where: {
          id: input.id,
        },
      });

      if (!dbChemical) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Chemical does not exist",
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
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dbChemical = await db.chemical.findFirst({
        where: {
          name: input.name,
        },
      });

      if (dbChemical) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Chemical already exists",
        });
      }

      await db.chemical.create({
        data: {
          id: randomUUID(),
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
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const file = await db.file.findFirst({
        where: {
          key: input.downloadURL,
        },
      });

      if (!file) throw new TRPCError({ code: "NOT_FOUND" });

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
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const doesFileExist = await db.file.findFirst({
        where: {
          key: input.downloadURL,
        },
      });

      if (doesFileExist) return;

      const createdFile = await db.file.create({
        data: {
          id: randomUUID(),
          key: input.downloadURL,
          name: input.fileName,
          url: input.downloadURL,
          uploadStatus: "PROCESSING",
        },
      });

      if (!createdFile) throw new TRPCError({ code: "NOT_FOUND" });

      try {
        const response = await fetch(input.downloadURL);

        await db.file.update({
          where: { id: createdFile.id },
          data: {
            uploadStatus: "SUCCESS",
          },
        });
      } catch (err) {
        await db.file.update({
          where: { id: createdFile.id },
          data: {
            uploadStatus: "FAILED",
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
      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dbCalendarEvent = await db.calendarEvent.create({
        data: {
          id: randomUUID(),
          title: input.title,
          start: new Date(input.start),
          end: new Date(input.end),
          allDay: input.allDay as boolean,
          extendedProps_description: input.extendedProps.description,
          extendedProps_location: input.extendedProps.location,
          extendedProps_email: input.extendedProps.email,
          extendedProps_phone: input.extendedProps.phone,
          extendedProps_customerId: input.extendedProps.customerId,
          editable: input.editable,
          extendedProps_customerName: input.extendedProps.customerName,
        },
      });

      return dbCalendarEvent;
    }),

  getCalendarEvents: privateProcedure.query(async ({ ctx }) => {
    const { userId, user } = ctx;

    if (!userId || !user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const calendarEvents = await db.calendarEvent.findMany();

    return calendarEvents;
  }),

  getDeleteCalendarEvent: privateProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
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

    const billingUrl = absoluteUrl("/profile/billing");

    if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

    const dbUser = await db.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" });

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
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
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
  createCustomInvoice: privateProcedure
    .input(
      z.object({
        customerId: z.string(),
        amount: z.number(),
        name: z.string(),
        description: z.string(),
        dueDate: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;
      const date = new Date();
      const dueDate = date.setDate(date.getDate() + 30);

      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      try {
        let customer = await db.customer.findUnique({
          where: {
            id: input.customerId,
          },
        });
        let email = customer?.email;

        let customerStripeId;
        let stripeCustomer;

        if (!customer?.stripe_customer_id) {
          // Create a new Customer
          stripeCustomer = await stripe.customers.create({
            email,
            description: "Customer to invoice",
            name: customer?.name,
            phone: customer?.phone,
          });
          // Store the Customer ID in your database to use for future purchases
          await db.customer.update({
            where: {
              id: input.customerId,
            },
            data: {
              stripe_customer_id: stripeCustomer.id,
              stripeBalanceDue: true,
            },
          });
          customerStripeId = stripeCustomer.id;
        } else {
          // Read the Customer ID from your database
          customerStripeId = customer.stripe_customer_id;
        }

        // Create an Invoice
        const invoice = await stripe.invoices.create({
          customer: customerStripeId,
          currency: "usd",
          collection_method: "send_invoice",
          due_date: input.dueDate,
          automatic_tax: {
            enabled: false,
          },
          auto_advance: true,
        });

        const product = await stripe.products.create({
          name: input.name,
          description: input.description,
        });

        const price = await stripe.prices.create({
          currency: "usd",
          unit_amount: input.amount * 100,
          product: product.id,
        });

        // Create an Invoice Item with the Price, and Customer
        const invoiceItem = await stripe.invoiceItems.create({
          customer: customerStripeId,
          price: price.id,
          invoice: invoice.id,
        });

        // Send the Invoice
        await stripe.invoices.sendInvoice(invoice.id);

        await db.customer.update({
          where: {
            id: input.customerId,
          },
          data: {
            dueDate: dueDate.toString(),
            lastInvoiceSent: new Date(),
          },
        });
        //Confirmation email to owner
        sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

        const sendEmail = async (to: string) => {
          const msg = {
            to: to,
            from: "support@krystalcleanpools.com",
            subject: " ",
            html: " ",
            text: " ",
            template_id: "d-275d63f041db4530920b60e24948baa5",
            dynamic_template_data: {
              sender_message: `Invoice Sent to Customer, ${customer.name}`,
            },
          };

          try {
            await sgMail.send(msg);
          } catch (error) {
            console.error("Error sending email:", error);

            throw new Error("Failed to send email");
          }
        };

        await sendEmail("support@krystalcleanpools.com");
      } catch (err) {
        console.error(err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  getCreateInvoice: privateProcedure
    .input(
      z.object({
        customerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;
      const date = new Date();
      const dueDate = date.setDate(date.getDate() + 30);

      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      try {
        let customer = await db.customer.findUnique({
          where: {
            id: input.customerId,
          },
        });
        let email = customer?.email;

        let customerStripeId;
        let stripeCustomer;

        if (!customer?.stripe_customer_id) {
          // Create a new Customer
          stripeCustomer = await stripe.customers.create({
            email,
            description: "Customer to invoice",
            name: customer?.name,
            phone: customer?.phone,
          });
          // Store the Customer ID in your database to use for future purchases
          await db.customer.update({
            where: {
              id: input.customerId,
            },
            data: {
              stripe_customer_id: stripeCustomer.id,
              stripeBalanceDue: true,
            },
          });
          customerStripeId = stripeCustomer.id;
        } else {
          // Read the Customer ID from your database
          customerStripeId = customer.stripe_customer_id;
        }

        // Create an Invoice
        const invoice = await stripe.invoices.create({
          customer: customerStripeId,
          currency: "usd",
          collection_method: "send_invoice",
          days_until_due: 30,
          automatic_tax: {
            enabled: false,
          },
          auto_advance: true,
        });

        // Create an Invoice Item with the Price, and Customer
        const invoiceItem = await stripe.invoiceItems.create({
          customer: customerStripeId,
          price: STRIPE_PLANS.find(
            (plan) => plan.name === customer.agreementCode
          )?.priceIds.production,
          invoice: invoice.id,
        });

        // Send the Invoice
        await stripe.invoices.sendInvoice(invoice.id);

        await db.customer.update({
          where: {
            id: input.customerId,
          },
          data: {
            dueDate: dueDate.toString(),
            lastInvoiceSent: new Date(),
          },
        });
        //Confirmation email to owner
        sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");

        const sendEmail = async (to: string) => {
          const msg = {
            to: to,
            from: "support@krystalcleanpools.com",
            subject: " ",
            html: " ",
            text: " ",
            template_id: "d-275d63f041db4530920b60e24948baa5",
            dynamic_template_data: {
              sender_message: `Invoice Sent to Customer, ${customer.name}`,
            },
          };

          try {
            await sgMail.send(msg);
          } catch (error) {
            console.error("Error sending email:", error);

            throw new Error("Failed to send email");
          }
        };

        await sendEmail("support@krystalcleanpools.com");
      } catch (err) {
        console.error(err);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  sendInvoiceReminder: privateProcedure
    .input(
      z.object({
        customerEmail: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const sendEmail = async (to: string) => {
        const msg = {
          to: to,
          from: "support@krystalcleanpools.com",
          subject: " ",
          html: " ",
          text: " ",
          template_id: "d-30cbd6b7cd654c3888aa20c66b2b24aa",
        };

        try {
          await sgMail.send(msg);
        } catch (error) {
          console.error("Error sending email:", error);

          throw new Error("Failed to send email");
        }
      };

      await sendEmail(input.customerEmail);
    }),

  updateCustomerPreferences: privateProcedure
    .input(
      z.object({
        serviceDay: z
          .enum(["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"])
          .optional(),
        special_instructions: z.string().max(300).optional(),
        communication_emails: z.boolean().default(true).optional(),
        communication_texts: z.boolean().default(true).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;
      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dbCustomer = await db.customer.findFirst({
        where: {
          id: userId,
        },
      });

      if (dbCustomer) {
        await db.customer.update({
          where: {
            id: userId,
          },
          data: {
            preferredServiceDay: input.serviceDay,
            specialInstructions: input.special_instructions,
            communicationEmails: input.communication_emails,
            communicationTexts: input.communication_texts,
          },
        });
      }

      return { success: true };
    }),

  createPost: privateProcedure
    .input(
      z.object({
        title: z.string(),
        desc: z.string(),
        img: z.string(),
        slug: z.string(),
        catSlug: z.string(),
        postSEO: z.object({
          metaDescription: z.string(),
          excerpt: z.string(),
          slug: z.string(),
          publishDate: z.string(),
          keywords: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await db.post.create({
        data: {
          id: randomUUID(),
          title: input.title,
          desc: input.desc,
          img: input.img,
          slug: input.postSEO.slug.length > 0 ? input.postSEO.slug : input.slug,
          userId: userId,
          metaDescription: input.postSEO.metaDescription,
          excerpt: input.postSEO.excerpt,
          category: input.catSlug,
          publishDate: input.postSEO.publishDate
            ? input.postSEO.publishDate
            : "",
          keywords: input.postSEO.keywords,
        },
      });

      return { success: true };
    }),
  writeWithAi: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const blogPost = z.object({
        blogTitle: z.string(),
        blogBody: z.string(),
        blogTags: z.string(),
        blogMetaDescription: z.string(),
        blogExcerpt: z.string(),
      });

      const completion = await openai.beta.chat.completions.parse({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a professional U.S. defense/military blogger. You need to write a blog post based on the following topic and return the blog post in the format of a JSON object with the following properties: blogTitle, blogBody, any blogTags, blogMetaDescription, blogExcerpt. The blog body must be returned as HTML.",
          },
          {
            role: "user",
            content: input,
          },
        ],
        response_format: zodResponseFormat(blogPost, "blogPost"),
      });

      if (!completion || !completion.choices) {
        throw new TRPCError({
          message: "Failed to generate story",
          code: "BAD_REQUEST",
        });
      }

      const message = completion.choices[0]?.message.parsed;
      return message;
    }),
  getPost: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async (opts) => {
      const post = await db.post.findFirst({
        where: {
          slug: opts.input.slug,
        },
      });

      const author = await db.user.findFirst({
        where: {
          id: post?.userId,
        },
      });

      return { post, author };
    }),
  getPosts: publicProcedure.query(async (opts) => {
    const posts = await db.post.findMany();

    return { posts };
  }),
  getUser: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async (opts) => {
      const user = await db.user.findFirst({
        where: {
          id: opts.input.id,
        },
      });

      return user;
    }),
  updateCustomerDiscount: privateProcedure
    .input(
      z.object({
        discount: z.string().optional(),
        customerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;
      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dbCustomer = await db.customer.findFirst({
        where: {
          id: input.customerId,
        },
      });

      if (dbCustomer) {
        await db.customer.update({
          where: {
            id: dbCustomer.id,
          },
          data: {
            discount: input.discount ? input.discount : "",
          },
        });
      }

      return { success: true };
    }),
  updateCustomerServiceAgreement: privateProcedure
    .input(
      z.object({
        serviceAgreementURL: z.string(),
        customerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;
      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dbCustomer = await db.customer.findFirst({
        where: {
          id: input.customerId,
        },
      });

      if (dbCustomer) {
        await db.customer.update({
          where: {
            id: dbCustomer.id,
          },
          data: {
            serviceAgreementURL: input.serviceAgreementURL,
            serviceAgreementDate: new Date(),
          },
        });
      }

      return { success: true };
    }),
  updateCustomerServiceAgreementCode: privateProcedure
    .input(
      z.object({
        agreementCode: z.string(),
        customerId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;
      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const dbCustomer = await db.customer.findFirst({
        where: {
          id: input.customerId,
        },
      });

      if (dbCustomer) {
        await db.customer.update({
          where: {
            id: dbCustomer.id,
          },
          data: {
            agreementCode: input.agreementCode,
          },
        });
      }

      return { success: true };
    }),
  getInvoices: publicProcedure.query(async () => {
    const customers = await db.customer.findMany({
      where: {
        stripeBalanceDue: true,
        customerType: "ACTIVE",
      },
    });

    let invoicesPromises = customers.map(async (customer: Customer) => {
      const customerStripeId = customer.stripe_customer_id;
      const customerInvoices = await stripe.invoices.list({
        customer: customerStripeId,
      });

      return customerInvoices.data;
    });

    const results = await Promise.all(invoicesPromises);
    const invoices = results.flat();
    const customer_invoices = invoices.filter(
      (invoice: Stripe.Invoice) =>
        invoice.status === "paid" || invoice.status === "open"
    );

    if (customer_invoices.length === 0) {
      return { success: false };
    }

    return customer_invoices;
  }),
  uniqueSlug: privateProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const post = await db.post.findUnique({
        where: {
          slug: input,
        },
      });

      if (!post) {
        return true;
      }

      return false;
    }),
  getPostById: privateProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const post = await db.post.findUnique({
        where: {
          id: input,
        },
      });

      if (!post) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      return post;
    }),
  getPostsInfinite: publicProcedure
    .input(
      z.object({
        cursor: z.string().optional().nullish(),
        limit: z.number().min(1).default(4),
      })
    )
    .query(async (opts) => {
      const { input } = opts;
      const limit = input.limit ?? 4;
      const { cursor } = input;

      const posts = await db.post.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        select: {
          id: true,
          title: true,
          img: true,
          slug: true,
          category: true,
          publishDate: true,
          excerpt: true,
        },
        orderBy: {
          publishDate: "desc",
        },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (posts.length > limit) {
        const nextItem = posts.pop();
        nextCursor = nextItem!.id;
      }

      if (!posts) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No posts found",
        });
      }

      return { posts, nextCursor };
    }),
  deletePostById: privateProcedure
    .input(z.string())
    .mutation(async ({ input, ctx }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await db.post.delete({
        where: {
          id: input,
        },
      });

      return { success: true };
    }),
  updatePost: privateProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        desc: z.string(),
        img: z.string(),
        slug: z.string(),
        catSlug: z.string(),
        postSEO: z.object({
          metaDescription: z.string(),
          excerpt: z.string(),
          slug: z.string(),
          publishDate: z.string(),
          keywords: z.string(),
        }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { userId, user } = ctx;

      if (!userId || !user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      await db.post.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          desc: input.desc,
          img: input.img,
          slug: input.postSEO.slug.length > 0 ? input.postSEO.slug : input.slug,
          userId: userId,
          metaDescription: input.postSEO.metaDescription,
          excerpt: input.postSEO.excerpt,
          category: input.catSlug,
          publishDate: input.postSEO.publishDate || "",
          keywords: input.postSEO.keywords,
          createdAt: new Date().toISOString(),
        },
      });

      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
