import { prisma } from "@/lib/prisma";
import AdsTable from "@/components/ads/AdsTable";

export default async function AdsPage() {
  const ads = await prisma.advertisement.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Advertisement Management
      </h1>

      <AdsTable ads={ads} />
    </div>
  );
}