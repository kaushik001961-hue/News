import { prisma } from "@/lib/prisma";

export default async function EditTagPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tag = await prisma.tag.findUnique({
    where: { id },
  });

  return (
    <div>
      <h1>Edit Tag</h1>
      <pre>{JSON.stringify(tag, null, 2)}</pre>
    </div>
  );
}