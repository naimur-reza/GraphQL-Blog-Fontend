import { z } from "zod";

export const createBlogSChema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1).max(255),
  image: z.string({ required_error: "Image is required" }),
  content: z
    .string({ required_error: "Description is required" })
    .min(1)
    .max(6555),
});

export const updateBlogSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1)
    .max(255)
    .optional(),
  image: z.string().optional(),
  content: z
    .string({ required_error: "Description is required" })
    .min(1)
    .max(6555)
    .optional(),
});
