export interface AdvertisementFormData {
  title: string;
  slug: string;

  image?: string;

  htmlCode?: string;

  targetUrl?: string;

  position: string;

  device: string;

  priority: number;

  active: boolean;

  startDate?: Date;

  endDate?: Date;
}