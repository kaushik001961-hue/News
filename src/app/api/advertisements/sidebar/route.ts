import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { AdDevice } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const now = new Date();

    const devices: AdDevice[] = [
      AdDevice.ALL,
      AdDevice.DESKTOP,
    ];

    const [leftAdvertisement, rightAdvertisement] =
      await Promise.all([
        prisma.advertisement.findFirst({
          where: {
            position: "SIDEBAR_TOP_LEFT",
            active: true,

            device: {
              in: devices,
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

          select: {
            id: true,
            title: true,
            image: true,
            htmlCode: true,
            targetUrl: true,
          },
        }),

        prisma.advertisement.findFirst({
          where: {
            position: "SIDEBAR_TOP_RIGHT",
            active: true,

            device: {
              in: devices,
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

          select: {
            id: true,
            title: true,
            image: true,
            htmlCode: true,
            targetUrl: true,
          },
        }),
      ]);

    console.log(
      "======================================"
    );

    console.log(
      "SIDEBAR ADVERTISEMENT API"
    );

    console.log(
      "LEFT:",
      leftAdvertisement?.id ?? "NONE"
    );

    console.log(
      "RIGHT:",
      rightAdvertisement?.id ?? "NONE"
    );

    console.log(
      "======================================"
    );

    return NextResponse.json(
      {
        left: leftAdvertisement ?? null,
        right: rightAdvertisement ?? null,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "Sidebar advertisement API error:",
      error
    );

    return NextResponse.json(
      {
        left: null,
        right: null,
        error:
          "Failed to load advertisements.",
      },
      {
        status: 500,
      }
    );
  }
}