import { z } from 'zod';

// Zod validation schema based on the Mongoose model
export const userValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  pin: z.string().length(5, 'Pin must be exactly 5 digits'),
  number: z.number(),
  balance: z.number().optional(),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  nid: z.number().min(100000000, 'NID must be at least 9 digits'),
  isVerified: z.boolean().optional(),
  isBlocked: z.boolean().optional(),
  transactions: z
    .array(
      z.object({
        transactionId: z.string(),
        transactionAmount: z.number(),
        chargeAmount: z.number().optional(),
        agentNumber: z.number(),
        reference: z.string().optional(),
        transactionType: z.string().optional(),
      }),
    )
    .optional(),
});
