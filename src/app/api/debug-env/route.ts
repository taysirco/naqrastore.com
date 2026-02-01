import { NextResponse } from 'next/server';
import { GoogleAuth } from 'google-auth-library';

export async function GET() {
    const vars = {
        FIREBASE_PROJECT_ID: !!process.env.FIREBASE_PROJECT_ID, // Should be true (from env)
        FIREBASE_DATABASE_ID: !!process.env.FIREBASE_DATABASE_ID, // Should be true (from env)
        FIREBASE_CLIENT_EMAIL: !!process.env.FIREBASE_CLIENT_EMAIL, // Should be true (from secret)
        FIREBASE_PRIVATE_KEY: !!process.env.FIREBASE_PRIVATE_KEY, // Should be true (from secret)
        FIREBASE_PRIVATE_KEY_LENGTH: process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.length : 0,
        GOOGLE_SHEET_ID: !!process.env.GOOGLE_SHEET_ID, // Should be true (from env)
        GOOGLE_SERVICE_ACCOUNT_EMAIL: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, // Should be true (from secret)
        GOOGLE_PRIVATE_KEY: !!process.env.GOOGLE_PRIVATE_KEY, // Should be true (from secret)
        NODE_ENV: process.env.NODE_ENV,
    };

    let currentIdentity = 'unknown';
    try {
        const auth = new GoogleAuth({
            scopes: ['https://www.googleapis.com/auth/cloud-platform']
        });
        const client = await auth.getCredentials();
        currentIdentity = client.client_email || 'could-not-determine';

        // If client_email is undefined (common in some compute envs), try metadata server check manually? 
        // For now, let's rely on auth lib or just print "auth library loaded without error"
        if (!currentIdentity) {
            // Fallback: mostly for local/compute engine, sometimes it's undefined in ADC
            currentIdentity = 'ADC loaded but no client_email found';
        }
    } catch (error: any) {
        currentIdentity = `Error: ${error.message}`;
    }

    return NextResponse.json({ ...vars, currentIdentity });
}

export const dynamic = 'force-dynamic';
