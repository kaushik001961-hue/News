export function generateSlug(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/\s+/g, "-");
}

export function stringToTags(tags: string) {
  return tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function calculateReadingTime(text: string) {
  const words = text.trim().split(/\s+/).length;

  return Math.max(1, Math.ceil(words / 200));
}

export function calculateWordCount(text: string) {
  return text.trim().split(/\s+/).length;
}