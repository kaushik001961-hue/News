"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Eye,
  EyeOff,
  Loader2,
  Mail,
  Lock,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [remember, setRemember] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleLogin(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl: "/reporter/dashboard",
    });

    setLoading(false);

    if (result?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push("/reporter/dashboard");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-6"
    >
      {/* Email */}

      <div>

        <label className="mb-2 block font-medium text-slate-700">
          Email Address
        </label>

        <div className="relative">

          <Mail
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type="email"
            required
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-4 outline-none transition focus:border-blue-600"
            placeholder="name@example.com"
          />

        </div>

      </div>

      {/* Password */}

      <div>

        <label className="mb-2 block font-medium text-slate-700">
          Password
        </label>

        <div className="relative">

          <Lock
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            required
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 py-3 pl-11 pr-12 outline-none transition focus:border-blue-600"
            placeholder="********"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-4 text-slate-500"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Remember */}

      <div className="flex items-center justify-between">

        <label className="flex items-center gap-2 text-sm">

          <input
            type="checkbox"
            checked={remember}
            onChange={(e) =>
              setRemember(e.target.checked)
            }
          />

          Remember Me

        </label>

        <Link
          href="/reporter/forgot-password"
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          Forgot Password?
        </Link>

      </div>

      {/* Button */}

      <button
        disabled={loading}
        className="flex w-full items-center justify-center rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2
              className="mr-2 animate-spin"
              size={18}
            />
            Signing In...
          </>
        ) : (
          "Login"
        )}
      </button>

      {/* Register */}

      <div className="text-center text-sm text-slate-500">

        Don't have an account?

        <Link
          href="/reporter-register"
          className="ml-1 font-semibold text-blue-600 hover:underline"
        >
          Register Here
        </Link>

      </div>

    </form>
  );
}