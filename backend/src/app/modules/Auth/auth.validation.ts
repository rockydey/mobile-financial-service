import { z } from 'zod';

// Zod validation schema based on the Mongoose model
export const userValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  pin: z.string().length(5, 'Pin must be exactly 5 digits'),
  number: z
    .number()
    .min(10000000000, 'Number must be exactly 11 digits')
    .max(99999999999, 'Number must be exactly 11 digits'),
  balance: z.number().optional(),
  email: z.string().email('Invalid email address'),
  role: z.string().min(1, 'Role is required'),
  nid: z.number().min(100000000, 'NID must be at least 9 digits'),
  isVerified: z.boolean().optional(),
});
