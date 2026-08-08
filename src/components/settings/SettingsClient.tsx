"use client";

import { useState } from "react";
import { Save, Globe, Share2, ShieldCheck, CheckCircle2 } from "lucide-react";

interface SettingsClientProps {
  initialSettings?: any;
}

export default function SettingsClient({ initialSettings }: SettingsClientProps) {
  const [activeTab, setActiveTab] = useState<"general" | "social" | "seo">("general");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    siteName: initialSettings?.siteName || "AGS NEWS",
    siteDescription: initialSettings?.siteDescription || "Your trusted source for latest news.",
    contactEmail: initialSettings?.contactEmail || "contact@agsnews.com",
    contactPhone: initialSettings?.contactPhone || "+1 (555) 000-0000",
    facebookUrl: initialSettings?.facebookUrl || "",
    twitterUrl: initialSettings?.twitterUrl || "",
    instagramUrl: initialSettings?.instagramUrl || "",
    youtubeUrl: initialSettings?.youtubeUrl || "",
    metaKeywords: initialSettings?.metaKeywords || "news, breaking news, latest updates",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error("Failed to save settings:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Tabs Header */}
      <div className="flex border-b border-gray-100 bg-gray-50/50 p-2 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("general")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
            activeTab === "general"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Globe size={16} />
          General & Branding
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("social")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
            activeTab === "social"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Share2 size={16} />
          Social Links
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("seo")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition ${
            activeTab === "seo"
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <ShieldCheck size={16} />
          SEO Defaults
        </button>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        {saved && (
          <div className="flex items-center gap-2 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-200">
            <CheckCircle2 size={18} />
            Settings saved successfully!
          </div>
        )}

        {/* Tab 1: General */}
        {activeTab === "general" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Title</label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Site Tagline / Description</label>
              <textarea
                name="siteDescription"
                rows={3}
                value={formData.siteDescription}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                <input
                  type="email"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="text"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Social */}
        {activeTab === "social" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
              <input
                type="url"
                name="facebookUrl"
                placeholder="https://facebook.com/..."
                value={formData.facebookUrl}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X URL</label>
              <input
                type="url"
                name="twitterUrl"
                placeholder="https://x.com/..."
                value={formData.twitterUrl}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Channel URL</label>
              <input
                type="url"
                name="youtubeUrl"
                placeholder="https://youtube.com/..."
                value={formData.youtubeUrl}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        )}

        {/* Tab 3: SEO */}
        {activeTab === "seo" && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Default Meta Keywords</label>
              <input
                type="text"
                name="metaKeywords"
                value={formData.metaKeywords}
                onChange={handleChange}
                placeholder="news, daily news, world news"
                className="w-full rounded-lg border border-gray-300 p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="pt-4 border-t border-gray-100 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition disabled:opacity-50"
          >
            <Save size={16} />
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
}