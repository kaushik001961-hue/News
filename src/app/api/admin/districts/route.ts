import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL DISTRICTS

export async function GET() {

  try {

    const districts = await prisma.district.findMany({

      include: {

        state: true,

      },

      orderBy: {

        name: "asc",

      },

    });

    return NextResponse.json(districts);

  } catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        error: "Failed to fetch districts",

      },

      {

        status: 500,

      }

    );

  }

}

// CREATE DISTRICT

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const exists = await prisma.district.findFirst({

      where: {

        slug: body.slug,

      },

    });

    if (exists) {

      return NextResponse.json(

        {

          error: "District already exists",

        },

        {

          status: 400,

        }

      );

    }

    const district = await prisma.district.create({

      data: {

        name: body.name,

        slug: body.slug,

        stateId: body.stateId,

      },

    });

    return NextResponse.json(district);

  } catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        error: "Failed to create district",

      },

      {

        status: 500,

      }

    );

  }

}
