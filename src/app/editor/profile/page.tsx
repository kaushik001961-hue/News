import { auth } from "@/lib/auth"; // Adjust import to your NextAuth setup
import { prisma } from "@/lib/prisma"; // Adjust import to your Prisma client setup
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";

export default async function EditorProfilePage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/login");
  }

  // Fetch initial profile data directly from database
  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      bio: true,
      role: true,
      twitter: true,
      linkedin: true,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const initialProfile = {
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
    role: user.role || "Editor",
    twitter: user.twitter || "",
    linkedin: user.linkedin || "",
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <ProfileForm initialProfile={initialProfile} />
    </div>
  );
}