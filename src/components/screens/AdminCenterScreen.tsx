/**
 * Screen 13: Admin Center — Purchases & Payments Overview
 * Perspective: Alex (Customer)
 * Fidelity: High — Admin Center showing the Full-Service Hiring agreement
 */

import styles from './AdminCenterScreen.module.css';
import type { ProductRow } from './SolutionBuilderScreen';

const imgInLogo             = '/admin-in-logo.svg';
const imgQuestionIcon       = '/admin-question-icon.svg';
const imgAlexCircle         = '/alex-avatar.png';
const imgFlexisLogo         = '/flexis-logo.png';
const imgSortSmall          = '/admin-sort-small.svg';
const imgSignalSuccess      = '/admin-signal-success.svg';
const imgFooterLocal        = '/admin-footer-local.svg';
const imgViewAllArrow       = '/admin-viewall-arrow.svg';
const imgSignalSuccessSm    = '/admin-signal-success-sm.svg';
const imgDot                = '/admin-dot.svg';
const imgClockSmall         = '/admin-clock-small.svg';
const imgVisaLogo           = '/admin-visa-logo.svg';
const imgMessagesSmall      = '/admin-messages-small.svg';

const PURCHASES = (roleCount: number) => [
  {
    title: 'Full-Service Hiring',
    statusIcon: imgSignalSuccessSm,
    statusLabel: 'Active',
    statusColor: '#057642',
    roles: roleCount,
    dateStart: 'Feb 22, 2022',
    dateEnd: 'Feb 22, 2023',
  },
  {
    title: 'Full-Service Hiring',
    statusIcon: imgClockSmall,
    statusLabel: 'Expired',
    statusColor: 'rgba(0,0,0,0.6)',
    roles: 5,
    dateStart: 'Mar 22, 2021',
    dateEnd: 'Mar 14, 2021',
  },
];

const TRANSACTIONS = [
  {
    date: 'Jan 22, 2022',
    total: '$10,000.00',
    txId: 'INV12314124302',
    subscription: 'Full-Service Hiring',
  },
  {
    date: 'Jan 14, 2022',
    total: '$25,000.00',
    txId: 'INV12314124301',
    subscription: 'Full-Service Hiring',
  },
];

function CardFooter() {
  return (
    <div className={styles.cardFooter}>
      <img src={imgFooterLocal} alt="" className={styles.footerBg} />
      <div className={styles.viewAllBtn}>
        <span className={styles.viewAllLabel}>View all</span>
        <img src={imgViewAllArrow} alt="" className={styles.viewAllIconImg} />
      </div>
    </div>
  );
}

export default function AdminCenterScreen({
  products = [],
  onNavigate,
}: {
  products?: ProductRow[];
  onNavigate?: (id: string) => void;
}) {
  return (
    <div className={styles.page}>

      {/* ── Global header ──────────────────────────────────── */}
      <header className={styles.globalHeader}>
        <div className={styles.headerLeft}>
          <img src={imgInLogo} alt="LinkedIn" className={styles.headerLogo} />
          <span className={styles.headerTitle}>Admin Center</span>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.navLink}>
            <div className={styles.navIconWrap}>
              <img src={imgQuestionIcon} alt="" className={styles.navIconImg} />
            </div>
          </div>
          <div className={styles.navLink}>
            <div className={styles.navAvatarWrap}>
              <img src={imgAlexCircle} alt="Alex" className={styles.navAvatarImg} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Page body ───────────────────────────────────────── */}
      <div className={styles.body}>

        {/* Left sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <img src={imgAlexCircle} alt="Alex Smith" className={styles.sidebarAvatar} />
            <div className={styles.sidebarProfile}>
              <p className={styles.sidebarName}>Alex Smith</p>
              <p className={styles.sidebarEmail}>asmith@gmail.com</p>
            </div>
          </div>
          <nav className={styles.sidebarNav}>
            {['Overview', 'Purchases', 'Payment methods', 'Transactions'].map((label, i) => (
              <div key={label} className={`${styles.navItem} ${i === 0 ? styles.navItemActive : ''}`}>
                {i === 0 && <div className={styles.navActiveBar} />}
                <span className={styles.navLabel}>{label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className={styles.main}>
          <p className={styles.pageHeading}>Overview</p>

          {/* ── Purchases card ─────────────────────────────── */}
          <div className={styles.card}>
            <div className={styles.cardHeadingRow}>
              <p className={styles.cardHeadingText}>Purchases</p>
            </div>
            <div className={styles.cardDivider} />

            {PURCHASES(products.length || 2).map((p, i) => (
              <div key={i} className={styles.purchaseRow}>
                {/* Title + status */}
                <div className={styles.purchaseTitleRow}>
                  <span
                    className={`${styles.purchaseTitle} ${i === 0 ? styles.purchaseTitleLink : ''}`}
                    onClick={i === 0 ? () => onNavigate?.('admin-center-detail') : undefined}
                  >{p.title}</span>
                  <div className={styles.purchaseStatusGroup}>
                    <div className={styles.statusIconWrap}>
                      <img src={p.statusIcon} alt="" className={styles.statusIconInner} />
                    </div>
                    <span className={styles.statusLabel} style={{ color: p.statusColor }}>
                      {p.statusLabel}
                    </span>
                  </div>
                </div>
                {/* Detail row */}
                <div className={styles.purchaseDetailRow}>
                  <span className={styles.detailText}>Annual agreement (will not auto-renew)</span>
                  <img src={imgDot} alt="" className={styles.dotSep} />
                  <span className={styles.detailText}>{p.roles} roles</span>
                  <img src={imgDot} alt="" className={styles.dotSep} />
                  <span className={styles.detailText}>{p.dateStart}</span>
                  <div className={styles.dateDash} />
                  <span className={styles.detailText}>{p.dateEnd}</span>
                </div>
                <div className={styles.rowDivider} />
              </div>
            ))}

            <CardFooter />
          </div>

          {/* ── Transactions card ───────────────────────────── */}
          <div className={styles.card}>
            <div className={styles.cardHeadingRow}>
              <p className={styles.cardHeadingText}>Transactions</p>
            </div>
            <div className={styles.cardDivider} />

            <table className={styles.table}>
              <thead>
                <tr>
                  {/* Date — first col, left-24 */}
                  <th className={`${styles.th} ${styles.thFirst}`}>
                    <span className={styles.thLabel}>Date</span>
                    <div className={styles.sortWrap}>
                      <img src={imgSortSmall} alt="" className={styles.sortImg} />
                    </div>
                  </th>
                  {/* Total — right-aligned */}
                  <th className={`${styles.th} ${styles.thRight}`}>
                    <span className={styles.thLabel}>Total</span>
                    <div className={styles.sortWrap}>
                      <img src={imgSortSmall} alt="" className={styles.sortImg} />
                    </div>
                  </th>
                  <th className={styles.th}>
                    <span className={styles.thLabel}>Payment method</span>
                    <div className={styles.sortWrap}>
                      <img src={imgSortSmall} alt="" className={styles.sortImg} />
                    </div>
                  </th>
                  <th className={styles.th}>
                    <span className={styles.thLabel}>Invoice number</span>
                    <div className={styles.sortWrap}>
                      <img src={imgSortSmall} alt="" className={styles.sortImg} />
                    </div>
                  </th>
                  <th className={styles.th}>
                    <span className={styles.thLabel}>Status</span>
                    <div className={styles.sortWrap}>
                      <img src={imgSortSmall} alt="" className={styles.sortImg} />
                    </div>
                  </th>
                  <th className={`${styles.th} ${styles.thMuted}`}>
                    <span className={styles.thLabel}>Purchase</span>
                    <div className={styles.sortWrap}>
                      <img src={imgSortSmall} alt="" className={styles.sortImg} />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx, i) => (
                  <tr key={i} className={styles.tr}>
                    <td className={`${styles.td} ${styles.tdFirst}`}>{tx.date}</td>
                    <td className={`${styles.td} ${styles.tdRight}`}>{tx.total}</td>
                    <td className={styles.td}>
                      <div className={styles.methodCell}>
                        <div className={styles.visaCard}>
                          <img src={imgVisaLogo} alt="Visa" className={styles.visaLogoImg} />
                        </div>
                        <span className={styles.methodText}>Visa- 4392</span>
                      </div>
                    </td>
                    <td className={styles.td}>{tx.txId}</td>
                    <td className={styles.td}>
                      <div className={styles.paidCell}>
                        <div className={styles.paidIconWrap}>
                          <img src={imgSignalSuccess} alt="" className={styles.paidIconImg} />
                        </div>
                        <span className={styles.paidLabel}>Paid</span>
                      </div>
                    </td>
                    <td className={styles.td}>
                      <span className={styles.subscriptionLink}>{tx.subscription}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <CardFooter />
          </div>

          {/* ── Help card ───────────────────────────────────── */}
          <div className={styles.helpCard}>
            <img src={imgMessagesSmall} alt="" className={styles.helpIcon} />
            <div className={styles.helpTextBlock}>
              <p className={styles.helpLine1}>Have questions?</p>
              <p className={styles.helpLine2}>Get help</p>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
