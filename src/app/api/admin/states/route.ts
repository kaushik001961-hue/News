import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL STATES

export async function GET() {

  try {

    const states = await prisma.state.findMany({

      orderBy: {

        name: "asc",

      },

    });

    return NextResponse.json(states);

  } catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        error: "Failed to fetch states",

      },

      {

        status: 500,

      }

    );

  }

}

// CREATE STATE

export async function POST(req: Request) {

  try {

    const body = await req.json();

    // Check duplicate

    const exists = await prisma.state.findFirst({

      where: {

        slug: body.slug,

      },

    });

    if (exists) {

      return NextResponse.json(

        {

          error: "State already exists",

        },

        {

          status: 400,

        }

      );

    }

    const state = await prisma.state.create({

      data: {

        name: body.name,

        slug: body.slug,

      },

    });

    return NextResponse.json(state);

  } catch (error) {

    console.error(error);

    return NextResponse.json(

      {

        error: "Failed to create state",

      },

      {

        status: 500,

      }

    );

  }

}
