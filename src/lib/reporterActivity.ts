import { prisma } from "@/lib/prisma";
import { ReporterActivityType } from "@prisma/client";

interface LogReporterActivityParams {
  reporterId: string;
  action: ReporterActivityType;
  title: string;
  description?: string;
  performedBy?: string;
  remarks?: string;
}

export async function logReporterActivity({
  reporterId,
  action,
  title,
  description,
  performedBy,
  remarks,
}: LogReporterActivityParams) {
  try {
    console.log("========== REPORTER ACTIVITY ==========");
    console.log("Reporter ID:", reporterId);
    console.log("Action:", action);
    console.log("Title:", title);

    const activity = await prisma.reporterActivity.create({
      data: {
        reporterId,
        action,
        title,
        description,
        performedBy,
        remarks,
      },
    });

    console.log("Activity Created:", activity.id);

    return activity;
  } catch (error) {
    console.error("Reporter Activity Error");
    console.error(error);
    throw error;
  }
}