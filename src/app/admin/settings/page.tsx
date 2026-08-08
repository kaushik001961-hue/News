"use client";

import { useState } from "react";
import {
  Globe,
  Sliders,
  ShieldCheck,
  Share2,
  Lock,
  Save,
  CheckCircle2,
  AlertTriangle,
  Upload,
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<
    "general" | "content" | "seo" | "social" | "security"
  >("general");

  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Comprehensive Settings State
  const [settings, setSettings] = useState({
    // General & Branding
    siteName: "AGS NEWS",
    siteTagline: "Independent & Instant News Reporting",
    contactEmail: "admin@agsnews.com",
    contactPhone: "+1 (555) 019-2831",
    siteAddress: "123 Newsroom Ave, New York, NY 10001",
    logoUrl: "",
    faviconUrl: "",

    // Reading & Content Settings
    articlesPerPage: 12,
    defaultPostStatus: "DRAFT",
    enableComments: true,
    autoApproveComments: false,
    showViewCounts: true,

    // SEO & Analytics
    metaTitle: "AGS NEWS | Breaking News, World & Local Stories",
    metaDescription: "Get latest updates and news coverage from across the world.",
    metaKeywords: "news, breaking news, politics, technology, sports",
    googleAnalyticsId: "G-XXXXXXXXXX",

    // Social Links
    facebookUrl: "https://facebook.com",
    twitterUrl: "https://twitter.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
    whatsappSupportNumber: "+15550192831",

    // Security & System
    maintenanceMode: false,
    allowUserRegistration: true,
    requireEmailVerification: true,
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setSettings((prev) => ({ ...prev, [name]: checked }));
    } else {
      setSettings((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSaved(false);

    try {
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">System Settings</h1>
          <p className="text-sm text-gray-500">
            Configure site identity, reader behavior, SEO, and security policies.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-sm disabled:opacity-50"
        >
          <Save size={16} />
          {loading ? "Saving..." : "Save All Settings"}
        </button>
      </div>

      {/* Success Notification */}
      {saved && (
        <div className="flex items-center gap-2 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
          <CheckCircle2 size={18} />
          Site preferences updated successfully!
        </div>
      )}

      {/* Maintenance Mode Alert */}
      {settings.maintenanceMode && (
        <div className="flex items-center gap-2 p-4 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg text-sm">
          <AlertTriangle size={18} />
          <strong>Maintenance Mode Active:</strong> Public visitors will see a maintenance screen.
        </div>
      )}

      {/* Main Settings Container */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Navigation Tabs */}
        <aside className="md:col-span-1 space-y-1">
          <button
            onClick={() => setActiveTab("general")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${
              activeTab === "general"
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Globe size={18} />
            General & Branding
          </button>

          <button
            onClick={() => setActiveTab("content")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${
              activeTab === "content"
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Sliders size={18} />
            Content & Reading
          </button>

          <button
            onClick={() => setActiveTab("seo")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${
              activeTab === "seo"
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <ShieldCheck size={18} />
            SEO & Analytics
          </button>

          <button
            onClick={() => setActiveTab("social")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${
              activeTab === "social"
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Share2 size={18} />
            Social Media
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition ${
              activeTab === "security"
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Lock size={18} />
            Security & System
          </button>
        </aside>

        {/* Tab Panels */}
        <main className="md:col-span-3 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TAB 1: General Settings */}
            {activeTab === "general" && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">General Identity</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Website Name
                  </label>
                  <input
                    type="text"
                    name="siteName"
                    value={settings.siteName}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tagline
                  </label>
                  <input
                    type="text"
                    name="siteTagline"
                    value={settings.siteTagline}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Support Email
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={settings.contactEmail}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Phone
                    </label>
                    <input
                      type="text"
                      name="contactPhone"
                      value={settings.contactPhone}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Office / Publisher Address
                  </label>
                  <textarea
                    name="siteAddress"
                    rows={2}
                    value={settings.siteAddress}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <hr className="border-gray-100" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Logo URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="logoUrl"
                        placeholder="https://..."
                        value={settings.logoUrl}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button
                        type="button"
                        className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600"
                        title="Upload Logo"
                      >
                        <Upload size={18} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Favicon URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        name="faviconUrl"
                        placeholder="https://..."
                        value={settings.faviconUrl}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                      <button
                        type="button"
                        className="p-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-600"
                        title="Upload Favicon"
                      >
                        <Upload size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Content Settings */}
            {activeTab === "content" && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">
                  Content & Publishing Settings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Articles Per Listing Page
                    </label>
                    <input
                      type="number"
                      name="articlesPerPage"
                      value={settings.articlesPerPage}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Default Post Submission State
                    </label>
                    <select
                      name="defaultPostStatus"
                      value={settings.defaultPostStatus}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="DRAFT">Draft (Requires Review)</option>
                      <option value="PENDING">Pending Approval</option>
                      <option value="PUBLISHED">Auto-Publish</option>
                    </select>
                  </div>
                </div>

                <hr className="border-gray-100" />

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="enableComments"
                      checked={settings.enableComments}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Enable Comments</span>
                      <p className="text-xs text-gray-500">Allow visitors to submit comments on published articles.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="autoApproveComments"
                      checked={settings.autoApproveComments}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Auto-approve Comments</span>
                      <p className="text-xs text-gray-500">Publish comments immediately without prior moderation.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="showViewCounts"
                      checked={settings.showViewCounts}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Show Article View Counter</span>
                      <p className="text-xs text-gray-500">Display public view counts on single article pages.</p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* TAB 3: SEO Settings */}
            {activeTab === "seo" && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">SEO & Metadata</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Meta Title
                  </label>
                  <input
                    type="text"
                    name="metaTitle"
                    value={settings.metaTitle}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Default Meta Description
                  </label>
                  <textarea
                    name="metaDescription"
                    rows={3}
                    value={settings.metaDescription}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Global Keywords (Comma-separated)
                  </label>
                  <input
                    type="text"
                    name="metaKeywords"
                    value={settings.metaKeywords}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <hr className="border-gray-100" />

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Google Analytics Tracking Measurement ID
                  </label>
                  <input
                    type="text"
                    name="googleAnalyticsId"
                    placeholder="G-XXXXXXXXXX"
                    value={settings.googleAnalyticsId}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 4: Social Settings */}
            {activeTab === "social" && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">Social Media & Communication</h2>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facebook URL</label>
                  <input
                    type="url"
                    name="facebookUrl"
                    value={settings.facebookUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Twitter / X URL</label>
                  <input
                    type="url"
                    name="twitterUrl"
                    value={settings.twitterUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Instagram Profile</label>
                  <input
                    type="url"
                    name="instagramUrl"
                    value={settings.instagramUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Channel</label>
                  <input
                    type="url"
                    name="youtubeUrl"
                    value={settings.youtubeUrl}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Channel / Support Phone</label>
                  <input
                    type="text"
                    name="whatsappSupportNumber"
                    value={settings.whatsappSupportNumber}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>
            )}

            {/* TAB 5: Security Settings */}
            {activeTab === "security" && (
              <div className="space-y-5">
                <h2 className="text-lg font-semibold text-gray-900">Access & Security</h2>

                <div className="space-y-4">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="maintenanceMode"
                      checked={settings.maintenanceMode}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Enable Maintenance Mode</span>
                      <p className="text-xs text-gray-500">Temporarily block reader access while performing upgrades.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="allowUserRegistration"
                      checked={settings.allowUserRegistration}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Allow New User Registrations</span>
                      <p className="text-xs text-gray-500">Enable new users and reporters to sign up.</p>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="requireEmailVerification"
                      checked={settings.requireEmailVerification}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-sm font-medium text-gray-900">Require Email Verification</span>
                      <p className="text-xs text-gray-500">New accounts must verify email prior to posting.</p>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </form>
        </main>
      </div>
    </div>
  );
}