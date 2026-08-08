import { Role, PostStatus } from "@prisma/client";

import {
  CreateNewsInput,
  UpdateNewsInput,
} from "./mutations";

export interface WorkflowResult {
  status: PostStatus;

  approvedById?: string;

  reviewedById?: string;

  assignedReporterId?: string;

  assignedEditorId?: string;

  reviewedAt?: Date | null;

  submittedAt?: Date | null;

  publishedAt?: Date | null;
}

export function buildReporterWorkflow(
  userId: string
): WorkflowResult {
  return {
    status: "PENDING",

    submittedAt: new Date(),
  };
}

export function buildEditorWorkflow(
  status: PostStatus,
  editorId: string,
  assignedReporterId?: string
): WorkflowResult {
  return {
    status,

    assignedReporterId,

    assignedEditorId: editorId,

    reviewedById: editorId,

    reviewedAt: new Date(),

    publishedAt:
      status === "PUBLISHED"
        ? new Date()
        : null,
  };
}

export function buildAdminWorkflow(
  status: PostStatus,
  adminId: string,
  assignedReporterId?: string,
  assignedEditorId?: string
): WorkflowResult {
  return {
    status,

    approvedById: adminId,

    assignedReporterId,

    assignedEditorId,

    publishedAt:
      status === "PUBLISHED"
        ? new Date()
        : null,
  };
}

export function buildWorkflow(
  role: Role,

  status: PostStatus,

  userId: string,

  assignedReporterId?: string,

  assignedEditorId?: string
): WorkflowResult {
  switch (role) {
    case "REPORTER":
      return buildReporterWorkflow(
        userId
      );

    case "EDITOR":
      return buildEditorWorkflow(
        status,
        userId,
        assignedReporterId
      );

    case "ADMIN":
      return buildAdminWorkflow(
        status,
        userId,
        assignedReporterId,
        assignedEditorId
      );

    default:
      return {
        status: "DRAFT",
      };
  }
}

export function isPublished(
  status: PostStatus
) {
  return status === "PUBLISHED";
}

export function isDraft(
  status: PostStatus
) {
  return status === "DRAFT";
}

export function isPending(
  status: PostStatus
) {
  return status === "PENDING";
}

export function isRejected(
  status: PostStatus
) {
  return status === "REJECTED";
}

export function isArchived(
  status: PostStatus
) {
  return status === "ARCHIVED";
}

