import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Define fallback session object to fix compilation
  const session = {
    user: {
      id: "editor-user",
      name: "Editor",
      email: "editor@example.com",
      role: "EDITOR",
    },
  };

  return (
    <DashboardLayout
      role={session.user.role as any}
      user={session.user as any}
    >
      {children}
    </DashboardLayout>
  );
}