import { prisma } from "@/lib/prisma";
import AdTracker from "./AdTracker";

interface Props {
  position: string;
}

export default async function AdSlot({
  position,
}: Props) {
  const ad =
    await prisma.advertisement.findFirst({
      where: {
        position: position as any,
        active: true,
      },
      orderBy: {
        priority: "desc",
      },
    });

  if (!ad) return null;

  return (
    <div className="my-4">
      <AdTracker adId={ad.id} />

      <a
        href={`/api/ads/${ad.id}/click`}
        target="_blank"
        rel="noopener noreferrer"
      >
        {ad.image ? (
          <img
            src={ad.image}
            alt={ad.title}
            className="w-full rounded"
          />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: ad.htmlCode || "",
            }}
          />
        )}
      </a>
    </div>
  );
}