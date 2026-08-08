import React from "react";

interface StepProps {
  formData: any;
  updateField: (field: string, value: any) => void;
}

export default function Step5Experience({ formData, updateField }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Journalism & Work Experience</h2>
        <p className="text-sm text-slate-500">Provide details about your media background and tools.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Designation / Role</label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g., Senior Reporter"
            value={formData.designation}
            onChange={(e) => updateField("designation", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Years of Experience</label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            value={formData.experience}
            onChange={(e) => updateField("experience", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Current Organization</label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            value={formData.currentOrganization}
            onChange={(e) => updateField("currentOrganization", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Reporting Beat</label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g., Politics, Crime, Sports"
            value={formData.beat}
            onChange={(e) => updateField("beat", e.target.value)}
          />
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Equipment Availability</h3>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600"
              checked={formData.hasCamera}
              onChange={(e) => updateField("hasCamera", e.target.checked)}
            />
            <span>DSLR / Video Camera</span>
          </label>
          <label className="flex items-center space-x-3 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-indigo-600"
              checked={formData.hasLaptop}
              onChange={(e) => updateField("hasLaptop", e.target.checked)}
            />
            <span>Laptop for Editing</span>
          </label>
        </div>
      </div>
    </div>
  );
}