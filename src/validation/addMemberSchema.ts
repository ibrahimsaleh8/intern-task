import * as z from "zod";
export const addMemberSchema = z.object({
  email: z.email({ error: "Email is required" }),
  name: z
    .string({ error: "Name is required" })
    .min(3, "min chars for name is 3"),
});

export type AddMemberDataType = z.infer<typeof addMemberSchema>;
