"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        redirect: false,
      });

      console.log("SignIn Result:", result);

      if (!result) {
        alert("No response received from server.");
        return;
      }

      if (result.error) {
        alert("Invalid email or password.");
        return;
      }

      // Wait for Auth.js to update the session cookie
      await new Promise((resolve) => setTimeout(resolve, 200));

      const session = await fetch("/api/auth/session", {
  cache: "no-store",
}).then((r) => r.json());

console.log("================================");
console.log("SESSION RESPONSE");
console.log(session);
console.log("USER:", session?.user);
console.log("ROLE:", session?.user?.role);
console.log("================================");

if (!session?.user) {
  console.log("NO USER FOUND");
  alert("Unable to load user session.");
  return;
}

console.log("BEFORE SWITCH");

switch (session.user.role) {
  case "ADMIN":
    router.replace("/admin");
    break;

  case "EDITOR":
    router.replace("/editor");
    break;

  case "REPORTER":
    router.replace("/reporter");
    break;

  default:
    router.replace("/");
}

      router.refresh();
    } catch (error) {
      console.error("Login Error:", error);
      alert("Something went wrong while logging in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
      >
        <h1 className="mb-8 text-center text-3xl font-bold text-slate-800">
          Login
        </h1>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none transition focus:border-red-500"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-red-600 py-3 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}