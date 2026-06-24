"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserForm from "@/components/users/UserForm";

export default function CreateUserPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  async function createUser(data: any) {

    try {

      setLoading(true);

      const res = await fetch("/api/users", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify(data),

      });

      if (!res.ok) {

        throw new Error("Failed to create user");

      }

      router.push("/admin/users");

      router.refresh();

    } catch (err) {

      alert("Error creating user.");

      console.error(err);

    } finally {

      setLoading(false);

    }

  }

  return (

    <div className="mx-auto max-w-5xl p-8 space-y-6">

      <div>

        <h1 className="text-3xl font-bold">

          Create User

        </h1>

        <p className="text-gray-500">

          Add a new administrator, editor or reporter.

        </p>

      </div>

      <UserForm
        loading={loading}
        onSubmit={createUser}
      />

    </div>

  );

}
