
import { z } from "zod";

export const postSchema = z.object({

  title: z
    .string()
    .min(5, "Title is too short")
    .max(250),

  content: z
    .string()
    .min(20, "Content is required"),

  excerpt: z.string().optional(),

  image: z.string().optional(),

  video: z.string().optional(),

  seoTitle: z
    .string()
    .max(70)
    .optional(),

  seoDescription: z
    .string()
    .max(160)
    .optional(),

  tags: z.string().optional(),

  categoryId: z.string().optional(),

  breaking: z.boolean().optional(),

  featured: z.boolean().optional(),

  geography: z.string().optional(),

  stateId: z.string().optional(),

  districtId: z.string().optional(),

  talukaId: z.string().optional(),

  village: z.string().optional(),

  authorId: z.string(),

});

export type PostSchema = z.infer<typeof postSchema>;
