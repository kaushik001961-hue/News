"use client";

import { Eye, EyeOff, Lock } from "lucide-react";
import { useState } from "react";

interface Props {
  formData: any;
  updateField: (name: string, value: any) => void;
}

export default function Step13Account({
  formData,
  updateField,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="space-y-8">

      <div>
        <h2 className="text-3xl font-bold">
          Account Setup
        </h2>

        <p className="mt-2 text-slate-500">
          Create your login credentials.
        </p>
      </div>

      {/* Password */}

      <div>

        <label className="mb-2 block font-semibold">
          Password
        </label>

        <div className="relative">

          <Lock
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) =>
              updateField("password", e.target.value)
            }
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-4"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

      </div>

      {/* Confirm Password */}

      <div>

        <label className="mb-2 block font-semibold">
          Confirm Password
        </label>

        <div className="relative">

          <Lock
            size={18}
            className="absolute left-4 top-4 text-slate-400"
          />

          <input
            type={showConfirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              updateField(
                "confirmPassword",
                e.target.value
              )
            }
            className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-12"
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirm(!showConfirm)
            }
            className="absolute right-4 top-4"
          >
            {showConfirm ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>

        </div>

      </div>

      {/* Terms */}

      <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">

        <input
          type="checkbox"
          checked={formData.termsAccepted}
          onChange={(e) =>
            updateField(
              "termsAccepted",
              e.target.checked
            )
          }
          className="mt-1"
        />

        <span className="text-sm">
          I agree to the Terms & Conditions and
          Privacy Policy of AGS NEWS.
        </span>

      </label>

      {/* Declaration */}

      <label className="flex items-start gap-3 rounded-xl border border-slate-200 p-4">

        <input
          type="checkbox"
          checked={formData.declaration}
          onChange={(e) =>
            updateField(
              "declaration",
              e.target.checked
            )
          }
          className="mt-1"
        />

        <span className="text-sm">
          I declare that all information provided
          is true and correct.
        </span>

      </label>

    </div>
  );
}