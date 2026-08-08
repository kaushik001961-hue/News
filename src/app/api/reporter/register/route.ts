import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

import {
  Gender,
  ReporterStatus,
  ReporterActivityType,
  Role,
  UserStatus,
} from "@prisma/client";

import { logReporterActivity } from "@/lib/reporterActivity";

async function generateApplicationNo() {
  const last = await prisma.reporter.findFirst({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      applicationNo: true,
    },
  });

  if (!last?.applicationNo) {
    return "AGS-APP-000001";
  }

  const match = last.applicationNo.match(/\d+$/);

  const next = match ? Number(match[0]) + 1 : 1;

  return `AGS-APP-${next.toString().padStart(6, "0")}`;
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    // ===================================================
    // Required Fields
    // ===================================================

    const firstName = String(form.get("firstName") ?? "").trim();
    const middleName = String(form.get("middleName") ?? "").trim();
    const lastName = String(form.get("lastName") ?? "").trim();

    const email = String(form.get("email") ?? "")
      .trim()
      .toLowerCase();

    const phone = String(form.get("phone") ?? "").trim();

    const password = String(form.get("password") ?? "");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    // ===================================================
    // Duplicate Check
    // ===================================================

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            phone,
          },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User already exists with this email or phone.",
        },
        {
          status: 400,
        }
      );
    }

    const existingReporter =
      await prisma.reporter.findFirst({
        where: {
          OR: [
            {
              email,
            },
            {
              phone,
            },
          ],
        },
      });

    if (existingReporter) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Reporter already registered with this email or phone.",
        },
        {
          status: 400,
        }
      );
    }

    // ===================================================
    // Generate Application Number
    // ===================================================

    const applicationNo =
      await generateApplicationNo();

    // ===================================================
    // Password Hash
    // ===================================================

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // ===================================================
    // Enum Mapping
    // ===================================================

    const bloodGroupMap: Record<
      string,
      | "A_POSITIVE"
      | "A_NEGATIVE"
      | "B_POSITIVE"
      | "B_NEGATIVE"
      | "AB_POSITIVE"
      | "AB_NEGATIVE"
      | "O_POSITIVE"
      | "O_NEGATIVE"
    > = {
      "A+": "A_POSITIVE",
      "A-": "A_NEGATIVE",
      "B+": "B_POSITIVE",
      "B-": "B_NEGATIVE",
      "AB+": "AB_POSITIVE",
      "AB-": "AB_NEGATIVE",
      "O+": "O_POSITIVE",
      "O-": "O_NEGATIVE",
    };

    const bloodGroupValue =
      bloodGroupMap[
        String(form.get("bloodGroup") || "")
      ] ?? null;

    const maritalStatusMap: Record<
      string,
      "SINGLE" | "MARRIED" | "DIVORCED" | "WIDOWED"
    > = {
      Single: "SINGLE",
      Married: "MARRIED",
      Divorced: "DIVORCED",
      Widowed: "WIDOWED",
    };

    const maritalStatusValue =
      maritalStatusMap[
        String(form.get("maritalStatus") || "")
      ] ?? null;

    const genderValue = String(
      form.get("gender") || ""
    ).toUpperCase();

    // ===================================================
    // Transaction Starts Here
    // ===================================================

    const result = await prisma.$transaction(
      async (tx) => {
        // Create User first

        const user = await tx.user.create({
          data: {
            name: `${firstName} ${lastName}`,
            email,
            phone,
            password: hashedPassword,
            role: Role.REPORTER,
            status: UserStatus.ACTIVE,
          },
        });

        // ===================================================
        // Create Reporter
        // ===================================================

        const reporter = await tx.reporter.create({
          data: {
            // Link Reporter with User
            userId: user.id,

            applicationNo,

            status: ReporterStatus.PENDING,

            // ==========================================
            // Personal
            // ==========================================

            firstName,
            middleName: middleName || null,
            lastName,

            gender: genderValue ? (genderValue as Gender) : null,

            dob: form.get("dob")
              ? new Date(String(form.get("dob")))
              : null,

            bloodGroup: bloodGroupValue,

            maritalStatus: maritalStatusValue,

            nationality: String(
              form.get("nationality") || "Indian"
            ),

            // ==========================================
            // Contact
            // ==========================================

            email,
            phone,

            alternatePhone: String(
              form.get("alternatePhone") || ""
            ),

            whatsapp: String(
              form.get("whatsapp") || ""
            ),

            // ==========================================
            // Address
            // ==========================================

            address: String(form.get("address") || ""),
            village: String(form.get("village") || ""),
            taluka: String(form.get("taluka") || ""),
            district: String(form.get("district") || ""),
            state: String(form.get("state") || ""),
            pincode: String(form.get("pincode") || ""),

            // ==========================================
            // Education
            // ==========================================

            qualification: String(
              form.get("qualification") || ""
            ),

            journalismDegree:
              form.get("journalismDegree") === "true",

            college: String(form.get("college") || ""),
            university: String(form.get("university") || ""),

            passingYear: form.get("passingYear")
              ? Number(form.get("passingYear"))
              : null,

            languages: String(
              form.get("languages") || ""
            ),

            // ==========================================
            // Professional
            // ==========================================

            designation: String(
              form.get("designation") || ""
            ),

            experience: form.get("experience")
              ? Number(form.get("experience"))
              : null,

            currentOrganization: String(
              form.get("currentOrganization") || ""
            ),

            previousOrganization: String(
              form.get("previousOrganization") || ""
            ),

            beat: String(form.get("beat") || ""),

            coverageArea: String(
              form.get("coverageArea") || ""
            ),

            // ==========================================
            // Equipment
            // ==========================================

            hasCamera:
              form.get("hasCamera") === "true",

            hasLaptop:
              form.get("hasLaptop") === "true",

            hasVehicle:
              form.get("hasVehicle") === "true",

            drivingLicense:
              form.get("drivingLicense") === "true",

            // ==========================================
            // Social
            // ==========================================

            facebook: String(form.get("facebook") || ""),
            instagram: String(form.get("instagram") || ""),
            twitter: String(form.get("twitter") || ""),
            linkedin: String(form.get("linkedin") || ""),
            youtube: String(form.get("youtube") || ""),
            website: String(form.get("website") || ""),

            // ==========================================
            // Identity
            // ==========================================

            aadhaarNumber: String(
              form.get("aadhaarNumber") || ""
            ),

            panNumber: String(
              form.get("panNumber") || ""
            ),

            // ==========================================
            // Emergency
            // ==========================================

            emergencyName: String(
              form.get("emergencyName") || ""
            ),

            emergencyRelation: String(
              form.get("emergencyRelation") || ""
            ),

            emergencyPhone: String(
              form.get("emergencyPhone") || ""
            ),

            remarks: String(form.get("remarks") || ""),

            // ==========================================
            // Terms
            // ==========================================

            termsAccepted:
              form.get("termsAccepted") === "true",

            termsAcceptedAt:
              form.get("termsAccepted") === "true"
                ? new Date()
                : null,

            // ==========================================
            // Account
            // ==========================================

            verified: false,
            active: false,
          },
        });

        return {
          user,
          reporter,
        };
      }
    );

    // ==========================================
    // Activity Log
    // ==========================================

    await logReporterActivity({
      reporterId: result.reporter.id,
      action: ReporterActivityType.REGISTERED,
      title: "Registration Submitted",
      description:
        "Reporter registration application submitted successfully.",
      performedBy: `${result.reporter.firstName} ${result.reporter.lastName}`,
    });

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully.",
      applicationNo: result.reporter.applicationNo,
      reporterId: result.reporter.id,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Registration failed.",
      },
      {
        status: 500,
      }
    );
  }
}