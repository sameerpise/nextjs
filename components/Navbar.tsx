"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "./SidebarProvider";
import { useCart } from "../app/context/cartcontext";
export default function Navbar() {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");
    const { toggle, isOpen } = useSidebar();
    const { totalItems } = useCart();
    return (
        <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/75 dark:bg-zinc-950/75 backdrop-blur-md">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    {isDashboard && (
                        <button
                            onClick={toggle}
                            className="p-2 -ml-2 rounded-md text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
                            aria-label="Toggle sidebar"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    )}
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                ></path>
                            </svg>
                        </div>
                        <span className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
                            Auth<span className="text-indigo-600 dark:text-indigo-400">Flow</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex items-center gap-2 sm:gap-4">
                    <Link
                        href="/explore"
                        className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    >
                        Explore
                    </Link>

                    <Link
                        href="/blog"
                        className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    >
                        Blog
                    </Link>
                    <Link
                        href="/product"
                        className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors px-3 py-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    >
                        Products
                    </Link>

                    <Link
                        href="/login"
                        className="text-sm font-medium text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 transition-colors px-3.5 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                    >
                        Sign In
                    </Link>

                    <Link href="/cart">
                        Cart ({totalItems})
                    </Link>

                    <Link
                        href="/signup"
                        className="text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm shadow-indigo-600/20 px-4 py-2 rounded-lg transition-all hover:shadow-indigo-600/30"
                    >
                        Get Started
                    </Link>
                </nav>
            </div>
        </header >
    );
}
