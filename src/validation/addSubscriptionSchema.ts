import * as z from "zod";

export const addSubscriptionSchema = z.object({
  email: z.email({ error: "Email is required" }),
  sport: z.string({ error: "Sport is required" }),
});

export type AddSubscriptionrDataType = z.infer<typeof addSubscriptionSchema>;
