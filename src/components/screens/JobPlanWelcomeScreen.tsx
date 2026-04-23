/**
 * Screen 14: Job Plan Welcome
 * Perspective: Alex (Customer)
 * Fidelity: Low — lo-fi browser showing LinkedIn job plan page with FSH welcome state
 */

import styles from './JobPlanWelcomeScreen.module.css';
import NotLbpRibbon from '../NotLbpRibbon/NotLbpRibbon';

const imgOval = '/oval-avatar.svg';

export default function JobPlanWelcomeScreen() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.browserWrap}>

        {/* macOS tab bar */}
        <div className={styles.tabBar}>
          <div className={styles.trafficLights}>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </div>
        </div>

        {/* LinkedIn page */}
        <div className={styles.browser}>

          {/* LinkedIn nav */}
          <div className={styles.linkedInNav}>
            <div className={styles.navLogo} />
            <div className={styles.navIcons}>
              <img src={imgOval} alt="" className={styles.navIcon} />
              <img src={imgOval} alt="" className={styles.navIcon} />
              <img src={imgOval} alt="" className={styles.navIcon} />
              <img src={imgOval} alt="" className={styles.navAvatar} />
            </div>
          </div>

          {/* Three-column body */}
          <div className={styles.body}>

            {/* Left sidebar */}
            <div className={styles.sidebar}>
              <div className={styles.sidebarTop}>
                <div className={styles.filterBar} />
              </div>
              <div className={styles.filterGroup}>
                <div className={styles.filterBar} />
                <div className={styles.filterBar} />
                <div className={`${styles.filterBar} ${styles.filterBarActive}`} />
                <div className={styles.filterBar} />
                <div className={styles.filterBar} />
              </div>
              <div className={styles.filterGroup}>
                <div className={styles.filterBar} />
                <div className={styles.filterBar} />
              </div>
              <div className={styles.filterGroup}>
                <div className={styles.filterBar} />
                <div className={styles.filterBar} />
              </div>
            </div>

            {/* Center: job list */}
            <div className={styles.jobList}>
              {/* Row 1 — inactive */}
              <div className={styles.jobRow}>
                <div className={styles.jobAvatar} />
                <div className={styles.jobBars}>
                  <div className={styles.bar} />
                  <div className={styles.barShort} />
                </div>
              </div>

              {/* Row 2 — FSH active/selected */}
              <div className={`${styles.jobRow} ${styles.jobRowActive}`}>
                <div className={styles.jobAvatar} />
                <div className={styles.jobBars}>
                  <div className={`${styles.bar} ${styles.barBlue}`} />
                  <div className={`${styles.barShort} ${styles.barBlueShort}`} />
                </div>
              </div>

              {/* Rows 3-6 — inactive */}
              {[...Array(4)].map((_, i) => (
                <div key={i} className={styles.jobRow}>
                  <div className={styles.jobAvatar} />
                  <div className={styles.jobBars}>
                    <div className={styles.bar} />
                    <div className={styles.barShort} />
                  </div>
                </div>
              ))}
            </div>

            {/* Right: welcome panel */}
            <div className={styles.welcomePanel}>
              <p className={styles.welcomeHeading}>Alex, welcome to Full-service hiring</p>
              <div className={styles.welcomeBars}>
                <div className={styles.welcomeBar} />
                <div className={styles.welcomeBar} />
                <div className={styles.welcomeBar} />
                <div className={styles.welcomeBarHalf} />
              </div>
              <button className={styles.payNowBtn}>Pay now</button>
            </div>

          </div>
        </div>

        <NotLbpRibbon />
      </div>
    </div>
  );
}
