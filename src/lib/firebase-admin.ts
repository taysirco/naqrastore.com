import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';
import { getAuth, Auth } from 'firebase-admin/auth';

let adminApp: App | null = null;
let adminDb: Firestore | null = null;
let adminStorage: Storage | null = null;
let adminAuth: Auth | null = null;

// Use individual environment variables for cleaner configuration
const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined;
const databaseId = process.env.FIREBASE_DATABASE_ID || '(default)';

if (projectId && clientEmail && privateKey) {
    try {
        if (!getApps().length) {
            adminApp = initializeApp({
                credential: cert({
                    projectId,
                    clientEmail,
                    privateKey,
                }),
                storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            });
        } else {
            adminApp = getApps()[0];
        }

        // Use custom database ID if specified
        adminDb = getFirestore(adminApp, databaseId);
        adminStorage = getStorage(adminApp);
        adminAuth = getAuth(adminApp);
    } catch (error) {
        console.error('Firebase Admin SDK initialization failed:', error);
    }
} else {
    console.warn('Firebase Admin SDK skpped: Missing environment variables');
    if (!projectId) console.warn('- Missing FIREBASE_PROJECT_ID');
    if (!clientEmail) console.warn('- Missing FIREBASE_CLIENT_EMAIL');
    if (!privateKey) console.warn('- Missing FIREBASE_PRIVATE_KEY');
}

export { adminDb, adminStorage, adminAuth };
export default adminApp;
