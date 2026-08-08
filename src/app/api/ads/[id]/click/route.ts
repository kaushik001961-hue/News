import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  const { id } = await params;

  const ad = await prisma.advertisement.findUnique({
    where: {
      id,
    },
  });

  if (!ad) {
    return Response.json(
      { error: "Not found" },
      { status: 404 }
    );
  }

  await prisma.adClick.create({
    data: {
      advertisementId: ad.id,
    },
  });

  await prisma.advertisement.update({
    where: {
      id: ad.id,
    },
    data: {
      clicks: {
        increment: 1,
      },
    },
  });

  redirect(ad.targetUrl || "/");
}
