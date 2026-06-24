import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET SINGLE STATE
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const state = await prisma.state.findUnique({
      where: {
        id: id,
      },
    });

    if (!state) {
      return NextResponse.json(
        {
          error: "State not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(state);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to fetch state",
      },
      {
        status: 500,
      }
    );
  }
}

// UPDATE STATE
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Fixed: Await params to extract the id safely
    const { id } = await params;
    const body = await req.json();

    const state = await prisma.state.update({
      where: {
        id: id,
      },
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
        error: "Failed to update state",
      },
      {
        status: 500,
      }
    );
  }
}

// DELETE STATE
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Fixed: Await params to extract the id safely
    const { id } = await params;

    await prisma.state.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({
      success: true,
      message: "State deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to delete state",
      },
      {
        status: 500,
      }
    );
  }
}