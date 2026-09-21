import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { createToken } from "@/lib/auth";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { name, email, password } = body;

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

        if (rawPassword.length > 72) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Password must be 72 characters or fewer",
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
            role: "user",
        });

        // Generate JWT token
        const token = createToken({
            userId: user._id.toString(),
            email: user.email,
            role: user.role,
            name: user.name,
        });

        // Set response and HTTP-only authentication cookie
        const response = NextResponse.json(
            {
                success: true,
                message: "Account created successfully",
                user: {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
            { status: 201 }
        );

        response.cookies.set({
            name: "auth_token",
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: "/",
        });

        return response;
    } catch (error) {
        console.error("Signup error:", error);

        return NextResponse.json(
            {
                success: false,
                message: "An unexpected error occurred while creating your account",
            },
            { status: 500 }
        );
    }
}
