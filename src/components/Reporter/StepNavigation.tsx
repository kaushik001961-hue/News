"use client";

interface StepNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  loading?: boolean;
}

export default function StepNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  loading = false,
}: StepNavigationProps) {
  return (
    <div className="flex items-center justify-between">

      {/* Previous Button */}

      <button
        type="button"
        onClick={onPrevious}
        disabled={currentStep === 1 || loading}
        className="
          rounded-xl
          border
          border-slate-300
          px-6
          py-3
          font-medium
          text-slate-700
          transition
          hover:bg-slate-100
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        ← Previous
      </button>

      {/* Step Counter */}

      <div className="hidden text-sm text-slate-500 md:block">
        Step <strong>{currentStep}</strong> of{" "}
        <strong>{totalSteps}</strong>
      </div>

      {/* Next / Submit */}

      {currentStep < totalSteps ? (
        <button
          type="button"
          onClick={onNext}
          disabled={loading}
          className="
            rounded-xl
            bg-emerald-600
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:bg-emerald-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          Next →
        </button>
      ) : (
        <button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="
            rounded-xl
            bg-emerald-600
            px-8
            py-3
            font-semibold
            text-white
            transition
            hover:bg-emerald-700
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {loading ? "Submitting..." : "Submit Registration"}
        </button>
      )}
    </div>
  );
}