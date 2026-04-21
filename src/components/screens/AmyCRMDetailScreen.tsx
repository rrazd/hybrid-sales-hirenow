/**
 * Screen 6: HireNow CRM — Lead Detail
 * Perspective: Amy (LinkedIn Sales Rep)
 * Fidelity: High — screenshot with overlays.
 *
 * Figma node 0:20700, canvas 950×533.
 */

import { useState } from 'react';
import NotLbpRibbon from '../NotLbpRibbon/NotLbpRibbon';
import styles from './AmyCRMDetailScreen.module.css';

const imgBackground = '/crm-detail-bg.png';
const imgExternalIcon = 'https://www.figma.com/api/mcp/asset/27f853cf-8d03-418d-8ba2-512a6b7589a3';
const imgAmy = '/amy-avatar.png';

// Gray placeholder rects — Figma px → % of 950×533 canvas
const grayRects = [
  { left: '20.95%', top:  '9.76%', width: '18.11%', height: '3.19%' }, // Company Name field
  { left:  '8.32%', top: '13.88%', width: '26.11%', height: '3.19%' }, // sub-field row
  { left:  '7.37%', top: '29.46%', width:  '5.05%', height: '2.81%' }, // Job Post
  { left: '22.53%', top: '29.46%', width:  '5.05%', height: '2.81%' }, // Hirer Name
  { left: '41.16%', top: '21.95%', width: '13.05%', height: '1.88%' }, // Hirer Email (label)
  { left: '41.16%', top: '29.08%', width: '13.05%', height: '1.88%' }, // Hirer Email (value)
  { left: '41.16%', top: '31.33%', width: '13.05%', height: '1.88%' }, // LinkedIn Profile
  { left:  '7.37%', top: '36.96%', width:  '5.05%', height: '2.81%' }, // LinkedIn Profile value
  { left: '36.42%', top: '55.35%', width:  '7.05%', height: '1.88%' }, // SSD Rep field
];

export default function AmyCRMDetailScreen() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.browserWrap}>
        {!loaded && <div className={styles.skeleton} />}
        <img src={imgBackground} alt="HireNow CRM — Lead Detail" className={styles.screenshot} onLoad={() => setLoaded(true)} />

        {/* Amy's avatar over nav top-right */}
        <img src={imgAmy} alt="Amy" className={styles.navAvatar} />

        {/* Gray knockout rects obscuring sensitive data */}
        {grayRects.map((rect, i) => (
          <div key={i} className={styles.grayRect} style={rect} />
        ))}

        {/* "Create quote in Solution Builder" — exact Figma node 0:20702 */}
        <div className={styles.linkGroup}>
          <span className={styles.linkText}>Create quote in Solution Builder</span>
          {/* 16×16 icon container, 13×13 image inset at left:3px top:1px */}
          <div className={styles.linkIconWrap}>
            <div className={styles.linkIconInner}>
              <img src={imgExternalIcon} alt="" className={styles.linkIconImg} />
            </div>
          </div>
        </div>

        <NotLbpRibbon />
      </div>
    </div>
  );
}
