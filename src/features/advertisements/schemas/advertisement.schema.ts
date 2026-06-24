import { z } from "zod";

export const advertisementSchema = z.object({
  title: z.string().min(3),

  slug: z.string().min(3),

  image: z.string().optional(),

  htmlCode: z.string().optional(),

  targetUrl: z.string().optional(),

  position: z.string(),

  device: z.string(),

  priority: z.coerce.number(),

  active: z.boolean(),
});