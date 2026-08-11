import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface EditorLayoutProps {
  children: ReactNode;
}

export default async function EditorLayout({
  children,
}: EditorLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "EDITOR") {
    redirect("/");
  }

  return (
    <DashboardLayout
      role="EDITOR"
      user={session.user as any}
    >
      {children}
    </DashboardLayout>
  );
}