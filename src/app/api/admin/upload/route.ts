import { NextRequest, NextResponse } from 'next/server';

// ============================================
// Image Upload API
// For now, this is a placeholder that returns a mock URL
// In production, integrate with Firebase Storage or Cloudinary
// ============================================

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: 'No file provided' }, { status: 400 });
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 5MB)' }, { status: 400 });
        }

        // ============================================
        // PLACEHOLDER: Return a mock URL
        // In production, upload to Firebase Storage:
        // ============================================
        /*
        import { adminStorage } from '@/lib/firebase-admin';
        
        const bucket = adminStorage.bucket();
        const fileName = `products/${Date.now()}-${file.name}`;
        const fileRef = bucket.file(fileName);
        
        const buffer = Buffer.from(await file.arrayBuffer());
        await fileRef.save(buffer, {
            contentType: file.type,
            metadata: {
                cacheControl: 'public, max-age=31536000',
            },
        });
        
        await fileRef.makePublic();
        const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
        */

        // For now, create a data URL (works for small images)
        const buffer = await file.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const mimeType = file.type;
        const dataUrl = `data:${mimeType};base64,${base64}`;

        // Or return a placeholder image URL for larger files
        const url = file.size > 100 * 1024
            ? `https://placehold.co/800x800/EEE/31343C?text=${encodeURIComponent(file.name.slice(0, 10))}`
            : dataUrl;

        return NextResponse.json({
            success: true,
            url,
            fileName: file.name,
            fileSize: file.size,
            fileType: file.type,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
}
