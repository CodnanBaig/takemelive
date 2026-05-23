'use client';

import Spline from '@splinetool/react-spline';
import type { Application } from '@splinetool/runtime';
import { useCallback } from 'react';
import styles from './SplineScene.module.scss';

/** Self-hosted scene with watermark PNG patched via scripts/patch-spline-watermark.mjs */
export const SPLINE_SCENE_URL = '/assets/spline/footer-scene.splinecode';

const WATERMARK_NAMES = ['SplineWatermark', 'logo', 'Logo'] as const;
const WATERMARK_IDS = ['86971d59-d052-4c33-b5db-25b06ba0d0b5'] as const;

function hideWatermarkObjects(app: Application) {
  for (const id of WATERMARK_IDS) {
    app.findObjectById(id)?.hide();
  }

  for (const name of WATERMARK_NAMES) {
    app.findObjectByName(name)?.hide();
  }

  app.getAllObjects().forEach((object) => {
    if (/watermark/i.test(object.name)) {
      object.hide();
    }
  });
}

export default function SplineScene() {
  const handleLoad = useCallback((app: Application) => {
    const hide = () => hideWatermarkObjects(app);
    hide();
    window.requestAnimationFrame(hide);
    window.setTimeout(hide, 250);
  }, []);

  return (
    <div className={styles.canvasHost}>
      <Spline scene={SPLINE_SCENE_URL} className={styles.spline} onLoad={handleLoad} />
    </div>
  );
}
