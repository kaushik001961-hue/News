import { Dispatch, SetStateAction } from "react";

// 1. Define the interface for the props the table expects
interface UsersTableProps {
  users: any[]; // You can swap 'any' for your User database type if you have one
  selectedUsers: string[];
  setSelectedUsers: Dispatch<SetStateAction<string[]>>;
}

// 2. Destructure and type the props in your function signature
export default function UsersTable({ 
  users, 
  selectedUsers, 
  setSelectedUsers 
}: UsersTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      {/* Your table code goes here mapping over 'users' */}
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-50 text-sm font-semibold text-gray-600">
            <th className="p-4">User</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-b last:border-0 hover:bg-gray-50">
              <td className="p-4 font-medium">{user.name}</td>
              <td className="p-4 text-gray-500">{user.email}</td>
              <td className="p-4 text-gray-500">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}