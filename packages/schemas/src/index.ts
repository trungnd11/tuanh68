import { z } from 'zod';

export const createLeadSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required'),
  phone: z.string().trim().min(8, 'Phone number is required'),
  email: z.string().trim().email().optional(),
  message: z.string().trim().max(1000).optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
