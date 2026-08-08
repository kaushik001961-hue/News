import { Role, PostStatus } from "@prisma/client";

export interface NewsPermission {
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  canPublish: boolean;
  canApprove: boolean;
  canReject: boolean;
  canArchive: boolean;
  canAssignReporter: boolean;
  canAssignEditor: boolean;
  canFeature: boolean;
  canBreaking: boolean;
  canEditorsPick: boolean;
}

const ADMIN_PERMISSIONS: NewsPermission = {
  canCreate: true,
  canEdit: true,
  canDelete: true,
  canPublish: true,
  canApprove: true,
  canReject: true,
  canArchive: true,
  canAssignReporter: true,
  canAssignEditor: true,
  canFeature: true,
  canBreaking: true,
  canEditorsPick: true,
};

const EDITOR_PERMISSIONS: NewsPermission = {
  canCreate: true,
  canEdit: true,
  canDelete: false,
  canPublish: true,
  canApprove: true,
  canReject: true,
  canArchive: true,
  canAssignReporter: true,
  canAssignEditor: false,
  canFeature: true,
  canBreaking: true,
  canEditorsPick: true,
};

const REPORTER_PERMISSIONS: NewsPermission = {
  canCreate: true,
  canEdit: true,
  canDelete: false,
  canPublish: false,
  canApprove: false,
  canReject: false,
  canArchive: false,
  canAssignReporter: false,
  canAssignEditor: false,
  canFeature: false,
  canBreaking: false,
  canEditorsPick: false,
};

export function getNewsPermissions(
  role: Role
): NewsPermission {
  switch (role) {
    case "ADMIN":
      return ADMIN_PERMISSIONS;

    case "EDITOR":
      return EDITOR_PERMISSIONS;

    case "REPORTER":
      return REPORTER_PERMISSIONS;

    default:
      return REPORTER_PERMISSIONS;
  }
}

export function canEditPost(
  role: Role,
  authorId: string,
  userId: string
) {
  if (role === "ADMIN") return true;

  if (role === "EDITOR") return true;

  return authorId === userId;
}

export function canDeletePost(
  role: Role
) {
  return role === "ADMIN";
}

export function canPublishPost(
  role: Role
) {
  return (
    role === "ADMIN" ||
    role === "EDITOR"
  );
}

export function canApprovePost(
  role: Role
) {
  return (
    role === "ADMIN" ||
    role === "EDITOR"
  );
}

export function canRejectPost(
  role: Role
) {
  return (
    role === "ADMIN" ||
    role === "EDITOR"
  );
}

export function canAssignReporter(
  role: Role
) {
  return (
    role === "ADMIN" ||
    role === "EDITOR"
  );
}

export function canAssignEditor(
  role: Role
) {
  return role === "ADMIN";
}

export function canArchivePost(
  role: Role
) {
  return (
    role === "ADMIN" ||
    role === "EDITOR"
  );
}

export function isEditableStatus(
  status: PostStatus
) {
  return (
    status === "DRAFT" ||
    status === "PENDING" ||
    status === "REJECTED"
  );
}

export function isPublished(
  status: PostStatus
) {
  return status === "PUBLISHED";
}

export function isArchived(
  status: PostStatus
) {
  return status === "ARCHIVED";
}