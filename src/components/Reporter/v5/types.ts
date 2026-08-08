export interface ReporterCardData {
  reporterId: string;

  firstName: string;
  middleName?: string;
  lastName: string;

  designation?: string;

  phone: string;
  email: string;

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

  issueDate?: string;
  expiryDate?: string;

  authority?: string;
}

export interface CardSideProps {
  reporter: ReporterCardData;
}