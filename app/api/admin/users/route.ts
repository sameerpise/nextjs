import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { getCurrentUser } from "@/lib/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
    try {
        const payload = await getCurrentUser();

        // Check if the requester is authenticated and is an admin
        if (!payload || payload.role !== "admin") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Forbidden: Admin access required",
                },
                { status: 403 }
            );
        }

        const body = await req.json();
        const { name, email, password, role } = body;

        // Validation: required fields
        if (!name || !email || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Full name, email, and password are required",
                },
                { status: 400 }
            );
        }

        const trimmedName = typeof name === "string" ? name.trim() : "";
        const normalizedEmail = typeof email === "string" ? email.toLowerCase().trim() : "";
        const rawPassword = typeof password === "string" ? password : "";
        const assignedRole = role === "admin" ? "admin" : "user";

        // Name validation
        if (trimmedName.length < 2 || trimmedName.length > 50) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Name must be between 2 and 50 characters",
                },
                { status: 400 }
            );
        }

        // Email format validation
        if (!EMAIL_REGEX.test(normalizedEmail)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter a valid email address",
                },
                { status: 400 }
            );
        }

        // Password length validation
        if (rawPassword.length < 6) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password must be at least 6 characters long",
                },
                { status: 400 }
            );
        }

        // Connect to MongoDB
        await connectDB();

        // Check if user already exists
        const existingUser = await User.findOne({
            email: normalizedEmail,
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "An account with this email already exists",
                },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(rawPassword, 12);

        // Create user in database
        const user = await User.create({
            name: trimmedName,
            email: normalizedEmail,
            password: hashedPassword,
            role: assignedRole,
        });

        return NextResponse.json(
            {
                success: true,
                message: "User created successfully",
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Admin user creation error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "An unexpected error occurred while creating the account",
            },
            { status: 500 }
        );
    }
}
