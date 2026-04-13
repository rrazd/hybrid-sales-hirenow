/**
 * Screen 4: Job Plan Page
 * Perspective: Alex (LinkedIn Customer)
 * Fidelity: Low — no clickable hotspots, control panel nav only.
 *
 * Figma node 0:18968.
 * 3 stacked cards: info banner, job card (Accountant), and a 4-row status table.
 * Text labels and status badges are part of the lo-fi design — kept as-is.
 */

import NotLbpRibbon from '../NotLbpRibbon/NotLbpRibbon';
import styles from './JobPlanScreen.module.css';

const imgLiLogo = 'https://www.figma.com/api/mcp/asset/ed972e76-6b27-4ddb-b7e0-8e264fad03f7';
const imgOval   = 'https://www.figma.com/api/mcp/asset/06d349bc-eb95-4296-b6b0-47df1a5dd783';

function StatusBadge({ label }: { label: string }) {
  return <span className={styles.badge}>{label}</span>;
}

export default function JobPlanScreen() {
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

            {/* Card 1 — Info banner */}
            <div className={styles.card}>
              <p className={styles.cardHeading}>A LinkedIn hiring expert will call you within 24 hrs</p>
              <div className={styles.warmBar} style={{ width: 354 }} />
              <div className={styles.warmBar} style={{ width: 354 }} />
            </div>

            {/* Card 2 — Job card */}
            <div className={styles.card}>
              <div className={styles.jobIconPlaceholder} />
              <p className={styles.cardHeading}>Accountant</p>
              <div className={styles.warmBar} style={{ width: 246 }} />
              <div className={styles.warmBar} style={{ width: 246 }} />
            </div>

            {/* Card 3 — 4-row status table */}
            <div className={`${styles.card} ${styles.tableCard}`}>
              <div className={styles.tableRow}>
                <div className={styles.bluePill} />
                <StatusBadge label="Pending" />
              </div>
              <div className={styles.tableRow}>
                <div className={styles.bluePill} />
                <StatusBadge label="Pending" />
              </div>
              <div className={styles.tableRow}>
                <div className={styles.bluePill} />
                <StatusBadge label="Not started" />
              </div>
              <div className={`${styles.tableRow} ${styles.tableRowLast}`}>
                <p className={styles.cardHeading} style={{ margin: 0 }}>Hire and pay</p>
                <StatusBadge label="Not started" />
              </div>
            </div>

          </div>
        </div>

        <NotLbpRibbon />
      </div>
    </div>
  );
}
