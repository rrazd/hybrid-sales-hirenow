/**
 * Screen 14: Admin Center Detail — Full-Service Hiring Agreement
 * Perspective: Alex (Customer)
 * Fidelity: High — Purchase detail view with roles, billing, and transactions
 */

import styles from './AdminCenterDetailScreen.module.css';

const imgInLogo       = '/admin-in-logo.svg';
const imgQuestionIcon = '/admin-question-icon.svg';
const imgAlexAvatar   = '/alex-avatar.png';
const imgChevronRight = '/admin-detail-chevron-right.svg';
const imgSignalSuccess = '/admin-detail-signal-success.svg';
const imgSignalNotice = '/admin-detail-signal-notice.svg';
const imgOverflow     = '/admin-detail-overflow.svg';
const imgVisaLogo     = '/admin-detail-visa.svg';
const imgFooterLocal  = '/admin-detail-footer.svg';
const imgViewAllArrow = '/admin-detail-viewall-arrow.svg';
const imgMessages     = '/admin-detail-messages.svg';

const NAV_ITEMS = ['Overview', 'Purchases', 'Payment methods', 'Transactions'];
const ACTIVE_NAV = 1; // Purchases

const fmt = (n: number) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

const ROLES = [
  { role: 'Account Executive', feePct: '15%', filled: 4, salary: 97800,  feeAmount: 14670 },
  { role: 'Other roles',       feePct: '25%', filled: 5, salary: 90000,  feeAmount: 22500 },
];

const TRANSACTIONS = [
  { date: 'Mar 15, 2027', total: '$10,000.00', method: 'Visa- 4392', isVisa: true, invoiceNum: 'INV12314124302' },
  { date: 'Jan 10, 2027', total: '$10,000.00', method: 'Visa- 4392', isVisa: true, invoiceNum: 'INV12314124301' },
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

export default function AdminCenterDetailScreen() {
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
              <img src={imgAlexAvatar} alt="Alex" className={styles.navAvatarImg} />
            </div>
          </div>
        </div>
      </header>

      {/* ── Page body ───────────────────────────────────────── */}
      <div className={styles.body}>

        {/* Left sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <img src={imgAlexAvatar} alt="Alex Smith" className={styles.sidebarAvatar} />
            <div className={styles.sidebarProfile}>
              <p className={styles.sidebarName}>Alex Smith</p>
              <p className={styles.sidebarEmail}>asmith@gmail.com</p>
            </div>
          </div>
          <nav className={styles.sidebarNav}>
            {NAV_ITEMS.map((label, i) => (
              <div key={label} className={`${styles.navItem} ${i === ACTIVE_NAV ? styles.navItemActive : ''}`}>
                {i === ACTIVE_NAV && <div className={styles.navActiveBar} />}
                <span className={styles.navLabel}>{label}</span>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className={styles.main}>

          {/* ── Page heading ─────────────────────────────── */}
          <div className={styles.headingSection}>
            <div className={styles.breadcrumbRow}>
              <span className={styles.breadcrumbText}>Purchases</span>
              <div className={styles.chevronWrap}>
                <img src={imgChevronRight} alt="" className={styles.chevronImg} />
              </div>
            </div>
            <div>
              <p className={styles.pageHeadingLarge}>Full-Service Hiring</p>
              <p className={styles.refIdText}>Reference id: 12314121342</p>
            </div>
          </div>

          {/* ── General information card ──────────────────── */}
          <div className={styles.card}>
            <div className={styles.cardHeadingRow}>
              <p className={styles.cardHeadingText}>General information</p>
            </div>
            <div className={styles.cardDivider} />
            <div className={styles.infoContent}>
              <div className={styles.infoRow}>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Status</span>
                  <div className={styles.statusGroup}>
                    <div className={styles.statusIconWrap}>
                      <img src={imgSignalSuccess} alt="" className={styles.statusIconInner} />
                    </div>
                    <span className={styles.activeText}>Active</span>
                  </div>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>Start date</span>
                  <span className={styles.infoValue}>Nov 1, 2026</span>
                </div>
                <div className={styles.infoBlock}>
                  <span className={styles.infoLabel}>End date</span>
                  <span className={styles.infoValue}>Nov 1, 2027</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Roles card ───────────────────────────────── */}
          <div className={styles.card}>
            <div className={styles.cardHeadingRow}>
              <p className={styles.cardHeadingText}>Role information</p>
            </div>
            <div className={styles.cardDivider} />
            <table className={styles.rolesTable}>
              <thead>
                <tr>
                  <th className={`${styles.rolesTh} ${styles.rolesThFirst}`}>Role</th>
                  <th className={`${styles.rolesTh} ${styles.rolesThRight}`}>
                    <div className={styles.tooltipWrap}>
                      <span className={styles.calloutLink}>
                        <span className={`${styles.calloutLinkText} ${styles.calloutLinkTextBold}`}>Fee per hire</span>
                      </span>
                      <div className={styles.tooltip}>
                        The percentage of the hire's first year salary paid to LinkedIn.
                      </div>
                    </div>
                  </th>
                  <th className={`${styles.rolesTh} ${styles.rolesThRight}`}>Positions filled</th>
                  <th className={styles.rolesTh} />
                </tr>
              </thead>
              <tbody>
                {ROLES.map((r, i) => (
                  <tr key={i} className={styles.rolesTr}>
                    <td className={`${styles.rolesTd} ${styles.rolesTdFirst}`}>
                      {r.role === 'Other roles' ? (
                        <div className={styles.tooltipWrap} style={{ justifyContent: 'flex-start' }}>
                          <span className={styles.calloutLink}>
                            <span className={styles.calloutLinkText}>{r.role}</span>
                          </span>
                          <div className={styles.tooltip} style={{ right: 'auto', left: 0 }}>
                            This role is included by default so you can include additional roles.
                          </div>
                        </div>
                      ) : r.role}
                    </td>
                    <td className={`${styles.rolesTd} ${styles.rolesTdRight}`}>{r.feePct}</td>
                    <td className={`${styles.rolesTd} ${styles.rolesTdRight}`}>{r.filled}</td>
                    <td className={styles.rolesTd} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Billing information card ──────────────────── */}
          <div className={styles.card}>
            <div className={styles.cardHeadingRow}>
              <p className={styles.cardHeadingText}>Billing information</p>
            </div>
            <div className={styles.cardDivider} />
            <div className={styles.billingContent}>
              <div className={styles.billingRow}>
                <div className={`${styles.billingBlock} ${styles.billingBlockUniform}`}>
                  <span className={styles.infoLabel}>Billing frequency</span>
                  <span className={styles.infoValue}>On hire</span>
                </div>
                <div className={`${styles.billingBlock} ${styles.billingBlockUniform}`}>
                  <span className={styles.infoLabel}>Next billing date</span>
                  <span className={styles.infoValue}>On hire</span>
                </div>
                <div className={`${styles.billingBlock} ${styles.billingBlockUniform}`}>
                  <span className={styles.infoLabel}>Next billing amount</span>
                  <span className={styles.infoValue}>Based on fee per hire</span>
                </div>
                <div className={`${styles.billingBlock} ${styles.billingBlockUniform}`}>
                  <span className={styles.infoLabel}>Payment method</span>
                  <span className={styles.infoValue}>Invoice</span>
                </div>
              </div>
              <div className={styles.billingRow}>
                <div className={`${styles.billingBlock} ${styles.billingBlockUniform}`}>
                  <span className={styles.infoLabel}>Tax ID</span>
                  <span className={styles.taxIdMuted}>No tax ID added</span>
                  <span className={styles.taxIdLink}>Manage all Tax IDs</span>
                </div>
                <div className={`${styles.billingBlock} ${styles.billingBlockUniform}`}>
                  <span className={styles.infoLabel}>Currency</span>
                  <span className={styles.infoValue}>USD</span>
                </div>
                <div className={`${styles.billingBlock} ${styles.billingBlockUniform}`} aria-hidden />
                <div className={`${styles.billingBlock} ${styles.billingBlockUniform}`} aria-hidden />
              </div>
            </div>
          </div>

          {/* ── Transactions card ─────────────────────────── */}
          <div className={styles.card}>
            <div className={styles.cardHeadingRowTx}>
              <p className={styles.cardHeadingText}>Transactions</p>
              <button className={styles.customizeBtn}>Customize receipt details</button>
            </div>
            <div className={styles.cardDivider} />
            <table className={styles.txTable}>
              <thead>
                <tr>
                  <th className={`${styles.txTh} ${styles.txThFirst}`}>Date</th>
                  <th className={`${styles.txTh} ${styles.txThRight}`}>Total</th>
                  <th className={styles.txTh}>Payment method</th>
                  <th className={styles.txTh}>Invoice number</th>
                  <th className={`${styles.txTh} ${styles.txThCenter}`}>Status</th>
                  <th className={styles.txThAction} />
                </tr>
              </thead>
              <tbody>
                {TRANSACTIONS.map((tx, i) => (
                  <tr key={i} className={styles.txTr}>
                    <td className={`${styles.txTd} ${styles.txTdFirst}`}>{tx.date}</td>
                    <td className={`${styles.txTd} ${styles.txTdRight}`}>
                      <div className={styles.totalCell} style={{ justifyContent: 'flex-end' }}>
                        <span>{tx.total}</span>
                        <div className={styles.noticeWrap}>
                          <img src={imgSignalNotice} alt="" className={styles.noticeImg} />
                        </div>
                      </div>
                    </td>
                    <td className={styles.txTd}>
                      {tx.isVisa ? (
                        <div className={styles.methodCell}>
                          <div className={styles.visaCard}>
                            <img src={imgVisaLogo} alt="Visa" className={styles.visaLogoImg} />
                          </div>
                          <span>{tx.method}</span>
                        </div>
                      ) : (
                        tx.method
                      )}
                    </td>
                    <td className={styles.txTd}>{tx.invoiceNum}</td>
                    <td className={`${styles.txTd} ${styles.txTdCenter}`}>
                      <div className={styles.paidCell}>
                        <div className={styles.paidIconWrap}>
                          <img src={imgSignalSuccess} alt="" className={styles.paidIconImg} />
                        </div>
                        <span className={styles.paidLabel}>Paid</span>
                      </div>
                    </td>
                    <td className={`${styles.txTd} ${styles.txTdAction}`}>
                      <div className={styles.overflowWrap}>
                        <img src={imgOverflow} alt="" className={styles.overflowImg} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CardFooter />
          </div>

          {/* ── Help card ────────────────────────────────── */}
          <div className={styles.helpCard}>
            <img src={imgMessages} alt="" className={styles.helpIcon} />
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
