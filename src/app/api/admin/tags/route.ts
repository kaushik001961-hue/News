
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL TAGS

export async function GET() {
  try {

    const tags = await prisma.tag.findMany({

      orderBy: {
        name: "asc",
      },

    });

    return NextResponse.json(tags);

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to fetch tags",
      },
      {
        status: 500,
      }
    );

  }
}

// CREATE TAG

export async function POST(req: Request) {

  try {

    const body = await req.json();

    // Check duplicate

    const exists = await prisma.tag.findFirst({

      where: {
        slug: body.slug,
      },

    });

    if (exists) {

      return NextResponse.json(

        {
          error: "Tag already exists",
        },

        {
          status: 400,
        }

      );

    }

    const tag = await prisma.tag.create({

      data: {

        name: body.name,

        slug: body.slug,

      },

    });

    return NextResponse.json(tag);

  } catch (error) {

    console.error(error);

    return NextResponse.json(

      {
        error: "Failed to create tag",
      },

      {
        status: 500,
      }

    );

  }

}
