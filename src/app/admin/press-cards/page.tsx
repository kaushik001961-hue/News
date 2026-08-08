import { prisma } from "@/lib/prisma";

import PressCardStats from "@/components/press-card/PressCardStats";
import PressCardFilters from "@/components/press-card/PressCardFilters";
import PressCardTable from "@/components/press-card/PressCardTable";

export default async function PressCardsPage() {
  const pressCards = await prisma.pressCard.findMany({
    include: {
      reporter: true,
    },
    orderBy: {
      issueDate: "desc",
    },
  });

  const today = new Date();

  const stats = {
    total: pressCards.length,

    active: pressCards.filter(
      (c) => c.active && c.expiryDate && new Date(c.expiryDate) >= today
    ).length,

    expired: pressCards.filter(
      (c) => c.expiryDate && new Date(c.expiryDate) < today
    ).length,

    inactive: pressCards.filter((c) => !c.active).length,

    expiringSoon: pressCards.filter((c) => {
      if (!c.active || !c.expiryDate) return false;

      const diff = new Date(c.expiryDate).getTime() - today.getTime();
      const days = diff / (1000 * 60 * 60 * 24);

      return days <= 30 && days >= 0;
    }).length,
  };

  return (
    <div className="space-y-8 p-8">
      <div>
        <h1 className="text-3xl font-black">Press Card Management</h1>

        <p className="mt-2 text-slate-500">Manage all AGS NEWS Press Cards</p>
      </div>

      <PressCardStats stats={stats} />

      <PressCardFilters />

      <PressCardTable pressCards={pressCards as any} />
    </div>
  );
}