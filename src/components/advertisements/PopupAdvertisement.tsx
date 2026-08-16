import { prisma } from "@/lib/prisma";

import PopupAdvertisementClient from "./PopupAdvertisementClient";

/* =========================================================
   POPUP ADVERTISEMENT SERVER COMPONENT

   Fetches the currently active POPUP advertisement
   from Prisma.

   Animation and session handling are performed by
   PopupAdvertisementClient.
========================================================= */

export default async function PopupAdvertisement() {
  const now = new Date();

  const advertisement =
    await prisma.advertisement.findFirst({
      where: {
        active: true,

        position: "POPUP",

        device: {
          in: [
            "ALL",
            "DESKTOP",
          ],
        },

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
    });

  if (!advertisement) {
    return null;
  }

  return (
    <PopupAdvertisementClient
      id={advertisement.id}
      title={advertisement.title}
      image={advertisement.image}
      htmlCode={advertisement.htmlCode}
      targetUrl={advertisement.targetUrl}
    />
  );
}