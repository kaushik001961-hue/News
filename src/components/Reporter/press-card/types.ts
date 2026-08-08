export interface PressCardData {
  id: string;
  reporterId: string;
  cardNumber: string;

  firstName: string;
  middleName?: string;
  lastName: string;

  designation: string;

  photo: string;

  email: string;
  phone: string;

  address: string;
  city: string;
  state: string;

  bloodGroup?: string;

  issueDate: Date | string;
  expiryDate: Date | string;

  qrCode: string;

  active: boolean;

  companyName: string;
  companyLogo: string;
}