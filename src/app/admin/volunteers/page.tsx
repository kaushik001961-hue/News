import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    search?: string;
  }>;
}

export default async function VolunteersPage({
  searchParams,
}: PageProps) {
  const { search } = await searchParams;

  const volunteers = await prisma.volunteer.findMany({
    where: search
      ? {
          OR: [
            {
              name: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              email: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              city: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
            {
              interest: {
                contains: search,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : undefined,
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Volunteers Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            View and manage platform volunteer registrations.
          </p>
        </div>
      </div>

      {/* Search Box */}
      <form method="GET" className="mb-6">
        <input
          type="text"
          name="search"
          defaultValue={search || ""}
          placeholder="Search by name, email, city, interest..."
          className="w-full max-w-md border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
        />
      </form>

      {/* Stats */}
      <div className="mb-2">
        <p className="text-sm font-medium text-slate-600">
          Total Results: {volunteers.length}
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 border-b text-slate-700 font-semibold">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Phone</th>
                <th className="p-4">City</th>
                <th className="p-4">Interest</th>
                <th className="p-4">Joined</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {volunteers.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="p-8 text-center text-gray-400 font-medium"
                  >
                    No volunteers found matching your query.
                  </td>
                </tr>
              ) : (
                volunteers.map((volunteer) => (
                  <tr
                    key={volunteer.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 font-medium text-gray-900">
                      {volunteer.name}
                    </td>

                    <td className="p-4 text-gray-600">
                      {volunteer.email}
                    </td>

                    <td className="p-4 text-gray-600">
                      {volunteer.phone || "—"}
                    </td>

                    <td className="p-4 text-gray-600">
                      {volunteer.city}
                    </td>

                    <td className="p-4 text-gray-600">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-100">
                        {volunteer.interest}
                      </span>
                    </td>

                    <td className="p-4 text-gray-500">
                      {new Date(volunteer.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}