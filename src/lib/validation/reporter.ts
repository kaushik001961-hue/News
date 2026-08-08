import { z } from "zod";

export const reporterRegistrationSchema = z
  .object({
    // ==========================
    // Personal
    // ==========================
    firstName: z.string().min(2, "First name is required"),
    middleName: z.string().optional(),
    lastName: z.string().min(2, "Last name is required"),

    gender: z.string().optional(),
    dob: z.string().optional(),
    bloodGroup: z.string().optional(),
    maritalStatus: z.string().optional(),
    nationality: z.string().default("Indian"),

    // ==========================
    // Contact
    // ==========================
    email: z.string().email("Invalid email address"),

    phone: z
      .string()
      .min(10, "Phone number must be at least 10 digits"),

    alternatePhone: z.string().optional(),
    whatsapp: z.string().optional(),

    // ==========================
    // Address
    // ==========================
    address: z.string().optional(),
    village: z.string().optional(),
    taluka: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    pincode: z.string().optional(),

    // ==========================
    // Education
    // ==========================
    qualification: z.string().optional(),
    journalismDegree: z.boolean().default(false),
    college: z.string().optional(),
    university: z.string().optional(),
    passingYear: z.coerce.number().optional(),
    languages: z.string().optional(),

    // ==========================
    // Journalism
    // ==========================
    designation: z.string().optional(),
    experience: z.coerce.number().optional(),
    currentOrganization: z.string().optional(),
    previousOrganization: z.string().optional(),
    beat: z.string().optional(),
    coverageArea: z.string().optional(),

    // ==========================
    // Equipment
    // ==========================
    hasCamera: z.boolean().default(false),
    hasLaptop: z.boolean().default(false),
    hasVehicle: z.boolean().default(false),
    drivingLicense: z.boolean().default(false),

    // ==========================
    // Social Media
    // ==========================
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
    website: z.string().optional(),

    // ==========================
    // Documents
    // ==========================
    photo: z.string().optional(),
    aadhaar: z.string().optional(),
    pan: z.string().optional(),
    resume: z.string().optional(),
    pressCard: z.string().optional(),

    aadhaarNumber: z.string().optional(),
    panNumber: z.string().optional(),

    // ==========================
    // Emergency
    // ==========================
    emergencyName: z.string().optional(),
    emergencyRelation: z.string().optional(),
    emergencyPhone: z.string().optional(),

    // ==========================
    // Remarks
    // ==========================
    remarks: z.string().optional(),

    // ==========================
    // Login Account
    // ==========================
    password: z
      .string()
      .min(8, "Password must be at least 8 characters"),

    confirmPassword: z.string(),

    // ==========================
    // Agreement
    // ==========================
    termsAccepted: z.boolean().refine((value) => value === true, {
      message: "You must accept the Terms & Conditions.",
    }),

    declaration: z.boolean().refine((value) => value === true, {
      message: "Declaration is required.",
    }),
  })
  .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match.",
      path: ["confirmPassword"],
    }
  );

export type ReporterRegistrationInput =
  z.infer<typeof reporterRegistrationSchema>;