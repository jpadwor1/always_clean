import { initTRPC } from "@trpc/server";
import { TRPCError } from "@trpc/server";
const t = initTRPC.create();
const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  return opts.next();
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
