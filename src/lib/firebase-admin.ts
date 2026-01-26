import { initializeApp, getApps, cert, App } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { getStorage, Storage } from 'firebase-admin/storage';
import { getAuth, Auth } from 'firebase-admin/auth';

let adminApp: App | null = null;
let adminDb: Firestore | null = null;
let adminStorage: Storage | null = null;
let adminAuth: Auth | null = null;

// Only initialize if we have valid credentials (prevents build-time errors)
const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

if (serviceAccountKey && serviceAccountKey !== '{"type":"service_account","project_id":"..."}') {
    try {
        const serviceAccount = JSON.parse(serviceAccountKey);

        if (!getApps().length) {
            adminApp = initializeApp({
                credential: cert(serviceAccount),
                storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            });
        } else {
            adminApp = getApps()[0];
        }

        adminDb = getFirestore(adminApp);
        adminStorage = getStorage(adminApp);
        adminAuth = getAuth(adminApp);
    } catch (error) {
        console.warn('Firebase Admin SDK not initialized:', error);
    }
}

export { adminDb, adminStorage, adminAuth };
export default adminApp;
