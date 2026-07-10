import { z } from "zod";

export const leadSourceValues = ["quote_form", "consultation_form", "contact_page"] as const;

export const leadStatusValues = ["new", "contacted", "qualified", "lost"] as const;

export const createLeadSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required"),
  phone: z.string().trim().min(8, "Phone number is required"),
  email: z.string().trim().email().optional().or(z.literal("")),
  company: z.string().trim().optional().or(z.literal("")),
  subject: z.string().trim().optional().or(z.literal("")),
  quantity: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
  source: z.enum(leadSourceValues),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
