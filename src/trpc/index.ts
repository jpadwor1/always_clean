import { privateProcedure, publicProcedure, router } from "./trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/db";
import z from "zod";
import { CustomerType } from "@/lib/utils";
import { randomUUID } from "crypto";
import { addDays, format } from "date-fns";
import sgMail from "@sendgrid/mail";

export const appRouter = router({
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
      }),
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
        subject: string,
      ) => {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY || "");
        const date = format(
          new Date(input.nextServiceDate),
          "EEEE, d MMMM hh:mm a",
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
        "New Booking Request",
      );

      return;
    }),
  sendContactFormEmail: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        message: z.string(),
      }),
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
  getPostsInfinite: publicProcedure
    .input(
      z.object({
        cursor: z.string().optional().nullish(),
        limit: z.number().min(1).default(4),
      }),
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
});

export type AppRouter = typeof appRouter;
