import { prisma } from "@/lib/prisma";

type AdPosition =
  | "SIDEBAR_TOP_LEFT"
  | "SIDEBAR_TOP_RIGHT"
  | "POPUP";

interface PublicAdvertisementProps {
  position: AdPosition;
  className?: string;
}

export default async function PublicAdvertisement({
  position,
  className = "",
}: PublicAdvertisementProps) {
  const now = new Date();

  const advertisements =
    await prisma.advertisement.findMany({
      where: {
        position,
        active: true,

        AND: [
          {
            OR: [
              {
                startDate: null,
              },
              {
                startDate: {
                  lte: now,
                },
              },
            ],
          },
          {
            OR: [
              {
                endDate: null,
              },
              {
                endDate: {
                  gte: now,
                },
              },
            ],
          },
        ],
      },

      orderBy: [
        {
          priority: "desc",
        },
        {
          createdAt: "desc",
        },
      ],

      take: 1,
    });

  const advertisement =
    advertisements[0];

  if (!advertisement) {
    return null;
  }

  return (
    <div
      className={`w-full ${className}`}
      data-ad-position={position}
    >
      {advertisement.htmlCode ? (
        <div
          className="w-full overflow-hidden"
          dangerouslySetInnerHTML={{
            __html:
              advertisement.htmlCode,
          }}
        />
      ) : advertisement.image ? (
        <a
          href={
            advertisement.targetUrl ||
            "#"
          }
          target={
            advertisement.targetUrl
              ? "_blank"
              : undefined
          }
          rel={
            advertisement.targetUrl
              ? "noopener noreferrer sponsored"
              : undefined
          }
          className="block w-full"
        >
          <img
            src={advertisement.image}
            alt={advertisement.title}
            className="mx-auto h-auto max-h-[300px] w-full object-contain"
          />
        </a>
      ) : null}
    </div>
  );
}