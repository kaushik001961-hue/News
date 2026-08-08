"use client";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

// In Next.js App Router, components using useSearchParams must be wrapped 
// in a Suspense boundary to prevent opt-out of static rendering.
function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const applicationNo = searchParams.get("applicationNo");

  if (!applicationNo) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50 text-center">
        <h1 className="text-2xl font-bold text-red-600">Invalid Session</h1>
        <p className="text-gray-600 mt-2">We couldn't find an application number associated with this visit.</p>
        <button 
          onClick={() => router.push("/")}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center border border-gray-100">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">Registration Submitted!</h1>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed">
          Thank you for applying. Your application has been received and is currently under review.
        </p>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100 text-left">
          <span className="text-xs uppercase font-semibold text-blue-500 tracking-wider">Application Number</span>
          <p className="font-mono text-lg font-bold text-blue-900 select-all mt-0.5">{applicationNo}</p>
          <span className="text-[10px] text-blue-600 block mt-1">💡 Save this number for future references and tracking.</span>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <Link 
            href="/"
            className="w-full inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function RegisterSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-gray-500 text-sm">Loading details...</div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}