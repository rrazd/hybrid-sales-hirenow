/**
 * Screen 1: Post a Job
 * Perspective: Alex (LinkedIn Customer)
 * Fidelity: Low — no clickable hotspots, control panel nav only.
 */

import NotLbpRibbon from '../NotLbpRibbon/NotLbpRibbon';
import styles from './PostJobScreen.module.css';

const imgLiLogo = 'https://www.figma.com/api/mcp/asset/72a264bb-b811-4b0e-a4a9-6b6df1f40216';
const imgOval = 'https://www.figma.com/api/mcp/asset/8b35dc2f-fef2-489c-916d-2d9e652e06f4';

export default function PostJobScreen() {
  return (
    <div className={styles.pageWrapper}>
      {/* browserWrap is the relative ancestor for the NOT LBP ribbon */}
      <div className={styles.browserWrap}>
        <div className={styles.browser}>
          {/* Top Nav */}
          <div className={styles.topNav}>
            <img src={imgLiLogo} alt="LinkedIn" className={styles.liLogo} />
            <div className={styles.navRight}>
              <div className={styles.searchBar} />
              <img src={imgOval} alt="Profile" className={styles.avatar} />
            </div>
          </div>

          {/* Page body */}
          <div className={styles.pageBody}>
            {/* Progress stepper */}
            <div className={styles.stepper}>
              <div className={`${styles.stepBar} ${styles.stepActive}`} />
              <div className={`${styles.stepBar} ${styles.stepInactive}`} />
              <div className={`${styles.stepBar} ${styles.stepInactive}`} />
            </div>

            {/* Main content placeholder */}
            <div className={styles.formPlaceholder} />
          </div>

          {/* Footer */}
          <div className={styles.footer}>
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
