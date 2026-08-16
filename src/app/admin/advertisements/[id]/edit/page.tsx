import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

import EditAdvertisementForm from "./EditAdvertisementForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditAdvertisementPage({
  params,
}: PageProps) {
  const { id } = await params;

  const advertisement =
    await prisma.advertisement.findUnique({
      where: {
        id,
      },
    });

  if (!advertisement) {
    notFound();
  }

  return (
    <EditAdvertisementForm
      advertisement={{
        id: advertisement.id,
        title: advertisement.title,
        slug: advertisement.slug,
        image: advertisement.image,
        htmlCode: advertisement.htmlCode,
        targetUrl: advertisement.targetUrl,
        position: advertisement.position,
        device: advertisement.device,
        priority: advertisement.priority,
        active: advertisement.active,
        startDate:
          advertisement.startDate?.toISOString() ??
          null,
        endDate:
          advertisement.endDate?.toISOString() ??
          null,
      }}
    />
  );
}