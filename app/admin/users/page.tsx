"use client";

import { FormEvent, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminCreateUserPage() {
    const router = useRouter();
    
    // Form state
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
    });

    const [loading, setLoading] = useState(false);
    const [checkingAuth, setCheckingAuth] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // Verify admin status on mount
    useEffect(() => {
        async function checkAdminStatus() {
            try {
                const response = await fetch("/api/auth/me");
                const data = await response.json();
                
                if (!response.ok || !data.user || data.user.role !== "admin") {
                    router.push("/dashboard");
                } else {
                    setCheckingAuth(false);
                }
            } catch (err) {
                router.push("/dashboard");
            }
        }
        
        checkAdminStatus();
    }, [router]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        if (error) setError("");
        if (success) setSuccess("");
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        if (!form.name.trim() || !form.email.trim() || !form.password) {
            setError("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const response = await fetch("/api/admin/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || "Failed to create user.");
                return;
            }

            setSuccess(`User ${data.user.name} created successfully!`);
            setForm({
                name: "",
                email: "",
                password: "",
                role: "user",
            });
        } catch (err) {
            console.error("User creation network error:", err);
            setError("Unable to connect to the server.");
        } finally {
            setLoading(false);
        }
    }

    if (checkingAuth) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="animate-spin h-8 w-8 text-indigo-600 rounded-full border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg space-y-8">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
                        Admin Control Panel
                    </h1>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        Create new user accounts.
                    </p>
                </div>

                <div className="bg-white dark:bg-zinc-900/90 border border-zinc-200/80 dark:border-zinc-800 rounded-2xl shadow-xl shadow-zinc-950/5 p-6 sm:p-8 backdrop-blur-xl">
                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                        {error && (
                            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/50 text-red-700 dark:text-red-300 text-sm">
                                <span>{error}</span>
                            </div>
                        )}

                        {success && (
                            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-sm">
                                <span>{success}</span>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                Full Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                required
                                placeholder="John Doe"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="john@example.com"
                                value={form.email}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                Password
                            </label>
                            <input
                                name="password"
                                type="text"
                                required
                                placeholder="••••••••"
                                value={form.password}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm"
                            />
                        </div>
                        
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                                Role
                            </label>
                            <select
                                name="role"
                                value={form.role}
                                onChange={handleChange}
                                className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all text-sm"
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full mt-4 flex items-center justify-center py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-600/25 transition-all hover:shadow-indigo-600/35 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-60 cursor-pointer"
                        >
                            {loading ? "Creating..." : "Create User"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
