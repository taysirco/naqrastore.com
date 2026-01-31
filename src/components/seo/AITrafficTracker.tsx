'use client';

import { useEffect } from 'react';
import { trackAIReferrer } from '@/lib/ai-traffic-tracking';

/**
 * AITrafficTracker Component
 * Client component that tracks AI referral traffic on mount
 * Place this in your layout to track AI answer engine visitors
 */
export function AITrafficTracker() {
    useEffect(() => {
        // Track on initial page load
        trackAIReferrer();
    }, []);

    // This component doesn't render any UI
    return null;
}

export default AITrafficTracker;
