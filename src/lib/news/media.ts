import path from "path";

/* ==========================================================
   Constants
========================================================== */

export const ALLOWED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/jpg",
];

export const ALLOWED_VIDEO_TYPES = [
  "video/mp4",
  "video/webm",
  "video/ogg",
];

export const MAX_IMAGE_SIZE =
  5 * 1024 * 1024;

export const MAX_VIDEO_SIZE =
  100 * 1024 * 1024;

/* ==========================================================
   Image Validation
========================================================== */

export function validateImage(file: File) {
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    throw new Error(
      "Only JPG, PNG and WEBP images are allowed."
    );
  }

  if (file.size > MAX_IMAGE_SIZE) {
    throw new Error(
      "Maximum image size is 5MB."
    );
  }

  return true;
}

/* ==========================================================
   Video Validation
========================================================== */

export function validateVideo(file: File) {
  if (!ALLOWED_VIDEO_TYPES.includes(file.type)) {
    throw new Error(
      "Unsupported video format."
    );
  }

  if (file.size > MAX_VIDEO_SIZE) {
    throw new Error(
      "Maximum video size is 100MB."
    );
  }

  return true;
}

/* ==========================================================
   File Extension
========================================================== */

export function getExtension(
  filename: string
) {
  return path
    .extname(filename)
    .toLowerCase();
}

/* ==========================================================
   File Name
========================================================== */

export function generateFilename(
  filename: string
) {
  const ext =
    getExtension(filename);

  return (
    Date.now() +
    "-" +
    Math.random()
      .toString(36)
      .substring(2, 8) +
    ext
  );
}

/* ==========================================================
   Placeholder
========================================================== */

export function placeholderImage() {
  return "/images/news-placeholder.jpg";
}

/* ==========================================================
   Thumbnail
========================================================== */

export function thumbnailUrl(
  image: string
) {
  if (!image)
    return placeholderImage();

  return image;
}

/* ==========================================================
   Image URL
========================================================== */

export function imageUrl(
  image?: string | null
) {
  if (!image)
    return placeholderImage();

  return image;
}

/* ==========================================================
   Is Cloudinary
========================================================== */

export function isCloudinary(
  url: string
) {
  return url.includes(
    "res.cloudinary.com"
  );
}

/* ==========================================================
   Optimize Cloudinary URL
========================================================== */

export function optimizeCloudinary(
  url: string,
  width = 1200
) {
  if (!isCloudinary(url))
    return url;

  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto,w_${width}/`
  );
}

/* ==========================================================
   Thumbnail Cloudinary
========================================================== */

export function cloudinaryThumb(
  url: string
) {
  return optimizeCloudinary(
    url,
    400
  );
}

/* ==========================================================
   Large Image
========================================================== */

export function cloudinaryLarge(
  url: string
) {
  return optimizeCloudinary(
    url,
    1400
  );
}

/* ==========================================================
   Hero Image
========================================================== */

export function heroImage(
  url: string
) {
  return optimizeCloudinary(
    url,
    1920
  );
}

/* ==========================================================
   Featured Image
========================================================== */

export function featuredImage(
  url: string
) {
  return optimizeCloudinary(
    url,
    900
  );
}

/* ==========================================================
   Gallery Image
========================================================== */

export function galleryImage(
  url: string
) {
  return optimizeCloudinary(
    url,
    600
  );
}

/* ==========================================================
   Download Image
========================================================== */

export async function downloadImage(
  url: string
) {
  const response =
    await fetch(url);

  return response.blob();
}