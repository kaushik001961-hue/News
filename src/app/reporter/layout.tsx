import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

interface ReporterLayoutProps {
  children: ReactNode;
}

export default async function ReporterLayout({
  children,
}: ReporterLayoutProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "REPORTER") {
    redirect("/");
  }

  return (
   <DashboardLayout
  role={session.user.role as any}
  user={session.user as any}
>
  {children}
</DashboardLayout>
  );
}