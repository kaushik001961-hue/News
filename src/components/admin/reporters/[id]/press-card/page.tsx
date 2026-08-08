import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PressCard from "@/components/admin/reporters/PressCard";

interface Props {
  params: {
    id: string;
  };
}

export default async function Page({
  params,
}: Props) {

  const reporter = await prisma.reporter.findUnique({
    where: {
      id: params.id,
    },
  });

  if (!reporter) {
    notFound();
  }

  return (
    <div className="flex justify-center py-12">

      <PressCard
        reporter={reporter}
      />

    </div>
  );
}