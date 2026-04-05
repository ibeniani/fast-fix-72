import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  clients: router({
    list: adminProcedure.query(() => db.getAllClients()),
    getById: adminProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getClientById(input.id)),
    create: adminProcedure.input(z.object({
      firstName: z.string().min(1),
      lastName: z.string().min(1),
      phone: z.string().min(1),
      email: z.string().email().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      postalCode: z.string().optional(),
      notes: z.string().optional(),
    })).mutation(({ input }) => db.createClient(input)),
    update: adminProcedure.input(z.object({
      id: z.number(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().email().optional(),
      address: z.string().optional(),
      city: z.string().optional(),
      postalCode: z.string().optional(),
      notes: z.string().optional(),
    })).mutation(({ input }) => {
      const { id, ...data } = input;
      return db.updateClient(id, data);
    }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => db.deleteClient(input.id)),
  }),
  repairs: router({
    list: adminProcedure.query(() => db.getAllRepairs()),
    getById: adminProcedure.input(z.object({ id: z.number() })).query(({ input }) => db.getRepairById(input.id)),
    getByClientId: adminProcedure.input(z.object({ clientId: z.number() })).query(({ input }) => db.getRepairsByClientId(input.clientId)),
    create: adminProcedure.input(z.object({
      clientId: z.number(),
      deviceType: z.string().min(1),
      deviceModel: z.string().min(1),
      issueDescription: z.string().min(1),
      repairType: z.string().optional(),
      estimatedCost: z.string().optional(),
      notes: z.string().optional(),
    })).mutation(({ input }) => db.createRepair(input as any)),
    update: adminProcedure.input(z.object({
      id: z.number(),
      status: z.enum(["pending", "in_progress", "completed", "cancelled"]).optional(),
      actualCost: z.string().optional(),
      completionDate: z.date().optional(),
      notes: z.string().optional(),
    })).mutation(({ input }) => {
      const { id, ...data } = input;
      return db.updateRepair(id, data as any);
    }),
    delete: adminProcedure.input(z.object({ id: z.number() })).mutation(({ input }) => db.deleteRepair(input.id)),
  }),
});

export type AppRouter = typeof appRouter;
