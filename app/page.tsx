"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Shield,
  Lock,
  Zap,
  Key,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Code2,
  Database,
  ChevronDown,
} from "lucide-react";

const features = [
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Bcrypt Password Hashing",
    description:
      "Industry-standard bcrypt with salt rounds of 12, protecting your users against brute-force and rainbow table attacks.",
    color: "indigo",
  },
  {
    icon: <Lock className="w-6 h-6" />,
    title: "HTTP-Only JWT Cookies",
    description:
      "Stateless JWT sessions stored in secure HTTP-only cookies, eliminating XSS attack vectors on client-side token theft.",
    color: "purple",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "Mongoose Connection Caching",
    description:
      "Global caching prevents redundant MongoDB connections during Next.js hot reloads, ensuring smooth developer experience.",
    color: "pink",
  },
  {
    icon: <Key className="w-6 h-6" />,
    title: "Secure Token Rotation",
    description:
      "JWT tokens are short-lived and refreshed automatically, reducing exposure window in case of token compromise.",
    color: "amber",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Role-Based Access",
    description:
      "Fine-grained authorization control to protect routes and resources based on user roles and permissions.",
    color: "teal",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "MongoDB + Mongoose ODM",
    description:
      "Type-safe schema validation with Mongoose, ensuring data integrity and developer-friendly query APIs.",
    color: "sky",
  },
];

const colorMap: Record<string, { bg: string; icon: string; border: string }> = {
  indigo: {
    bg: "bg-indigo-100 dark:bg-indigo-950/60",
    icon: "text-indigo-600 dark:text-indigo-400",
    border: "border-indigo-200/60 dark:border-indigo-800/50",
  },
  purple: {
    bg: "bg-purple-100 dark:bg-purple-950/60",
    icon: "text-purple-600 dark:text-purple-400",
    border: "border-purple-200/60 dark:border-purple-800/50",
  },
  pink: {
    bg: "bg-pink-100 dark:bg-pink-950/60",
    icon: "text-pink-600 dark:text-pink-400",
    border: "border-pink-200/60 dark:border-pink-800/50",
  },
  amber: {
    bg: "bg-amber-100 dark:bg-amber-950/60",
    icon: "text-amber-600 dark:text-amber-400",
    border: "border-amber-200/60 dark:border-amber-800/50",
  },
  teal: {
    bg: "bg-teal-100 dark:bg-teal-950/60",
    icon: "text-teal-600 dark:text-teal-400",
    border: "border-teal-200/60 dark:border-teal-800/50",
  },
  sky: {
    bg: "bg-sky-100 dark:bg-sky-950/60",
    icon: "text-sky-600 dark:text-sky-400",
    border: "border-sky-200/60 dark:border-sky-800/50",
  },
};

const steps = [
  {
    step: "01",
    title: "Create Your Account",
    description: "Sign up with your name, email, and a secure password in seconds.",
  },
  {
    step: "02",
    title: "Secure Authentication",
    description:
      "Your credentials are hashed and stored safely. A JWT session cookie is issued on login.",
  },
  {
    step: "03",
    title: "Access Your Dashboard",
    description:
      "Browse protected routes seamlessly — your session is verified automatically on every request.",
  },
];

const faqs = [
  {
    q: "How are passwords stored?",
    a: "Passwords are hashed using bcrypt with a salt factor of 12. We never store plain-text passwords under any circumstances.",
  },
  {
    q: "What is an HTTP-only cookie?",
    a: "An HTTP-only cookie cannot be accessed by JavaScript running in the browser, protecting your session token from XSS attacks.",
  },
  {
    q: "Is the JWT token safe from theft?",
    a: "Yes. Storing the JWT in an HTTP-only cookie means malicious scripts cannot read it. Combined with short expiry and SameSite=Lax, the risk is significantly reduced.",
  },
  {
    q: "Why Mongoose connection caching?",
    a: "Next.js hot-reload creates new module instances. Without caching, each reload would open a new MongoDB connection. Our caching layer reuses existing connections.",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative isolate flex flex-col items-center justify-center px-6 py-24 sm:py-32 lg:px-8 text-center">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl pointer-events-none"
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

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60 shadow-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Secure · Fast · Production-Ready
        </div>

        <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1] max-w-4xl mx-auto">
          The Auth Layer Your{" "}
          <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Next.js App
          </span>{" "}
          Deserves
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          AuthFlow gives you a battle-tested authentication system — bcrypt hashing, JWT cookies,
          MongoDB integration — so you can focus on building your product.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            id="hero-get-started"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/login"
            id="hero-sign-in"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 font-semibold border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            Sign In
          </Link>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-sm text-zinc-500 dark:text-zinc-500">
          {["Next.js 16", "React 19", "MongoDB", "TypeScript", "JWT", "bcrypt"].map((badge) => (
            <span
              key={badge}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/50"
            >
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              {badge}
            </span>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 border-y border-zinc-200/80 dark:border-zinc-800/80 bg-white/50 dark:bg-zinc-900/40 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {[
            { value: "100%", label: "Open Source" },
            { value: "< 1ms", label: "Token Verification" },
            { value: "12x", label: "bcrypt Salt Rounds" },
            { value: "0", label: "Plain-text Passwords" },
          ].map(({ value, label }) => (
            <div key={label}>
              <p className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {value}
              </p>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
              Why AuthFlow
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Everything You Need to Secure Your App
            </h2>
            <p className="mt-4 text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
              A complete authentication toolkit built with modern security best practices baked in from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => {
              const c = colorMap[f.color];
              return (
                <div
                  key={f.title}
                  className={`p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border ${c.border} shadow-sm backdrop-blur-sm hover:shadow-md transition-shadow group`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl ${c.bg} ${c.icon} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
                  >
                    {f.icon}
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                    {f.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-24 px-6 lg:px-8 bg-zinc-50/80 dark:bg-zinc-900/40 border-y border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400 mb-3">
              Simple Onboarding
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Up and Running in 3 Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-indigo-500/25 mb-5">
                  {s.step}
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-2">{s.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/signup"
              id="how-it-works-cta"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-600/25 transition-all hover:scale-[1.03]"
            >
              Start for Free <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold uppercase tracking-widest text-sky-600 dark:text-sky-400 mb-3">
              Technology
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Built on a Modern Stack
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                icon: <Globe className="w-7 h-7" />,
                name: "Next.js 16",
                desc: "App Router, Server Components, and API Routes for a full-stack experience.",
                color: "from-zinc-600 to-zinc-800",
              },
              {
                icon: <Database className="w-7 h-7" />,
                name: "MongoDB + Mongoose",
                desc: "Flexible NoSQL storage with type-safe schemas and powerful query support.",
                color: "from-emerald-500 to-teal-600",
              },
              {
                icon: <Code2 className="w-7 h-7" />,
                name: "TypeScript",
                desc: "End-to-end type safety from database models to API handlers and UI components.",
                color: "from-blue-500 to-indigo-600",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 shadow-sm backdrop-blur-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${t.color} text-white flex items-center justify-center mb-4 shadow-md`}
                >
                  {t.icon}
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1.5">{t.name}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
        <div className="max-w-3xl mx-auto text-center text-white">
          <div className="flex justify-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />
            ))}
          </div>
          <blockquote className="text-2xl sm:text-3xl font-bold leading-snug mb-6">
            &ldquo;AuthFlow saved us weeks of work. The JWT + HTTP-only cookie setup is rock-solid
            and the code is clean and easy to extend.&rdquo;
          </blockquote>
          <p className="text-indigo-200 font-medium">— A happy developer using AuthFlow</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 px-6 lg:px-8 bg-zinc-50/80 dark:bg-zinc-900/40 border-t border-zinc-200/60 dark:border-zinc-800/60">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
              Common Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden"
              >
                <button
                  id={`faq-toggle-${idx}`}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
                >
                  {faq.q}
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 flex-shrink-0 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-12 text-center shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/5 pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4 relative z-10">
            Ready to Secure Your Application?
          </h2>
          <p className="text-indigo-200 text-lg mb-8 max-w-xl mx-auto relative z-10">
            Join developers who trust AuthFlow for their Next.js authentication. Set up in minutes,
            secure for years.
          </p>
          <div className="flex flex-wrap justify-center gap-4 relative z-10">
            <Link
              href="/signup"
              id="cta-create-account"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-bold hover:bg-indigo-50 transition-all hover:scale-[1.03] shadow-lg"
            >
              Create Free Account <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/login"
              id="cta-sign-in"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/10 text-white font-semibold border border-white/20 hover:bg-white/20 transition-all hover:scale-[1.03]"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

