"use client";

import { useState, useTransition } from "react";
import { registerReporter } from "@/actions/reporterActions";

import {
  ReporterFormData,
  defaultReporterForm,
} from "@/types/reporter";

// Steps
import Step1Personal from "./steps/Step1Personal";
import Step2Contact from "./steps/Step2Contact";
import Step3Address from "./steps/Step3Address";
import Step4Identity from "./steps/Step4Education";
import Step5Education from "./steps/Step5Experience";
import Step6Experience from "./steps/Step6Documents";
import Step7Reporter from "./steps/Step7Social";
import Step8Coverage from "./steps/Step8Coverage";
import Step9Equipment from "./steps/Step9Equipment";
import Step10Bank from "./steps/Step10Bank";
import Step11Documents from "./steps/Step11Documents";
import Step12Review from "./steps/Step12Review";

const TOTAL_STEPS = 12;

export default function ReporterForm() {
  const [step, setStep] = useState(1);

  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] =
    useState<ReporterFormData>(defaultReporterForm);

  function updateField<K extends keyof ReporterFormData>(
    key: K,
    value: ReporterFormData[K]
  ) {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function next() {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  }

  function previous() {
    if (step > 1) {
      setStep(step - 1);
    }
  }

  function submit() {
    startTransition(async () => {
      try {
        await registerReporter(formData);

        alert("Application Submitted Successfully.");

        setStep(1);

        setFormData(defaultReporterForm);
      } catch (error: any) {
        alert(error.message);
      }
    });
  }

  return (
    <div className="mx-auto max-w-6xl">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Reporter Registration
        </h1>

        <p className="mt-2 text-neutral-500">
          Complete all the steps to become
          an AGS NEWS Reporter.
        </p>

      </div>

      {/* Progress */}

      <div className="mb-10">

        <div className="h-3 rounded-full bg-neutral-200">

          <div
            className="h-3 rounded-full bg-blue-600 transition-all"
            style={{
              width: `${(step / TOTAL_STEPS) * 100}%`,
            }}
          />

        </div>

        <div className="mt-2 text-sm text-neutral-500">
          Step {step} of {TOTAL_STEPS}
        </div>

      </div>

      {/* Card */}

      <div className="rounded-3xl border bg-white p-8 shadow-xl">

        {step === 1 && (
          <Step1Personal
            formData={formData}
            updateField={updateField}
          />
        )}

        {step === 2 && (
          <Step2Contact
            formData={formData}
            updateField={updateField}
          />
        )}

        {step === 3 && (
          <Step3Address
            formData={formData}
            updateField={updateField}
          />
        )}

        {step === 4 && (
          <Step4Identity
            formData={formData}
            updateField={updateField}
          />
        )}

        {step === 5 && (
          <Step5Education
            formData={formData}
            updateField={updateField}
          />
        )}

        {step === 6 && (
          <Step6Experience
            formData={formData}
            updateField={updateField}
          />
        )}

        {step === 7 && (
          <Step7Reporter
            formData={formData}
            updateField={updateField}
          />
        )}

        {step === 8 && (
          <Step8Coverage
            formData={formData}
            updateField={updateField}
          />
        )}

        {step === 9 && (
          <Step9Equipment
            formData={formData}
            updateField={updateField}
          />
        )}

        {step === 10 && (
          <Step10Bank
            formData={formData}
            updateField={updateField}
          />
        )}

        {step === 11 && (
          <Step11Documents
            formData={formData}
            updateField={updateField}
          />
        )}

        {step === 12 && (
          <Step12Review
            formData={formData}
          />
        )}

      </div>

      {/* Navigation */}

      <div className="mt-8 flex justify-between">

        <button
          onClick={previous}
          disabled={step === 1}
          className="rounded-xl border px-6 py-3 disabled:opacity-40"
        >
          Previous
        </button>

        {step < TOTAL_STEPS ? (
          <button
            onClick={next}
            className="rounded-xl bg-blue-600 px-8 py-3 text-white"
          >
            Next
          </button>
        ) : (
          <button
            onClick={submit}
            disabled={isPending}
            className="rounded-xl bg-green-600 px-8 py-3 text-white"
          >
            {isPending
              ? "Submitting..."
              : "Submit Application"}
          </button>
        )}

      </div>

    </div>
  );
}