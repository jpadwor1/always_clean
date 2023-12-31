import { z } from 'zod';

export const customerSchema = z.object({
  customerType: z.string(),
  name: z.string(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
  nextServiceDate: z.string(),
  lastServiceDate: z.string(),
  id:z.string()
});

export type Customer = z.infer<typeof customerSchema>;
