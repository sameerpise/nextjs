"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";

interface UserProfile {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt?: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await fetch("/api/auth/me");
                if (res.status === 401) {
                    router.push("/login");
                    return;
                }

                const data = await res.json();
                if (data.success && data.user) {
                    setUser(data.user);
                } else {
                    setError("Failed to load user profile");
                }
            } catch (err) {
                console.error("Dashboard error:", err);
                setError("Unable to connect to server");
            } finally {
                setLoading(false);
            }
        }

        fetchUser();
    }, [router]);

    if (loading) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
                <div className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400">
                    <svg
                        className="animate-spin h-6 w-6 text-indigo-600"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                    <span className="text-base font-medium">Verifying session...</span>
                </div>
            </div>
        );
    }

    if (error || !user) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center mx-auto text-xl">
                    ⚠️
                </div>
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Authentication Required
                </h1>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
                    {error || "You must be signed in to view your dashboard."}
                </p>
                <Link
                    href="/login"
                    className="inline-flex px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
                >
                    Sign In
                </Link>
            </div>
        );
    }

    const initials = user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

    const formattedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
          })
        : "Recently";

    return (
        <div className="flex-1 max-w-5xl w-full mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-8">
            {/* Top Welcome Banner */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-transparent border border-indigo-200/50 dark:border-indigo-900/40">
                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center text-xl font-bold shadow-lg shadow-indigo-600/20">
                        {initials}
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-zinc-50">
                                {user.name}
                            </h1>
                            <span className="text-xs uppercase tracking-wider font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                                {user.role}
                            </span>
                        </div>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            {user.email}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <LogoutButton />
                </div>
            </div>

            {/* Dashboard Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Account Status
                    </span>
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                            Active & Verified
                        </p>
                    </div>
                    <p className="text-xs text-zinc-500">
                        Authenticated via JWT cookie
                    </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Member Since
                    </span>
                    <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                        {formattedDate}
                    </p>
                    <p className="text-xs text-zinc-500">
                        Database ID: <span className="font-mono text-[11px]">{user.id.slice(0, 10)}...</span>
                    </p>
                </div>

                <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                        Security Level
                    </span>
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                        </svg>
                        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                            Bcrypt + HTTP-Only
                        </p>
                    </div>
                    <p className="text-xs text-zinc-500">
                        Strict Lax cookie session
                    </p>
                </div>
            </div>

            {/* Quick Actions / Integration Info */}
            <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800 shadow-sm space-y-4">
                <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    Session & Architecture Details
                </h2>
                <div className="divide-y divide-zinc-200 dark:divide-zinc-800 text-sm">
                    <div className="py-3 flex justify-between">
                        <span className="text-zinc-500">Session Cookie</span>
                        <span className="font-mono text-zinc-900 dark:text-zinc-100">auth_token (HttpOnly, SameSite=Lax)</span>
                    </div>
                    <div className="py-3 flex justify-between">
                        <span className="text-zinc-500">Token Duration</span>
                        <span className="font-mono text-zinc-900 dark:text-zinc-100">7 Days (Stateless JWT)</span>
                    </div>
                    <div className="py-3 flex justify-between">
                        <span className="text-zinc-500">Database Connection</span>
                        <span className="font-mono text-zinc-900 dark:text-zinc-100">Mongoose Global Singleton Cache</span>
                    </div>
                    <div className="py-3 flex justify-between">
                        <span className="text-zinc-500">User Role</span>
                        <span className="font-mono text-indigo-600 dark:text-indigo-400 capitalize">{user.role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
