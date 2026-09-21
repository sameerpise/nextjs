import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export interface AuthPayload {
    userId: string;
    email: string;
    role: string;
    name?: string;
}

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }
    return secret;
}

export function createToken(payload: AuthPayload): string {
    const secret = getJwtSecret();
    return jwt.sign(payload, secret, {
        expiresIn: "7d",
    });
}

export function verifyToken(token: string): AuthPayload {
    const secret = getJwtSecret();
    return jwt.verify(token, secret) as unknown as AuthPayload;
}

export async function getCurrentUser(): Promise<AuthPayload | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        if (!token) {
            return null;
        }

        return verifyToken(token);
    } catch {
        return null;
    }
}
