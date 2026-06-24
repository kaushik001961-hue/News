
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL CATEGORIES

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return NextResponse.json(categories);

  } catch (error) {

    return NextResponse.json(
      {
        error: "Failed to fetch categories",
      },
      {
        status: 500,
      }
    );

  }
}

// CREATE CATEGORY

export async function POST(req: Request) {

  try {

    const body = await req.json();

    const category =
      await prisma.category.create({

        data: {

          name: body.name,

          slug: body.slug,

        },

      });

    return NextResponse.json(category);

  } catch (error) {

    return NextResponse.json(

      {
        error: "Failed to create category",
      },

      {
        status: 500,
      }

    );

  }

}
