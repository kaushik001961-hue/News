export function slugify(
  text: string
) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function readingTime(
  html: string
) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words =
    text.length === 0
      ? 0
      : text.split(" ").length;

  return Math.max(
    1,
    Math.ceil(words / 200)
  );
}

export function wordCount(
  html: string
) {
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return text.length === 0
    ? 0
    : text.split(" ").length;
}

export function generateExcerpt(
  html: string,
  max = 180
) {
  const text = html
    .replace(/<[^>]+>/g, "")
    .trim();

  if (text.length <= max)
    return text;

  return (
    text.substring(0, max) + "..."
  );
}

export function formatViews(
  views: number
) {
  return new Intl.NumberFormat().format(
    views
  );
}