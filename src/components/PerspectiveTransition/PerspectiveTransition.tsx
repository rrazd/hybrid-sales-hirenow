import { useEffect, useState } from 'react';
import { personas } from '../../data/personas';
import type { Perspective } from '../../data/flow';
import styles from './PerspectiveTransition.module.css';

interface Props {
  from: Perspective;
  to: Perspective;
  onDone: () => void;
}

export default function PerspectiveTransition({ from, to, onDone }: Props) {
  const [phase, setPhase] = useState<'enter' | 'hold' | 'exit'>('enter');
  const toPersona = personas[to];

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('hold'), 100);
    const t2 = setTimeout(() => setPhase('exit'), 1600);
    const t3 = setTimeout(onDone, 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <div className={`${styles.wrap} ${styles[phase]}`} onClick={onDone} role="status">
      <div className={styles.inner}>
        {/* From persona — fades out */}
        <div className={styles.fromSide}>
          <div className={styles.fromAvatar} style={{ background: personas[from].color }}>
            {from[0]}
          </div>
          <span className={styles.fromName}>{from}</span>
        </div>

        {/* Arrow */}
        <div className={styles.arrow}>→</div>

        {/* To persona — highlighted */}
        <div className={styles.toSide}>
          <div className={styles.toAvatarRing} style={{ borderColor: toPersona.color }}>
            <div className={styles.toAvatar} style={{ background: toPersona.color }}>
              {to[0]}
            </div>
          </div>
          <span className={styles.toName} style={{ color: toPersona.color }}>{to}</span>
        </div>
      </div>

      <p className={styles.label}>
        Now following
        <strong style={{ color: toPersona.color }}> {to}</strong>
      </p>
      <p className={styles.skip}>click to skip</p>
    </div>
  );
}
