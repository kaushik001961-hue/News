/**
 * Returns a safe image path for next/image.
 */
export function getImagePath(
  path?: string | null,
  fallback = "/uploads/photo-placeholder.jpg"
): string {
  if (!path) return fallback;

  // Absolute URL
  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  // Already starts with '/'
  if (path.startsWith("/")) {
    return path;
  }

  // Local upload
  return `/${path}`;
}

/**
 * Returns a safe file/document URL.
 */
export function getFilePath(
  path?: string | null,
  fallback = "#"
): string {
  if (!path) return fallback;

  if (
    path.startsWith("http://") ||
    path.startsWith("https://")
  ) {
    return path;
  }

  return path.startsWith("/") ? path : `/${path}`;
}