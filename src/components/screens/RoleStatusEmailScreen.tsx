/**
 * Screen 17: Role Status Email
 * Perspective: Alex (Customer)
 * Fidelity: Low — wireframe email client mock (Figma node 30348:30376)
 */

import styles from './RoleStatusEmailScreen.module.css';
import NotLbpRibbon from '../NotLbpRibbon/NotLbpRibbon';

const imgAttachment = '/attachment-small.svg';

interface EmailRow {
  selected?: boolean;
  hasAttachment?: boolean;
}

const EMAIL_ROWS: EmailRow[] = [
  {},
  { selected: true, hasAttachment: true },
  {},
  {},
  {},
  {},
];

export default function RoleStatusEmailScreen() {
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

        {/* Email client shell */}
        <div className={styles.browser}>

          {/* Email app nav bar */}
          <div className={styles.emailNav}>
            <div className={styles.navLogo} />
            <div className={styles.navIcons}>
              <div className={styles.navIconSm} />
              <div className={styles.navIconSm} />
              <div className={styles.navIconLg} />
            </div>
          </div>

          {/* Three-panel body */}
          <div className={styles.body}>

            {/* Left folder sidebar */}
            <div className={styles.folderSidebar}>
              <div className={styles.folderGroup}>
                <div className={styles.folderBar} />
              </div>
              <div className={styles.folderGroup}>
                <div className={styles.folderBar} />
                <div className={styles.folderBar} />
                <div className={`${styles.folderBar} ${styles.folderBarActive}`} />
                <div className={styles.folderBar} />
                <div className={styles.folderBar} />
              </div>
              <div className={styles.folderGroup}>
                <div className={styles.folderBar} />
                <div className={styles.folderBar} />
                <div className={styles.folderBar} />
                <div className={styles.folderBar} />
                <div className={styles.folderBar} />
              </div>
            </div>

            {/* Center email list */}
            <div className={styles.emailListPane}>
              <div className={styles.listHeader}>
                <div className={styles.filterBar} />
              </div>
              {EMAIL_ROWS.map((row, i) => (
                <div key={i} className={`${styles.emailRow} ${row.selected ? styles.emailRowSelected : ''}`}>
                  <div className={styles.avatar} />
                  <div className={styles.emailMeta}>
                    <div
                      className={styles.emailBarLong}
                      style={{ background: row.selected ? '#C0D1E2' : '#E9E5DF' }}
                    />
                    <div
                      className={styles.emailBarShort}
                      style={{ background: row.selected ? '#C0D1E2' : '#E9E5DF' }}
                    />
                    {row.hasAttachment && (
                      <img src={imgAttachment} alt="" className={styles.attachIcon} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Right reading pane */}
            <div className={styles.readingPane}>
              <div className={styles.readingBody}>
                <div className={styles.subjectBar} />
                <div className={styles.bodyBlock}>
                  <div className={styles.bodyBar} style={{ width: '100%' }} />
                  <div className={styles.bodyBar} style={{ width: '100%' }} />
                  <div className={styles.bodyBar} style={{ width: '100%' }} />
                  <div className={styles.bodyBar} style={{ width: '55%' }} />
                </div>
              </div>
            </div>

          </div>
        </div>

        <NotLbpRibbon />
      </div>
    </div>
  );
}
