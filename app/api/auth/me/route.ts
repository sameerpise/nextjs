import { NextResponse } from "next/server";

import { getCurrentUser } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";

export async function GET() {
    try {
        const payload = await getCurrentUser();

        if (!payload) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Not authenticated",
                },
                { status: 401 }
            );
        }

        await connectDB();
        const user = await User.findById(payload.userId).select("-password").lean();

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            user: {
                id: user._id.toString(),
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error("Auth check error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Authentication check failed",
            },
            { status: 500 }
        );
    }
}
