"use client";

import { motion } from "framer-motion";
import {
  User,
  Phone,
  MapPin,
  GraduationCap,
  Briefcase,
  FileText,
  Globe,
  CheckCircle2,
} from "lucide-react";

interface Props {
  currentStep: number;
  totalSteps: number;
}

const steps = [
  {
    title: "Personal",
    icon: User,
  },
  {
    title: "Contact",
    icon: Phone,
  },
  {
    title: "Address",
    icon: MapPin,
  },
  {
    title: "Education",
    icon: GraduationCap,
  },
  {
    title: "Experience",
    icon: Briefcase,
  },
  {
    title: "Professional",
    icon: FileText,
  },
  {
    title: "Social",
    icon: User,
  },
  {
    title: "Coverage",
    icon: Globe,
  },
  {
    title: "Equipment",
    icon: Briefcase,
  },
  {
    title: "Bank",
    icon: FileText,
  },
  {
    title: "Identity",
    icon: FileText,
  },
  {
    title: "Review",
    icon: CheckCircle2,
  },
];

export default function ProgressBar({
  currentStep,
  totalSteps,
}: Props) {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="mb-10">

      {/* Percentage */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Registration Progress
          </h3>

          <p className="text-sm text-slate-500">
            Step {currentStep} of {totalSteps}
          </p>
        </div>

        <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          {Math.round(percentage)}%
        </span>
      </div>

      {/* Progress Line */}
      <div className="relative mb-8 h-2 overflow-hidden rounded-full bg-slate-200">

        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: `${percentage}%`,
          }}
          transition={{
            duration: 0.4,
          }}
          className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
        />

      </div>

      {/* Desktop Steps */}
      <div className="hidden xl:grid grid-cols-12 gap-2">

        {steps.map((step, index) => {
          const Icon = step.icon;

          const completed = currentStep > index + 1;
          const active = currentStep === index + 1;

          return (
            <div
              key={step.title}
              className="flex flex-col items-center"
            >

              <div
                className={`flex h-14 w-14 items-center justify-center rounded-full border transition-all duration-300

                  ${
                    completed
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : active
                      ? "border-emerald-600 bg-emerald-100 text-emerald-700"
                      : "border-slate-300 bg-white text-slate-500"
                  }

                `}
              >
                <Icon size={18} />
              </div>

              <span
                className={`mt-3 text-center text-sm

                ${
                  active
                    ? "font-semibold text-emerald-700"
                    : "text-slate-500"
                }

                `}
              >
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Mobile */}
      <div className="lg:hidden">

        <div className="flex items-center justify-center gap-3">

          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-2 flex-1 rounded-full

              ${
                currentStep > index
                  ? "bg-emerald-600"
                  : "bg-slate-300"
              }

              `}
            />
          ))}

        </div>

        <div className="mt-2 text-center text-xs">

          <p className="font-medium text-slate-700">
  {steps[currentStep - 1]?.title || `Step ${currentStep}`}
</p>

        </div>

      </div>

    </div>
  );
}