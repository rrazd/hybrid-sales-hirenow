/**
 * Screen 5: HireNow CRM — Intake Management
 * Perspective: Amy (LinkedIn Sales Rep)
 * Fidelity: High — full screenshot render.
 *
 * Figma node 0:20244.
 */

import { useState } from 'react';
import NotLbpRibbon from '../NotLbpRibbon/NotLbpRibbon';
import styles from './AmyCRMScreen.module.css';

const imgCRM = '/crm-screenshot.png';
// Amy's photo overlaid on the CRM nav avatar (top-right of the app header)
const imgAmy = '/amy-avatar.png';

export default function AmyCRMScreen() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.browserWrap}>
        {!loaded && <div className={styles.skeleton} />}
        <img src={imgCRM} alt="HireNow CRM — Intake Management" className={styles.screenshot} onLoad={() => setLoaded(true)} />
        {/* Amy's real photo placed over the CRM nav avatar */}
        <img src={imgAmy} alt="Amy" className={styles.navAvatar} />
        {/* First data row overlays — coordinates from Figma node 3:7521, 960×540 canvas */}
        <div className={styles.overlayRect} style={{ left: '16.15%' }} />
        <div className={styles.overlayRect} style={{ left: '42.08%' }} />
        <div className={styles.overlayRect} style={{ left: '67.08%' }} />
        <span className={styles.overlayText} style={{ left: '17.81%' }}>Manager</span>
        <span className={styles.overlayText} style={{ left: '44.27%' }}>Flexis</span>
        <span className={styles.overlayText} style={{ left: '68.65%' }}>Amy Smith</span>
        <NotLbpRibbon />
      </div>
    </div>
  );
}
