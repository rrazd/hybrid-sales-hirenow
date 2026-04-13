/**
 * Screen 2: Plan Selection
 * Perspective: Alex (LinkedIn Customer)
 * Fidelity: Low — no clickable hotspots, control panel nav only.
 *
 * Figma node 0:19053.
 * Single wide pill progress bar (no stepper).
 * Two plan selection cards side by side — left blank (lo-fi), right shows "Full service hiring".
 */

import NotLbpRibbon from '../NotLbpRibbon/NotLbpRibbon';
import styles from './PlanSelectionScreen.module.css';

const imgLiLogo   = 'https://www.figma.com/api/mcp/asset/33a0fea2-cb9b-4f02-b5de-8de8e1f56fd1';
const imgOval     = 'https://www.figma.com/api/mcp/asset/ced5659c-ee25-4b9a-be5d-e630af5693f4';
const imgLeftCard = 'https://www.figma.com/api/mcp/asset/90df0103-9956-4b00-9126-3e83608ba625';
const imgRadioOuter = 'https://www.figma.com/api/mcp/asset/93bd0089-3246-40d8-aceb-8affe98ff85b';
const imgRadioInner = 'https://www.figma.com/api/mcp/asset/68113085-97dd-47d6-a506-6c627e96223b';

export default function PlanSelectionScreen() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.browserWrap}>
        <div className={styles.browser}>
          {/* Top Nav */}
          <div className={styles.topNav}>
            <img src={imgLiLogo} alt="LinkedIn" className={styles.liLogo} />
            <div className={styles.navRight}>
              <div className={styles.searchBar} />
              <img src={imgOval} alt="" className={styles.avatar} />
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
                <img src={imgLeftCard} alt="" className={styles.cardImg} />
              </div>

              {/* Right card — Full service hiring (selected) */}
              <div className={styles.cardRight}>
                <span className={styles.cardTitle}>Full service hiring</span>
                <div className={styles.radioWrap}>
                  <img src={imgRadioOuter} alt="" className={styles.radioOuter} />
                  <img src={imgRadioInner} alt="" className={styles.radioInner} />
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
