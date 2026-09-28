import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { SidebarProvider } from "@/components/SidebarProvider";
import { CartProvider } from "@/app/context/cartcontext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AuthFlow - Secure Authentication System",
  description: "Next.js App Router authentication with Mongoose, bcrypt, and JWT cookies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 font-sans">
        <CartProvider>
          <SidebarProvider>
            <Navbar />
            <main className="flex-1 flex flex-col">{children}</main>
          </SidebarProvider>
        </CartProvider>
      </body>
    </html>
  );
}
