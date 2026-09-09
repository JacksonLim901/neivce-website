import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email address."),
  message: z.string().trim().min(10, "Message should be at least 10 characters."),
});

export type EnquiryFormValues = z.infer<typeof enquirySchema>;