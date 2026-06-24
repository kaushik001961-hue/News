import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Await the async params to safely extract the dynamic 'id'
    const { id } = await context.params;

    // 2. Perform the database operation using the resolved id
    const deletedDistrict = await prisma.district.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ success: true, deletedDistrict });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete district" },
      { status: 500 }
    );
  }
}

// Note: If you have GET or PUT handlers inside this same file, 
// make sure their function signatures also match the `context` format above!