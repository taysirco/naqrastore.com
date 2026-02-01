import { NextResponse } from 'next/server';

export async function GET() {
    const vars = {
        FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID, // Should be true (from env)
        FIREBASE_CLIENT_EMAIL: !!process.env.FIREBASE_CLIENT_EMAIL, // Should be true (from secret)
        FIREBASE_PRIVATE_KEY: !!process.env.FIREBASE_PRIVATE_KEY, // Should be true (from secret)
        FIREBASE_PRIVATE_KEY_LENGTH: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.length : 0,
        GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID, // Should be true (from env)
        GOOGLE_SERVICE_ACCOUNT_EMAIL: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, // Should be true (from secret)
        GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY, // Should be true (from secret)
        NODE_ENV: process.env.NODE_ENV,
    };

    return NextResponse.json(vars);
}

export const dynamic = 'force-dynamic';
