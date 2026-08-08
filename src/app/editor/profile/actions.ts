"use server";

import { auth } from "@/lib/auth"; // Adjust based on your NextAuth / auth setup
import { prisma } from "@/lib/prisma"; // Adjust based on your DB setup
import { revalidatePath } from "next/cache";

export async function updateEditorProfile(formData: {
  name: string;
  email: string;
  bio: string;
  twitter?: string;
  linkedin?: string;
}) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return { success: false, error: "Unauthorized" };
    }

    // Update user in Prisma (replace with your DB call if not using Prisma)
    await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: formData.name,
        email: formData.email,
        bio: formData.bio,
        twitter: formData.twitter,
        linkedin: formData.linkedin,
      },
    });

    // Refresh cache for this page so updated data is served
    revalidatePath("/editor/profile");

    return { success: true };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to save profile changes." };
  }
}