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
  taluka: string;
  state: string;
  pincode: string;

  // ========================
  // Identity
  // ========================

  aadhaarNumber: string;
  panNumber: string;
  voterId: string;
  drivingLicense: boolean;
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
  hasVehicle: boolean;
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

  linkedin: string;
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

// ========================================================
// DEFAULT REPORTER FORM
// ========================================================

export const defaultReporterForm: ReporterFormData = {
  // ========================
  // Personal
  // ========================

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

  // ========================
  // Contact
  // ========================

  email: "",
  phone: "",
  whatsapp: "",
  alternatePhone: "",

  // ========================
  // Address
  // ========================

  address: "",
  city: "",
  district: "",
  taluka: "",
  state: "",
  pincode: "",

  // ========================
  // Identity
  // ========================

  aadhaarNumber: "",
  panNumber: "",
  voterId: "",
  drivingLicense: false,
  passportNumber: "",

  // ========================
  // Education
  // ========================

  qualification: "",
  institute: "",
  passingYear: "",
  journalismDegree: false,

  // ========================
  // Experience
  // ========================

  experienceYears: 0,
  previousOrganization: "",
  designation: "",
  achievements: "",

  // ========================
  // Reporter
  // ========================

  reporterType: "DISTRICT_REPORTER",
  beat: "GENERAL",
  bureau: "",
  coverageArea: "",
  preferredLanguage: "Gujarati",
  workingShift: "FULL_TIME",

  // ========================
  // Equipment
  // ========================

  hasCamera: false,
  hasLaptop: false,
  hasVehicle: false,
  hasBike: false,
  hasCar: false,
  hasSmartphone: true,
  internetConnection: true,

  // ========================
  // Bank
  // ========================

  accountHolderName: "",
  accountNumber: "",
  bankName: "",
  ifsc: "",
  upiId: "",

  // ========================
  // Emergency
  // ========================

  emergencyName: "",
  emergencyPhone: "",
  emergencyRelation: "",

  // ========================
  // Social Media
  // ========================

  linkedin: "",
  facebook: "",
  instagram: "",
  twitter: "",
  youtube: "",
  website: "",

  // ========================
  // Documents
  // ========================

  aadhaarFile: null,
  panFile: null,
  photoFile: null,
  resumeFile: null,
  policeVerification: null,
  qualificationCertificate: null,

  // ========================
  // Declaration
  // ========================

  acceptedTerms: false,
  declaration: false,
};