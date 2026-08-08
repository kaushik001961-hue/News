import Sidebar from "@/components/dashboard/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = "REPORTER";

  return (
    <div className="flex min-h-screen">
      {/* Sidebar with capitalized path matching Sidebar.tsx */}
      <Sidebar role={role} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {children}
      </div>
    </div>
  );
}