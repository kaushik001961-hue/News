import LoginForm from "@/components/reporter-auth/LoginForm";

export default function ReporterLoginPage() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Left Side */}
        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-blue-700 via-indigo-700 to-slate-900 text-white p-16">

          <h1 className="text-5xl font-bold leading-tight">
            AGS NEWS
          </h1>

          <p className="mt-6 text-lg text-blue-100 leading-8">
            Welcome to the AGS NEWS Reporter Portal.
          </p>

          <p className="mt-4 text-blue-200">
            Submit breaking news, upload photos & videos,
            manage your stories and collaborate with editors
            from anywhere.
          </p>

          <div className="mt-16 space-y-5">

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
              Real-time News Submission
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
              Secure Reporter Dashboard
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
              Media Upload Center
            </div>

            <div className="flex items-center gap-3">
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
              Assignment Tracking
            </div>

          </div>

        </div>

        {/* Right Side */}

        <div className="flex items-center justify-center p-8 md:p-16">

          <div className="w-full max-w-md">

            <div className="mb-8">

              <h2 className="text-4xl font-bold text-slate-900">
                Reporter Login
              </h2>

              <p className="mt-3 text-slate-500">
                Login using your registered email and password.
              </p>

            </div>

            <LoginForm />

          </div>

        </div>

      </div>
    </section>
  );
}