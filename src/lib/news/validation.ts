import { z } from "zod";
import { PostStatus } from "@prisma/client";

/* ===========================================================
   Constants
=========================================================== */

const MAX_TITLE = 200;
const MAX_SLUG = 250;
const MAX_EXCERPT = 500;
const MAX_SEO_TITLE = 70;
const MAX_SEO_DESCRIPTION = 160;

/* ===========================================================
   Base News Schema
=========================================================== */

export const NewsSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters.")
    .max(MAX_TITLE),

  slug: z
    .string()
    .trim()
    .min(3)
    .max(MAX_SLUG)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens."
    ),

  excerpt: z
    .string()
    .max(MAX_EXCERPT)
    .optional()
    .or(z.literal("")),

  content: z
    .string()
    .min(20, "Content is too short."),

  categoryId: z.string().optional(),

  image: z.string().optional(),

  video: z.string().optional(),

  featured: z.boolean().default(false),

  breaking: z.boolean().default(false),

  trending: z.boolean().default(false),

  hero: z.boolean().default(false),

  editorsPick: z.boolean().default(false),

  status: z.nativeEnum(PostStatus),
});

export const SeoSchema = z.object({
  seoTitle: z
    .string()
    .max(MAX_SEO_TITLE)
    .optional()
    .or(z.literal("")),

  seoDescription: z
    .string()
    .max(MAX_SEO_DESCRIPTION)
    .optional()
    .or(z.literal("")),

  seoKeywords: z
    .string()
    .optional()
    .or(z.literal("")),

  canonicalUrl: z
    .string()
    .url()
    .optional()
    .or(z.literal("")),

  focusKeyword: z
    .string()
    .optional()
    .or(z.literal("")),
});

export const LocationSchema = z.object({
  stateId: z.string().optional(),

  districtId: z.string().optional(),

  talukaId: z.string().optional(),

  village: z.string().optional(),
});

export const AssignmentSchema = z.object({
  assignedReporterId: z.string().optional(),

  assignedEditorId: z.string().optional(),
});

export const CreateNewsSchema =
  NewsSchema
    .merge(SeoSchema)
    .merge(LocationSchema)
    .merge(AssignmentSchema);

    export const UpdateNewsSchema =
  CreateNewsSchema.extend({
    id: z.string().cuid(),
  });

  export type CreateNewsValues =
  z.infer<typeof CreateNewsSchema>;

export type UpdateNewsValues =
  z.infer<typeof UpdateNewsSchema>;

  export function validateCreateNews(
  values: unknown
) {
  return CreateNewsSchema.parse(values);
}

export function validateUpdateNews(
  values: unknown
) {
  return UpdateNewsSchema.parse(values);
}

