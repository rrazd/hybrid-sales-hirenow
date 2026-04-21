/**
 * Screen 2: Plan Selection
 * Perspective: Alex (LinkedIn Customer)
 * Fidelity: Low — no clickable hotspots, control panel nav only.
 *
 * Figma node 0:19053.
 * Single wide pill progress bar (no stepper).
 * Two plan selection cards side by side — left blank (lo-fi), right shows "Full service hiring".
 */

import { useState } from 'react';
import NotLbpRibbon from '../NotLbpRibbon/NotLbpRibbon';
import styles from './PlanSelectionScreen.module.css';

const imgLiLogo   = '/linkedin-logo.svg';
const imgOval     = '/oval-avatar.svg';
const imgLeftCard = '/plan-left-card.svg';
const imgRadioOuter = '/radio-outer.svg';
const imgRadioInner = '/radio-inner.svg';

const TOTAL_IMGS = 5;

export default function PlanSelectionScreen() {
  const [loadedCount, setLoadedCount] = useState(0);
  const onLoad = () => setLoadedCount(c => c + 1);
  const ready = loadedCount >= TOTAL_IMGS;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.browserWrap}>
        {!ready && <div className={styles.skeleton} />}
        <div className={styles.browser}>
          {/* Top Nav */}
          <div className={styles.topNav}>
            <img src={imgLiLogo} alt="LinkedIn" className={styles.liLogo} onLoad={onLoad} />
            <div className={styles.navRight}>
              <div className={styles.searchBar} />
              <img src={imgOval} alt="" className={styles.avatar} onLoad={onLoad} />
            </div>
          </div>

          {/* Page body */}
          <div className={styles.pageBody}>
            {/* Single wide pill progress bar */}
            <div className={styles.progressBar} />

            {/* Plan selection cards */}
            <div className={styles.cardRow}>
              {/* Left card — blank lo-fi placeholder */}
              <div className={styles.cardLeft}>
                <img src={imgLeftCard} alt="" className={styles.cardImg} onLoad={onLoad} />
              </div>

              {/* Right card — Full service hiring (selected) */}
              <div className={styles.cardRight}>
                <span className={styles.cardTitle}>Full-service hiring</span>
                <div className={styles.radioWrap}>
                  <img src={imgRadioOuter} alt="" className={styles.radioOuter} onLoad={onLoad} />
                  <img src={imgRadioInner} alt="" className={styles.radioInner} onLoad={onLoad} />
                </div>
              </div>
            </div>

            {/* Blank footer button shapes — lo-fi, no interaction */}
            <div className={styles.footerButtons}>
              <div className={styles.btnSecondary} />
              <div className={styles.btnPrimary} />
            </div>
          </div>
        </div>

        <NotLbpRibbon />
      </div>
    </div>
  );
}
