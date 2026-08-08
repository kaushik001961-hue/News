"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

import { logReporterActivity } from "@/lib/reporterActivity";

// =====================================================
// REGISTER REPORTER
// =====================================================

export async function registerReporter(data: any) {
  try {
    // Generate a unique application number to satisfy Prisma schema requirements
    const generatedAppNo = `APP-${Date.now()}`;

    const reporter = await prisma.reporter.create({
      data: {
        applicationNo: data.applicationNo || generatedAppNo,
        firstName: data.firstName,
        middleName: data.middleName || null,
        lastName: data.lastName,
        gender: data.gender || null,
        dob: data.dob ? new Date(data.dob) : null,
        email: data.email,
        phone: data.phone,
        district: data.district || null,
        state: data.state || null,
        status: "PENDING" as any,
        photo: data.photo || null,
        college: data.college || null,
        university: data.university || null,
        passingYear: data.passingYear || null,
        languages: data.languages || null,
        designation: data.designation || null,
        experience: data.experience ? Number(data.experience) : null,
        currentOrganization: data.currentOrganization || null,
        previousOrganization: data.previousOrganization || null,
        beat: data.beat || null,
        coverageArea: data.coverageArea || null,
        facebook: data.facebook || null,
        instagram: data.instagram || null,
        twitter: data.twitter || null,
        linkedin: data.linkedin || null,
        youtube: data.youtube || null,
        website: data.website || null,
        emergencyName: data.emergencyName || null,
        emergencyRelation: data.emergencyRelation || null,
        emergencyPhone: data.emergencyPhone || null,
      },
    });

    try {
      await logReporterActivity({
        reporterId: reporter.id,
        action: "REGISTERED" as any,
        title: "Reporter Registered",
        description: "New reporter application submitted.",
        performedBy: "System",
      });
    } catch (logErr) {
      console.warn("Activity log skipped:", logErr);
    }

    revalidatePath("/admin/reporters");

    return {
      success: true,
      message: "Reporter registered successfully!",
      reporterId: reporter.id,
    };
  } catch (error: any) {
    console.error("Error registering reporter:", error);
    return {
      success: false,
      message: error.message || "Failed to register reporter.",
    };
  }
}

// =====================================================
// UPDATE REPORTER
// =====================================================

export async function updateReporter(
  id: string,
  data: Record<string, unknown>
) {
  await prisma.reporter.update({
    where: { id },
    data,
  });

  try {
    await logReporterActivity({
      reporterId: id,
      action: "PROFILE_UPDATED" as any,
      title: "Profile Updated",
      description: "Reporter profile updated.",
      performedBy: "Admin",
    });
  } catch (err) {
    console.warn("Activity log skipped:", err);
  }

  revalidatePath("/admin/reporters");
  revalidatePath(`/admin/reporters/${id}`);
  revalidatePath(`/admin/reporters/${id}/edit`);
}

// =====================================================
// APPROVE
// =====================================================

export async function approveReporter(id: string) {
  await prisma.reporter.update({
    where: { id },
    data: {
      status: "APPROVED" as any,
      active: true,
      verified: true,
      approvedAt: new Date(),
    },
  });

  try {
    await logReporterActivity({
      reporterId: id,
      action: "APPROVED" as any,
      title: "Reporter Approved",
      description: "Reporter application approved.",
      performedBy: "Admin",
    });
  } catch (err) {
    console.warn("Activity log skipped:", err);
  }

  revalidatePath("/admin/reporters");
}

// =====================================================
// REJECT
// =====================================================

export async function rejectReporter(
  id: string,
  reason: string
) {
  await prisma.reporter.update({
    where: { id },
    data: {
      status: "REJECTED" as any,
      remarks: reason,
      rejectedAt: new Date(),
      active: false,
    },
  });

  try {
    await logReporterActivity({
      reporterId: id,
      action: "REJECTED" as any,
      title: "Application Rejected",
      description: reason,
      performedBy: "Admin",
    });
  } catch (err) {
    console.warn("Activity log skipped:", err);
  }

  revalidatePath("/admin/reporters");
}

// =====================================================
// BLOCK / SUSPEND
// =====================================================

export async function suspendReporter(id: string) {
  await prisma.reporter.update({
    where: { id },
    data: {
      status: "SUSPENDED" as any,
      active: false,
      blockedAt: new Date(),
    },
  });

  try {
    await logReporterActivity({
      reporterId: id,
      action: "BLOCKED" as any,
      title: "Reporter Suspended",
      description: "Reporter account suspended.",
      performedBy: "Admin",
    });
  } catch (err) {
    console.warn("Activity log skipped:", err);
  }

  revalidatePath("/admin/reporters");
}

// =====================================================
// DELETE
// =====================================================

export async function deleteReporter(id: string) {
  await prisma.reporter.delete({
    where: { id },
  });

  revalidatePath("/admin/reporters");
}