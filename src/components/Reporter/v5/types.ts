export interface ReporterCardData {
  reporterId: string;

  firstName: string;
  middleName?: string;
  lastName: string;

  designation?: string;

  phone: string;
  email: string;

  address?: string;
  city?: string;
  district: string;
  state: string;

  bloodGroup?: string;
  dob?: string;

  beat?: string;
  coverageArea?: string;

  qualification?: string;
  experience?: number | null;

  emergencyName?: string;
  emergencyPhone?: string;

  photo?: string;

  barcode?: string;
  qrCode?: string;

  issueDate?: string | Date;
  expiryDate?: string | Date;

  authority?: string;

  active?: boolean;
  companyName?: string;
  companyLogo?: string;
}

export interface CardSideProps {
  reporter: ReporterCardData;
}