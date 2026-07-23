import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Take Me Live — live experience studio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px 78px',
          background: '#0e0e0e',
          color: '#f5f5f0',
          fontFamily: 'Arial',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 28,
            letterSpacing: '0.28em',
            color: '#d5ff3f',
          }}
        >
          TAKE ME LIVE
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 74,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              fontWeight: 700,
            }}
          >
            <span style={{ display: 'flex' }}>Live experiences,</span>
            <span style={{ display: 'flex' }}>made unforgettable.</span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              lineHeight: 1.35,
              color: '#b5b5ad',
            }}
          >
            Immersive productions · cultural moments · stadium-scale spectacle
          </div>
        </div>
      </div>
    ),
    size,
  );
}
