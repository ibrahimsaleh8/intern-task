import * as z from "zod";
export const addSportSchema = z.object({
  title: z
    .string({ error: "Title is required" })
    .min(4, "min chars for title is 4"),
  description: z
    .string({ error: "description is required" })
    .min(10, "min chars for description is 10"),
});

export type AddSportDataType = z.infer<typeof addSportSchema>;
