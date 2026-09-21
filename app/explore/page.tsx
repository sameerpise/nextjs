"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

interface FeatureItem {
    id: string;
    title: string;
    description: string;
    category: "Security" | "Database" | "Architecture" | "API";
    badge: string;
    icon: string;
    details: string;
    codeSnippet?: string;
    stats: string;
}

const EXPLORE_ITEMS: FeatureItem[] = [
    {
        id: "jwt-auth",
        title: "Stateless JWT Auth Shield",
        description:
            "Self-contained tokens signed with HMAC SHA-256 and stored exclusively inside HttpOnly Lax cookies to mitigate XSS and CSRF attacks.",
        category: "Security",
        badge: "Production Ready",
        icon: "🛡️",
        details:
            "Tokens are signed with process.env.JWT_SECRET and configured with a 7-day expiration. The client-side JavaScript cannot read the cookie directly, protecting user sessions.",
        codeSnippet: `// lib/auth.ts
export function createToken(payload: AuthPayload): string {
    return jwt.sign(payload, process.env.JWT_SECRET!, {
        expiresIn: "7d",
    });
}`,
        stats: "7-Day Auto-Expiry",
    },
    {
        id: "mongodb-pool",
        title: "Mongoose Connection Singleton",
        description:
            "Cached database connection pattern built specifically to prevent connection leaks during Next.js serverless hot reloads.",
        category: "Database",
        badge: "Atlas Connected",
        icon: "🍃",
        details:
            "Utilizes global.mongooseCache to keep the socket alive across serverless API invocations and edge runtime boundaries without reconnect overhead.",
        codeSnippet: `// lib/db.ts
let cached = global.mongooseCache || { conn: null, promise: null };
if (!cached.promise) {
    cached.promise = mongoose.connect(uri, { bufferCommands: false });
}`,
        stats: "< 5ms Socket Cache",
    },
    {
        id: "bcrypt-hash",
        title: "Bcrypt Salting Engine",
        description:
            "Cryptographic 12-round salt hashing that renders brute force dictionary attacks computationally infeasible.",
        category: "Security",
        badge: "12 Rounds",
        icon: "🔐",
        details:
            "Every password submitted via /api/auth/signup is passed through bcrypt.hash with cost factor 12 before persistence to MongoDB.",
        codeSnippet: `// app/api/auth/signup/route.ts
const hashedPassword = await bcrypt.hash(rawPassword, 12);
await User.create({ email, password: hashedPassword });`,
        stats: "12 Hash Rounds",
    },
    {
        id: "app-router",
        title: "Next.js 16 App Router",
        description:
            "Route Handlers, React Server Components, and zero-client-overhead streaming architecture with clean separation of concerns.",
        category: "Architecture",
        badge: "Next.js 16",
        icon: "⚡",
        details:
            "Combines server-side validation with instant client-side feedback for the signup and login experiences.",
        codeSnippet: `// app/api/auth/me/route.ts
export async function GET() {
    const payload = await getCurrentUser();
    if (!payload) return NextResponse.json({ success: false }, { status: 401 });
    return NextResponse.json({ success: true, user: payload });
}`,
        stats: "Zero Layout Shift",
    },
    {
        id: "rbac-roles",
        title: "Role-Based Access Control",
        description:
            "Extensible user roles ('user' | 'admin') stored directly in Mongoose schema for easy permissions verification across endpoints.",
        category: "Architecture",
        badge: "Extensible",
        icon: "👥",
        details:
            "User documents contain typed roles that can be inspected in server routes or middleware to restrict sensitive administrative actions.",
        codeSnippet: `// models/User.ts
role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
}`,
        stats: "2 Defined Roles",
    },
    {
        id: "api-endpoints",
        title: "Modular REST API Suite",
        description:
            "Complete authentication endpoints including Signup, Login, Logout, and Session Verification with standard HTTP status codes.",
        category: "API",
        badge: "RESTful",
        icon: "🚀",
        details:
            "Returns standardized JSON responses: 200 (Success), 201 (Created), 400 (Bad Request), 401 (Unauthorized), 409 (Conflict), and 500 (Internal Error).",
        codeSnippet: `POST /api/auth/signup  -> 201 Created
POST /api/auth/login   -> 200 OK (Set Cookie)
POST /api/auth/logout  -> 200 OK (Clear Cookie)
GET  /api/auth/me      -> 200 OK (User Profile)`,
        stats: "4 Core Endpoints",
    },
];

const CATEGORIES = ["All", "Security", "Database", "Architecture", "API"] as const;

export default function ExplorePage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("All");
    const [activeModalItem, setActiveModalItem] = useState<FeatureItem | null>(null);

    const filteredItems = useMemo(() => {
        return EXPLORE_ITEMS.filter((item) => {
            const matchesCategory =
                selectedCategory === "All" || item.category === selectedCategory;
            const matchesSearch =
                item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                item.badge.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [searchQuery, selectedCategory]);

    return (
        <div className="flex-1 flex flex-col min-h-screen">
            {/* Hero Header */}
            <section className="relative overflow-hidden py-16 sm:py-20 border-b border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-indigo-50/50 via-purple-50/20 to-transparent dark:from-indigo-950/20 dark:via-purple-950/10 dark:to-transparent">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-sm">
                        <span>✨</span>
                        <span>System Capabilities & Architecture</span>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Explore{" "}
                        <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                            AuthFlow
                        </span>{" "}
                        Architecture
                    </h1>

                    <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Inspect the security protocols, database models, session mechanics, and RESTful APIs powering this Next.js full-stack system.
                    </p>

                    {/* Search & Filter Bar */}
                    <div className="max-w-xl mx-auto pt-6 space-y-4">
                        <div className="relative">
                            <svg
                                className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            <input
                                type="text"
                                placeholder="Search features, protocols, tokens, schemas..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-11 pr-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 px-2 py-1 rounded-md"
                                >
                                    Clear
                                </button>
                            )}
                        </div>

                        {/* Filter Tabs */}
                        <div className="flex flex-wrap items-center justify-center gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                                        selectedCategory === cat
                                            ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                                            : "bg-white dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700"
                                    }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Cards Grid */}
            <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
                {filteredItems.length === 0 ? (
                    <div className="text-center py-16 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-xl">
                            🔍
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            No matching features found
                        </h3>
                        <p className="text-sm text-zinc-500 max-w-sm mx-auto">
                            We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try searching for &quot;JWT&quot;, &quot;Mongoose&quot;, or &quot;bcrypt&quot;.
                        </p>
                        <button
                            onClick={() => {
                                setSearchQuery("");
                                setSelectedCategory("All");
                            }}
                            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                        >
                            Reset filters
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.map((item) => (
                            <div
                                key={item.id}
                                className="group relative flex flex-col justify-between p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-indigo-300 dark:hover:border-indigo-800 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                                            {item.icon}
                                        </div>
                                        <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/60 dark:border-indigo-800/60">
                                            {item.badge}
                                        </span>
                                    </div>

                                    <div className="space-y-1.5">
                                        <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-6 mt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                                    <span className="text-xs font-semibold text-zinc-500 font-mono">
                                        {item.stats}
                                    </span>
                                    <button
                                        onClick={() => setActiveModalItem(item)}
                                        className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors"
                                    >
                                        View Specs
                                        <svg
                                            className="w-3.5 h-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Live Sandbox Quick Links */}
                <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-transparent border border-indigo-200/60 dark:border-indigo-900/50 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="space-y-2 text-center md:text-left">
                        <h3 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
                            Ready to test the live authentication?
                        </h3>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl">
                            Try creating a test user in real-time. The application will validate your input, encrypt your password with bcrypt, save your record in MongoDB Atlas, and generate your 7-day session token.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                        <Link
                            href="/signup"
                            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md shadow-indigo-600/20 transition-all"
                        >
                            Create Account
                        </Link>
                        <Link
                            href="/dashboard"
                            className="px-5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-700 font-medium text-sm transition-colors"
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                </div>
            </main>

            {/* Spec / Code Details Modal */}
            {activeModalItem && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/60 backdrop-blur-sm animate-in fade-in duration-200"
                    onClick={() => setActiveModalItem(null)}
                >
                    <div
                        className="w-full max-w-xl bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-150"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-2xl">
                                    {activeModalItem.icon}
                                </div>
                                <div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                                        {activeModalItem.category} Specs
                                    </span>
                                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                                        {activeModalItem.title}
                                    </h3>
                                </div>
                            </div>
                            <button
                                onClick={() => setActiveModalItem(null)}
                                className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="space-y-2">
                            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                Implementation Details
                            </h4>
                            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                                {activeModalItem.details}
                            </p>
                        </div>

                        {activeModalItem.codeSnippet && (
                            <div className="space-y-2">
                                <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                                    Source Snippet
                                </h4>
                                <pre className="p-4 rounded-xl bg-zinc-950 text-zinc-100 font-mono text-xs overflow-x-auto border border-zinc-800 leading-relaxed">
                                    <code>{activeModalItem.codeSnippet}</code>
                                </pre>
                            </div>
                        )}

                        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
                            <span className="text-xs text-zinc-500">
                                Status: <strong className="text-emerald-500 font-semibold">{activeModalItem.badge}</strong>
                            </span>
                            <button
                                onClick={() => setActiveModalItem(null)}
                                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-700 transition-colors"
                            >
                                Close Specs
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
