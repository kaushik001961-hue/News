import React from "react";

interface StepProps {
  formData: any;
  updateField: (field: string, value: any) => void;
}

export default function Step4Education({ formData, updateField }: StepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">Education Details</h2>
        <p className="text-sm text-slate-500">Provide your educational background and qualifications.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Highest Qualification</label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g., Bachelor of Arts"
            value={formData.qualification}
            onChange={(e) => updateField("qualification", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">College/Institute Name</label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            value={formData.college}
            onChange={(e) => updateField("college", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">University Name</label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            value={formData.university}
            onChange={(e) => updateField("university", e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Passing Year</label>
          <input
            type="text"
            className="w-full rounded-lg border border-slate-300 p-2.5 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            placeholder="e.g., 2024"
            value={formData.passingYear}
            onChange={(e) => updateField("passingYear", e.target.value)}
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 pt-2">
        <input
          id="journalismDegree"
          type="checkbox"
          className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
          checked={formData.journalismDegree}
          onChange={(e) => updateField("journalismDegree", e.target.checked)}
        />
        <label htmlFor="journalismDegree" className="text-sm font-medium text-slate-700">
          I hold a specific degree/diploma in Journalism or Mass Communication
        </label>
      </div>
    </div>
  );
}