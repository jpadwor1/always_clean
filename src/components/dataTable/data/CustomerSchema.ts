import { z } from 'zod';

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const customerSchema = z.object({
  customerType: z.string(),
  name: z.string(),
  address: z.string(),
  email: z.string(),
  phone: z.string(),
  nextServiceDate: z.string(),
});

export type Customer = z.infer<typeof customerSchema>;
