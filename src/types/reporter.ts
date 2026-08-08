export type ReporterStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "SUSPENDED";

export type ReporterType =
  | "STAFF_REPORTER"
  | "DISTRICT_REPORTER"
  | "TALUKA_REPORTER"
  | "CITY_REPORTER"
  | "STATE_REPORTER"
  | "NATIONAL_REPORTER"
  | "FREELANCER"
  | "PHOTOJOURNALIST"
  | "VIDEO_JOURNALIST";

export type BeatType =
  | "POLITICS"
  | "CRIME"
  | "EDUCATION"
  | "HEALTH"
  | "BUSINESS"
  | "SPORTS"
  | "ENTERTAINMENT"
  | "TECHNOLOGY"
  | "AGRICULTURE"
  | "COURT"
  | "CIVIC"
  | "RELIGION"
  | "ENVIRONMENT"
  | "GENERAL";

export interface ReporterFormData {
  // ========================
  // Personal
  // ========================

  photo?: string;

  firstName: string;
  middleName: string;
  lastName: string;

  fatherName: string;
  motherName: string;

  gender: string;
  dob: string;

  maritalStatus: string;
  bloodGroup: string;

  // ========================
  // Contact
  // ========================

  email: string;

  phone: string;

  whatsapp: string;

  alternatePhone: string;

  // ========================
  // Address
  // ========================

  address: string;

  city: string;

  district: string;

  state: string;

  pincode: string;

  // ========================
  // Identity
  // ========================

  aadhaarNumber: string;

  panNumber: string;

  voterId: string;

  drivingLicense: string;

  passportNumber: string;

  // ========================
  // Education
  // ========================

  qualification: string;

  institute: string;

  passingYear: string;

  journalismDegree: boolean;

  // ========================
  // Experience
  // ========================

  experienceYears: number;

  previousOrganization: string;

  designation: string;

  achievements: string;

  // ========================
  // Reporter
  // ========================

  reporterType: ReporterType;

  beat: BeatType;

  bureau: string;

  coverageArea: string;

  preferredLanguage: string;

  workingShift: string;

  // ========================
  // Equipment
  // ========================

  hasCamera: boolean;

  hasLaptop: boolean;

  hasBike: boolean;

  hasCar: boolean;

  hasSmartphone: boolean;

  internetConnection: boolean;

  // ========================
  // Bank
  // ========================

  accountHolderName: string;

  accountNumber: string;

  bankName: string;

  ifsc: string;

  upiId: string;

  // ========================
  // Emergency
  // ========================

  emergencyName: string;

  emergencyPhone: string;

  emergencyRelation: string;

  // ========================
  // Social Media
  // ========================

  facebook: string;

  instagram: string;

  twitter: string;

  youtube: string;

  website: string;

  // ========================
  // Documents
  // ========================

  aadhaarFile?: File | null;

  panFile?: File | null;

  photoFile?: File | null;

  resumeFile?: File | null;

  policeVerification?: File | null;

  qualificationCertificate?: File | null;

  // ========================
  // Declaration
  // ========================

  acceptedTerms: boolean;

  declaration: boolean;
}

export const defaultReporterForm: ReporterFormData = {
  photo: "",

  firstName: "",
  middleName: "",
  lastName: "",

  fatherName: "",
  motherName: "",

  gender: "",
  dob: "",

  maritalStatus: "",
  bloodGroup: "",

  email: "",
  phone: "",
  whatsapp: "",
  alternatePhone: "",

  address: "",
  city: "",
  district: "",
  state: "",
  pincode: "",

  aadhaarNumber: "",
  panNumber: "",
  voterId: "",
  drivingLicense: "",
  passportNumber: "",

  qualification: "",
  institute: "",
  passingYear: "",

  journalismDegree: false,

  experienceYears: 0,
  previousOrganization: "",
  designation: "",
  achievements: "",

  reporterType: "DISTRICT_REPORTER",

  beat: "GENERAL",

  bureau: "",

  coverageArea: "",

  preferredLanguage: "Gujarati",

  workingShift: "FULL_TIME",

  hasCamera: false,
  hasLaptop: false,
  hasBike: false,
  hasCar: false,
  hasSmartphone: true,
  internetConnection: true,

  accountHolderName: "",
  accountNumber: "",
  bankName: "",
  ifsc: "",
  upiId: "",

  emergencyName: "",
  emergencyPhone: "",
  emergencyRelation: "",

  facebook: "",
  instagram: "",
  twitter: "",
  youtube: "",
  website: "",

  aadhaarFile: null,
  panFile: null,
  photoFile: null,
  resumeFile: null,
  policeVerification: null,
  qualificationCertificate: null,

  acceptedTerms: false,
  declaration: false,
};