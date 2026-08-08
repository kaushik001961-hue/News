export interface Category {
  id: string;
  name: string;
}

export interface ReporterNewsFormProps {
  mode: "create" | "edit";
  initialData?: any;
}

export interface NewsFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;

  categoryId: string;
  tags: string;

  featuredImage: string;

  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string;

  state?: string;
  district?: string;
  taluka?: string;
}

export type SubmitType = "draft" | "review";