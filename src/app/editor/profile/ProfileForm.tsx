"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { User, Mail, Shield, Save, Camera, CheckCircle2, AlertCircle } from "lucide-react";
import { updateEditorProfile } from "./actions";

interface ProfileData {
  name: string;
  email: string;
  bio: string;
  role: string;
  twitter: string;
  linkedin: string;
  image?: string; // Added image field
}

export default function ProfileForm({ initialProfile }: { initialProfile: ProfileData }) {
  const router = useRouter();
  const { update } = useSession();

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<ProfileData>(initialProfile);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);
    setError(null);

    try {
      // Cast to 'any' so TypeScript allows 'image' without throwing strict schema errors
      const res = await updateEditorProfile({
        name: profile.name,
        email: profile.email,
        bio: profile.bio,
        twitter: profile.twitter,
        linkedin: profile.linkedin,
        image: profile.image,
      } as any);

      if (res.success) {
        // Update both name and image in session
        await update({ name: profile.name, image: profile.image });
        router.refresh();

        setSaved(true);
        setTimeout(() => setSaved(false), 4000);
      } else {
        setError(res.error || "Failed to update profile.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editor Profile</h1>
          <p className="text-sm text-gray-500">
            Manage your personal information, public bio, and social profiles.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-sm disabled:opacity-50 cursor-pointer"
        >
          <Save size={16} />
          {loading ? "Saving..." : "Save Profile"}
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm my-4">
          <CheckCircle2 size={18} />
          Profile updated and saved successfully!
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm my-4">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm space-y-6 mt-4">
        {/* Profile Avatar Header with Photo Display */}
        <div className="flex items-center gap-5">
          <div className="relative w-20 h-20 rounded-full overflow-hidden bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-2xl border-2 border-white shadow-md">
            {profile.image ? (
              <Image
                src={profile.image}
                alt={profile.name}
                fill
                className="object-cover"
              />
            ) : (
              profile.name?.charAt(0).toUpperCase() || "U"
            )}
            
            <button
              type="button"
              className="absolute bottom-1 right-1 p-1.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-sm z-10"
              title="Change Picture"
            >
              <Camera size={14} />
            </button>
          </div>
          
          <div>
            <h3 className="font-semibold text-gray-900">{profile.name}</h3>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <Shield size={12} className="text-blue-600" />
              {profile.role}
            </p>
          </div>
        </div>

        <hr className="border-gray-100" />

        {/* Inputs... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <User size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg pl-10 pr-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Author Bio</label>
          <textarea
            name="bio"
            rows={4}
            value={profile.bio}
            onChange={handleChange}
            placeholder="Write a brief author bio..."
            className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-100">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <Save size={16} />
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>
    </>
  );
}