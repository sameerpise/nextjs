import Link from "next/link";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden flex-1 flex flex-col items-center justify-center px-6 py-16 sm:py-24 lg:px-8">
      {/* Background ambient gradient glow */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-purple-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="mx-auto max-w-3xl text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Next.js App Router • Mongoose • JWT Auth
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.15]">
          Production-Ready{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Authentication
          </span>{" "}
          Architecture
        </h1>

        <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          A cleanly architected authentication system featuring HTTP-only cookies, robust Mongoose connection caching, bcrypt password hashing, and real-time form validation.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/signup"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Get Started Free
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-medium border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Sign In to Account
          </Link>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-zinc-100 dark:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300 font-medium hover:bg-zinc-200/70 dark:hover:bg-zinc-800 transition-all"
          >
            View Dashboard
          </Link>
        </div>
      </div>

      {/* Feature grid */}
      <div className="mx-auto mt-20 max-w-5xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm backdrop-blur-sm">
          <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 font-bold text-lg">
            🛡️
          </div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
            Bcrypt Hashing
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Salt rounds set to 12 with length clamping to protect against hash exhaustion and DoS attacks.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm backdrop-blur-sm">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-4 font-bold text-lg">
            🔒
          </div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
            HTTP-Only JWT Cookies
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Stateless JWT sessions securely stored in HTTP-only, Lax sameSite cookies to mitigate XSS vulnerabilities.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white/60 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm backdrop-blur-sm sm:col-span-2 lg:col-span-1">
          <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 text-pink-600 dark:text-pink-400 flex items-center justify-center mb-4 font-bold text-lg">
            ⚡
          </div>
          <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">
            Connection Caching
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Global Mongoose caching prevents multiple database connections during Next.js development hot-reloading.
          </p>
        </div>
      </div>
    </div>
  );
}
