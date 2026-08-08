import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound } from "next/navigation";


export default async function ReporterProfilePage() {
 const session = await auth();

  if (!session?.user?.email) {
    notFound();
  }

const reporter = await prisma.reporter.findUnique({
  where: {
    userId: session.user.id,
  },
});

  if (!reporter) {
    notFound();
  }

  return (
    <main className="space-y-8">

      <div className="rounded-3xl bg-white p-8 shadow">

        <h1 className="text-3xl font-bold">

          My Profile

        </h1>

        <p className="mt-2 text-slate-500">

          Reporter profile information.

        </p>

      </div>

      <div className="grid gap-6 md:grid-cols-2">

        <Info title="Reporter ID" value={reporter.reporterId ?? "-"} />
        <Info title="Application No" value={reporter.applicationNo} />
        <Info title="Name" value={`${reporter.firstName} ${reporter.lastName}`} />
        <Info title="Email" value={reporter.email} />
        <Info title="Phone" value={reporter.phone} />
        <Info title="District" value={reporter.district ?? "-"} />
        <Info title="State" value={reporter.state ?? "-"} />
        <Info title="Beat" value={reporter.beat ?? "-"} />
        <Info title="Designation" value={reporter.designation ?? "-"} />
        <Info title="Status" value={reporter.status} />

      </div>

    </main>
  );
}

function Info({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow">

      <p className="text-sm text-slate-500">

        {title}

      </p>

      <h2 className="mt-2 text-lg font-semibold">

        {value}

      </h2>

    </div>
  );
}