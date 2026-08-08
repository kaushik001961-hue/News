
"use client";

import Link from "next/link";
import { Pencil, Trash2, ShieldBan } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  role: string;
  status: string;
  createdAt: Date | string;
  _count?: {
    posts: number;
  };
}

interface Props {
  users: User[];
  selectedUsers: string[];
  setSelectedUsers: React.Dispatch<
    React.SetStateAction<string[]>
  >;
}

export default function UsersTable({
  users,
  selectedUsers,
  setSelectedUsers,
}: Props) {

  const toggleUser = (id: string) => {

    if (selectedUsers.includes(id)) {

      setSelectedUsers(
        selectedUsers.filter((item) => item !== id)
      );

    } else {

      setSelectedUsers([
        ...selectedUsers,
        id,
      ]);

    }

  };

  return (

    <div className="overflow-hidden rounded-xl border bg-white shadow-sm">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>

            <th className="p-4 text-left">

              <input
                type="checkbox"
                checked={
                  users.length > 0 &&
                  selectedUsers.length === users.length
                }
                onChange={(e) => {

                  if (e.target.checked) {

                    setSelectedUsers(
                      users.map((u) => u.id)
                    );

                  } else {

                    setSelectedUsers([]);

                  }

                }}
              />

            </th>

            <th className="p-4 text-left">

              User

            </th>

            <th className="p-4 text-left">

              Role

            </th>

            <th className="p-4 text-left">

              Status

            </th>

            <th className="p-4 text-left">

              Posts

            </th>

            <th className="p-4 text-left">

              Created

            </th>

            <th className="p-4 text-center">

              Actions

            </th>

          </tr>

        </thead>

        <tbody>

          {users.map((user) => (

            <tr
              key={user.id}
              className="border-t hover:bg-gray-50"
            >

              <td className="p-4">

                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUser(user.id)}
                />

              </td>

              <td className="p-4">

                <div className="flex items-center gap-3">

                  <img
                    src={
                      user.image ||
                      "/default-avatar.png"
                    }
                    alt=""
                    className="h-10 w-10 rounded-full object-cover"
                  />

                  <div>

                    <div className="font-semibold">

                      {user.name}

                    </div>

                    <div className="text-sm text-gray-500">

                      {user.email}

                    </div>

                  </div>

                </div>

              </td>

              <td className="p-4">

                <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">

                  {user.role}

                </span>

              </td>

              <td className="p-4">

                <span
                  className={`rounded-full px-3 py-1 text-sm ${
                    user.status === "ACTIVE"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >

                  {user.status}

                </span>

              </td>

              <td className="p-4">

                {user._count?.posts ?? 0}

              </td>

              <td className="p-4">

                {new Date(
                  user.createdAt
                ).toLocaleDateString()}

              </td>

              <td className="p-4">

                <div className="flex justify-center gap-2">

                  <Link
                    href={`/admin/users/edit/${user.id}`}
                    className="rounded-lg p-2 hover:bg-gray-100"
                  >

                    <Pencil size={18} />

                  </Link>

                  <button
                    className="rounded-lg p-2 hover:bg-red-100"
                  >

                    <Trash2 size={18} />

                  </button>

                  <button
                    className="rounded-lg p-2 hover:bg-yellow-100"
                  >

                    <ShieldBan size={18} />

                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
