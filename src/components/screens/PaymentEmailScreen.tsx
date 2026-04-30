/**
 * Screen 17: Payment Due Email
 * Perspective: Alex (Customer)
 * Fidelity: High — mobile email screenshot with invoice attachment
 */

import styles from './PaymentEmailScreen.module.css';

function DocIcon() {
  return (
    <div className={styles.docIconWrap}>
      <svg width="36" height="46" viewBox="0 0 36 46" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 3C0 1.343 1.343 0 3 0H24L36 12V43C36 44.657 34.657 46 33 46H3C1.343 46 0 44.657 0 43V3Z" fill="white"/>
        <path d="M24 0L36 12H27C25.343 12 24 10.657 24 9V0Z" fill="#E5E5EA"/>
        <rect x="6" y="19" width="20" height="1.5" rx="0.75" fill="#C7C7CC"/>
        <rect x="6" y="23" width="16" height="1.5" rx="0.75" fill="#C7C7CC"/>
        <rect x="6" y="27" width="18" height="1.5" rx="0.75" fill="#C7C7CC"/>
        <rect x="6" y="31" width="14" height="1.5" rx="0.75" fill="#C7C7CC"/>
      </svg>
      <span className={styles.pdfBadge}>PDF</span>
    </div>
  );
}

function DownloadBtn() {
  return (
    <div className={styles.downloadBtn}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 3v7M5.5 8L8 10.5 10.5 8" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 13h8" stroke="#8E8E93" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    </div>
  );
}

export default function PaymentEmailScreen() {
  return (
    <div className={styles.page}>
      <div className={styles.imageWrap}>
        <img src="/payment-email.png" alt="Payment due email" className={styles.screenshot} />
        <div className={styles.attachmentOverlay}>
          <div className={styles.attachmentChip}>
            <DocIcon />
            <span className={styles.fileName}>INV12314124302.pdf</span>
            <DownloadBtn />
          </div>
        </div>
      </div>
    </div>
  );
}
