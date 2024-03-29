import * as z from "zod";

export const threadValidations = z.object({
  threadImage: z.string().url().optional(),
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 3 characters required" }),
  accountId: z.string(),
});

export const commentValidations = z.object({
  thread: z
    .string()
    .nonempty()
    .min(3, { message: "Minimum 3 characters required" }),
});
