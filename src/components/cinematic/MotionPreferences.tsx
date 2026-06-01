'use client';

import { useEffect } from 'react';
import { applyMotionPreferenceClass, subscribeMotionPreference } from '@/lib/motionPrefs';

export default function MotionPreferences() {
  useEffect(() => {
    applyMotionPreferenceClass();
    return subscribeMotionPreference(() => {});
  }, []);

  return null;
}
