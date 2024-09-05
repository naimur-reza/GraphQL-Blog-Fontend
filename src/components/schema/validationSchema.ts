import { z } from "zod";

export const createBlogSChema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  content: z.string().min(1, "Description is required").max(6555),
});

export const updateBlogSchema = z.object({
  title: z.string().min(1, "Title is required").max(255).optional(),
  content: z.string().min(1, "Description is required").max(6555).optional(),
});
