import {
  TML_MARK_BOUNDS,
  TML_MARK_COLORS,
  TML_MARK_PATHS,
  TML_MARK_SEAM_X,
  TML_MARK_VIEWBOX,
} from '@/components/home/TransitionMark';
import { TRANSITION_BURST, type ShardClip } from '@/lib/transitionShrapnel';
import styles from './Transition.module.scss';

const CLIP_URL: Record<Exclude<ShardClip, 'none'>, string> = {
  left: 'url(#tml-clip-left)',
  right: 'url(#tml-clip-right)',
};

export default function TransitionLogoBurst() {
  return (
    <div className={styles.logoBurst} aria-hidden>
      <svg
        className={styles.assembledMark}
        viewBox={TML_MARK_VIEWBOX}
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="tml-clip-left">
            <rect
              x={TML_MARK_BOUNDS.x}
              y={TML_MARK_BOUNDS.y}
              width={TML_MARK_SEAM_X - TML_MARK_BOUNDS.x}
              height={TML_MARK_BOUNDS.height}
            />
          </clipPath>
          <clipPath id="tml-clip-right">
            <rect
              x={TML_MARK_SEAM_X}
              y={TML_MARK_BOUNDS.y}
              width={TML_MARK_BOUNDS.x + TML_MARK_BOUNDS.width - TML_MARK_SEAM_X}
              height={TML_MARK_BOUNDS.height}
            />
          </clipPath>
        </defs>

        {TRANSITION_BURST.map((piece) => (
          <g
            key={piece.id}
            data-shrapnel
            data-shard-id={piece.id}
            clipPath={piece.clip === 'none' ? undefined : CLIP_URL[piece.clip]}
            className={styles.burstPiece}
          >
            <path d={TML_MARK_PATHS[piece.path]} fill={TML_MARK_COLORS[piece.tone]} />
          </g>
        ))}
      </svg>
    </div>
  );
}
