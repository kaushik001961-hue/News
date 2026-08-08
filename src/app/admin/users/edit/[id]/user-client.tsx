"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import UserForm from "@/components/users/UserForm";

export default function EditUserClient({
  user,
}: any) {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function updateUser(data: any) {

    try {

      setLoading(true);

      const res = await fetch(

        `/api/users/${user.id}`,

        {

          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(data),

        }

      );

      if (!res.ok) {

        throw new Error();

      }

      router.push("/admin/users");

      router.refresh();

    } catch {

      alert("Unable to update user.");

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="mx-auto max-w-5xl p-8">

      <h1 className="mb-6 text-3xl font-bold">

        Edit User

      </h1>

      <UserForm
        initialData={user}
        loading={loading}
        onSubmit={updateUser}
      />

    </div>

  );

}
