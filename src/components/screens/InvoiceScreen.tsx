/**
 * Screen 19: Invoice View
 * Perspective: Alex (Customer)
 * Fidelity: High — Two-page invoice with "Go to Online Checkout" banner
 */

import styles from './InvoiceScreen.module.css';

const imgLogo = '/invoice-linkedin-logo.svg';

interface Props {
  onNavigate?: (id: string) => void;
}

function InLogo() {
  return <img src={imgLogo} alt="LinkedIn" className={styles.logo} />;
}

function Divider() {
  return <div className={styles.divider} />;
}

function InvoicePage1({ onNavigate }: { onNavigate?: (id: string) => void }) {
  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <InLogo />
        <span className={styles.headerTitle}>Invoice from LinkedIn India Pvt Ltd</span>
      </div>

      {/* Go to Online Checkout banner */}
      <div className={styles.checkoutBanner}>
        <button className={styles.checkoutBannerBtn} onClick={() => onNavigate?.('adyen-checkout')}>
          Go to Online Checkout
        </button>
        <span className={styles.checkoutBannerText}>Pay for this invoice using our online checkout</span>
      </div>

      {/* Meta row 1 */}
      <div className={styles.metaRow}>
        {[
          { label: 'Effective Date', value: '03/1/2025' },
          { label: 'Transaction ID', value: 'P2312322' },
          { label: 'Invoice Number', value: '109405593' },
          { label: 'Purchaser Email', value: 'alex@gmail.com' },
        ].map(({ label, value }) => (
          <div key={label} className={styles.metaCol}>
            <span className={styles.metaLabel}>{label}</span>
            <span className={styles.metaValue}>{value}</span>
          </div>
        ))}
      </div>

      <Divider />

      {/* Meta row 2 */}
      <div className={styles.metaRow}>
        {[
          { label: 'Amount', value: '$31,020.00' },
          { label: 'Transaction Date', value: '03/1/2025' },
          { label: 'Billing Frequency', value: 'N/A' },
          { label: 'Payment Method', value: 'N/A' },
        ].map(({ label, value }) => (
          <div key={label} className={styles.metaCol}>
            <span className={styles.metaLabel}>{label}</span>
            <span className={styles.metaValue}>{value}</span>
          </div>
        ))}
      </div>

      <Divider />

      {/* Meta row 3 */}
      <div className={styles.metaRow} style={{ alignItems: 'flex-start' }}>
        <div className={styles.metaCol}>
          <span className={styles.metaLabel}>Billed To</span>
          <span className={styles.metaValue}>Alex Norton<br />950 Maude, Sunnyvale<br />94085, CA, USA</span>
        </div>
        <div className={styles.metaCol}>
          <span className={styles.metaLabel}>Customer Tax ID</span>
          <span className={styles.metaValue}>N/A</span>
        </div>
        <div className={styles.customReceiptBox}>
          Add custom receipt details within Admin Center
        </div>
      </div>

      <Divider />

      {/* Summary */}
      <p className={styles.summaryHeading}>Summary</p>

      <div className={styles.tableWrap}>
        <div className={styles.tableHeader}>
          <span className={styles.colItem}>Item</span>
          <span className={styles.colDesc}>Description</span>
          <span className={styles.colQty}>Quantity</span>
          <span className={styles.colRight}>Price</span>
        </div>
        <div className={styles.tableDividerThin} />
        <div className={styles.tableRow}>
          <span className={styles.colItem}>1</span>
          <span className={styles.colDesc}>Full-Service Hiring</span>
          <span className={styles.colQty}>2</span>
          <span className={styles.colRight}>$30,000.00</span>
        </div>
      </div>

      {/* Totals — two-column layout aligned with Price column */}
      <div className={styles.totals}>
        <div className={styles.totalsInner}>
          <div className={styles.totalsLabels}>
            {['Subtotal:', 'SGST (3.4%):', 'Total:', 'Payment:', 'Balance:'].map(label => (
              <span key={label} className={styles.totalLabel}>{label}</span>
            ))}
          </div>
          <div className={styles.totalsValues}>
            {[
              ['sub', '$30,000.00'],
              ['sgst', '$1,020.00'],
              ['total', '$31,020.00'],
              ['pay', '$0.00'],
              ['bal', '$31,020.00'],
            ].map(([key, val]) => (
              <span key={key} className={styles.totalValue}>{val}</span>
            ))}
          </div>
        </div>
      </div>

      <Divider />

      {/* Footer */}
      <div className={styles.footer}>
        <span><strong>LinkedIn Corporation,</strong> 1000 W. Maude Avenue, Sunnyvale, CA 94085 USA</span>
        <span>Page 1 of 2</span>
      </div>
    </div>
  );
}

function InvoicePage2() {
  return (
    <div className={styles.page}>

      {/* Header */}
      <div className={styles.header}>
        <InLogo />
        <span className={styles.headerTitle}>Invoice from LinkedIn India Pvt Ltd</span>
      </div>

      {/* Table — no background, 12px top/bottom row padding */}
      <div className={styles.tableWrapPlain} style={{ marginTop: 5 }}>
        <div className={styles.tableDividerThin} />
        <div className={styles.tableHeader}>
          <span className={styles.colItem}>Item</span>
          <span className={styles.colDesc}>Description</span>
          <span className={styles.colRight} style={{ marginRight: 32 }}>Rate</span>
          <span className={styles.colRight}>Price</span>
        </div>
        <div className={styles.tableDividerThin} />
        <div className={styles.tableRowTall}>
          <span className={styles.colItem}>1</span>
          <span className={styles.colDesc}>Product Manager $100,000 (15%) –<br />Jane Smith (Apr 1, 2026)</span>
          <span className={styles.colRight} style={{ marginRight: 32 }}>$15,000.00</span>
          <span className={styles.colRight}>$15,000.00</span>
        </div>
        <div className={styles.tableDividerThin} />
        <div className={styles.tableRowTall}>
          <span className={styles.colItem}>2</span>
          <span className={styles.colDesc}>Product Manager $100,000 (15%) –<br />Val Smith (Apr 1, 2026)</span>
          <span className={styles.colRight} style={{ marginRight: 32 }}>$15,000.00</span>
          <span className={styles.colRight}>$15,000.00</span>
        </div>
        <div className={styles.tableDividerThin} />
      </div>

      {/* Placeholder bars — 24px above (19px gap + 5px margin) */}
      <div className={styles.placeholders} style={{ marginTop: 5 }}>
        <div className={styles.placeholderBar} />
        <div className={styles.placeholderBar} />
        <div className={styles.placeholderBar} />
      </div>

      {/* Help text */}
      <p className={styles.helpText}>
        Have questions or need help? Please visit our{' '}
        <span className={styles.helpLink}>Help Center</span>.
      </p>

      {/* Footer */}
      <div className={styles.footer}>
        <span><strong>LinkedIn Corporation,</strong> 1000 W. Maude Avenue, Sunnyvale, CA 94085 USA</span>
        <span>Page 2 of 2</span>
      </div>
    </div>
  );
}

export default function InvoiceScreen({ onNavigate }: Props) {
  return (
    <div className={styles.screen}>
      <div className={styles.pagesRow}>
        <InvoicePage1 onNavigate={onNavigate} />
        <InvoicePage2 />
      </div>
    </div>
  );
}
