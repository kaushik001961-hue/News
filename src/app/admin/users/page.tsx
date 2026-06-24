import Link from "next/link";
import { prisma } from "@/lib/prisma";

import UserStats from "@/components/users/UserStats";
import UserFilters from "@/components/users/UserFilters";
import UsersTable from "@/components/users/UsersTable";

import UsersClient from "./users-client";

export default async function UsersPage() {

  const users = await prisma.user.findMany({

    include: {
      _count: {
        select: {
          posts: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },

  });

  const total = users.length;

  const admins = users.filter(
    (u) => u.role === "ADMIN"
  ).length;

  const editors = users.filter(
    (u) => u.role === "EDITOR"
  ).length;

  const reporters = users.filter(
    (u) => u.role === "REPORTER"
  ).length;

  const active = users.filter(
    (u) => u.status === "ACTIVE"
  ).length;

  const blocked = users.filter(
    (u) => u.status === "BLOCKED"
  ).length;

  return (

    <div className="mx-auto max-w-7xl space-y-6 p-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">

            User Management

          </h1>

          <p className="text-gray-500">

            Manage administrators, editors and reporters

          </p>

        </div>

        <Link
          href="/admin/users/create"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >

          + Add User

        </Link>

      </div>

      <UserStats
        total={total}
        admins={admins}
        editors={editors}
        reporters={reporters}
        active={active}
        blocked={blocked}
      />

      <UsersClient users={users} />

    </div>

  );

}