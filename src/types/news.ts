export type NewsStatus =
  | "DRAFT"
  | "PENDING"
  | "PUBLISHED"
  | "REJECTED"
  | "ARCHIVED";

export interface NewsEditorValues {
  // ==========================================
  // Basic Information
  // ==========================================

  id?: string;

  title: string;
  slug: string;
  excerpt: string;
  content: string;

  // ==========================================
  // Category
  // ==========================================

  categoryId: string;

  // ==========================================
  // Location
  // ==========================================

  stateId?: string;
  districtId?: string;
  talukaId?: string;
  village?: string;

  // ==========================================
  // Media
  // ==========================================

  featuredImage?: string;
  gallery?: string[];
  video?: string;
  videoThumbnail?: string;

  // ==========================================
  // Homepage
  // ==========================================

  featured: boolean;
  breaking: boolean;
  trending: boolean;
  hero: boolean;
  editorsPick: boolean;

  // ==========================================
  // SEO
  // ==========================================

  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;
  canonicalUrl?: string;
  focusKeyword?: string;

  // ==========================================
  // Workflow
  // ==========================================

  status: NewsStatus;

  assignedReporterId?: string;
  assignedEditorId?: string;

  reviewComment?: string;
  rejectReason?: string;

  // ==========================================
  // Publishing
  // ==========================================

  publishedAt?: Date | null;

  // ==========================================
  // Statistics
  // ==========================================

  views?: number;
  likes?: number;
  shares?: number;
}

export interface CategoryOption {
  id: string;
  name: string;
}

export interface ReporterOption {
  id: string;
  name: string;
}

export interface StateOption {
  id: string;
  name: string;
}

export interface DistrictOption {
  id: string;
  name: string;
}

export interface TalukaOption {
  id: string;
  name: string;
}