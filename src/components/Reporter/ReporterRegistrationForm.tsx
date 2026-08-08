"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ProgressBar from "./ProgressBar";
import StepNavigation from "./StepNavigation";

import Step1Personal from "./steps/Step1Personal";
import Step2Contact from "./steps/Step2Contact";
import Step3Address from "./steps/Step3Address";
import Step4Education from "./steps/Step4Education";
import Step5Experience from "./steps/Step5Experience";
import Step6Documents from "./steps/Step6Documents";
import Step7Social from "./steps/Step7Social";
import Step8Coverage from "./steps/Step8Coverage";
import Step9Equipment from "./steps/Step9Equipment";
import Step10Bank from "./steps/Step10Bank";
import Step11Documents from "./steps/Step11Documents";
import Step12Review from "./steps/Step12Review";
import Step13Account from "./steps/Step13Account";

const TOTAL_STEPS = 13;

export default function ReporterRegistrationForm() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Personal
    photo: "",
    firstName: "",
    middleName: "",
    lastName: "",
    gender: "",
    dob: "",
    bloodGroup: "",
    maritalStatus: "",
    nationality: "Indian",

    // Contact
    email: "",
    phone: "",
    alternatePhone: "",
    whatsapp: "",

    password: "",
    confirmPassword: "",
    declaration: false,

    // Address
    address: "",
    village: "",
    taluka: "",
    district: "",
    state: "",
    pincode: "",

    // Education
    qualification: "",
    journalismDegree: false,
    college: "",
    university: "",
    passingYear: "",
    languages: "",

    // Experience
    designation: "",
    experience: "",
    currentOrganization: "",
    previousOrganization: "",
    beat: "",
    coverageArea: "",

    hasCamera: false,
    hasLaptop: false,
    hasVehicle: false,
    drivingLicense: false,

    // Social
    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    youtube: "",
    website: "",

    // Documents
    aadhaar: "",
    pan: "",
    resume: "",
    pressCard: "",

    aadhaarNumber: "",
    panNumber: "",

    // Emergency
    emergencyName: "",
    emergencyRelation: "",
    emergencyPhone: "",

    remarks: "",

    termsAccepted: false,
  });

  function updateField(name: string, value: any) {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function nextStep() {
    if (step < TOTAL_STEPS) {
      setStep((prev) => prev + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function previousStep() {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  async function submitForm() {
    setLoading(true);

    try {
      // Convert the payload to FormData to cleanly handle both files and text fields
      const dataToSend = new FormData();

      // Loop through form data and append everything to the FormData instance using explicit casting to avoid type errors
      Object.entries(formData as Record<string, any>).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          if (typeof window !== "undefined" && value instanceof File) {
            // If it's a raw file object, append it directly
            dataToSend.append(key, value);
          } else if (typeof value === "object" && value !== null) {
            // If it's an image state wrapper containing a raw file, target the file property
            if (value.file instanceof File) {
              dataToSend.append(key, value.file);
            } else {
              dataToSend.append(key, JSON.stringify(value));
            }
          } else {
            // Pass normal text strings and booleans
            dataToSend.append(key, String(value));
          }
        }
      });

      const response = await fetch("/api/reporter/register", {
        method: "POST",
        body: dataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        console.log("Validation Response:", result);

        if (result.errors?.fieldErrors) {
          console.table(result.errors.fieldErrors);
        }

        alert(
          result.message ??
            JSON.stringify(result.errors?.fieldErrors, null, 2)
        );

        return;
      }

      window.location.href =
        "/reporter/success?applicationNo=" + result.applicationNo;
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong during submission.");
    } finally {
      setLoading(false);
    }
  }

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <Step1Personal
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 2:
        return (
          <Step2Contact
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 3:
        return (
          <Step3Address
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 4:
        return (
          <Step4Education
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 5:
        return (
          <Step5Experience
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 6:
        return (
          <Step6Documents
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 7:
        return (
          <Step7Social
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 8:
        return (
          <Step8Coverage
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 9:
        return (
          <Step9Equipment
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 10:
        return (
          <Step10Bank
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 11:
        return (
          <Step11Documents
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 12:
        return (
          <Step13Account
            formData={formData as any}
            updateField={updateField}
          />
        );

      case 13:
        return (
          <Step12Review
            formData={formData as any}
          />
        );

      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-slate-100 py-12">
      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-900">
            Reporter Registration
          </h1>
          <p className="mt-3 text-slate-600">
            Join our newsroom and become part of our professional media network.
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar
          currentStep={step}
          totalSteps={TOTAL_STEPS}
        />

        {/* Registration Card */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
          <div className="p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{
                  opacity: 0,
                  x: 60,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -60,
                }}
                transition={{
                  duration: 0.35,
                }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 md:px-10">
            <StepNavigation
              currentStep={step}
              totalSteps={TOTAL_STEPS}
              onPrevious={previousStep}
              onNext={nextStep}
              onSubmit={submitForm}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </section>
  );
}