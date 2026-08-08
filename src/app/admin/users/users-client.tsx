
"use client";

import { useState } from "react";

import UserFilters from "@/components/users/UserFilters";
import UsersTable from "@/components/users/UsersTable";

interface Props {
  users: any[];
}

export default function UsersClient({
  users,
}: Props) {

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  const [status, setStatus] = useState("");

  const [bulkAction, setBulkAction] =
    useState("");

  const [selectedUsers, setSelectedUsers] =
    useState<string[]>([]);

  const filtered = users.filter((user) => {

    const matchesSearch =
      user.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesRole =
      role === "" || user.role === role;

    const matchesStatus =
      status === "" ||
      user.status === status;

    return (
      matchesSearch &&
      matchesRole &&
      matchesStatus
    );

  });

  return (

    <div className="space-y-6">

      <UserFilters
        search={search}
        setSearch={setSearch}
        role={role}
        setRole={setRole}
        status={status}
        setStatus={setStatus}
        bulkAction={bulkAction}
        setBulkAction={setBulkAction}
        onApplyBulk={() => {

          console.log(
            bulkAction,
            selectedUsers
          );

        }}
        onReset={() => {

          setSearch("");

          setRole("");

          setStatus("");

          setBulkAction("");

        }}
      />

      <UsersTable
        users={filtered}
        selectedUsers={selectedUsers}
        setSelectedUsers={
          setSelectedUsers
        }
      />

    </div>

  );

}
