"use client";

interface Props {
  user: any;
}

export default function EditUserClient({ user }: Props) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">
        Edit User
      </h1>

      <div className="rounded-lg border p-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Status:</strong> {user.status}</p>
      </div>
    </div>
  );
}