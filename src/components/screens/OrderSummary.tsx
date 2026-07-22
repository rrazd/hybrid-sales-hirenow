/**
 * Shared Order Summary card used in checkout steps 10 & 11.
 * Auto-expanded by default; "Hide order details" chevron row collapses
 * the per-role + totals breakdown.
 */

import { useState } from 'react';
import type { ProductRow } from './SolutionBuilderScreen';
import styles from './CheckoutPageScreen.module.css';

const imgChevron = '/chevron-up-small.svg';

interface Props {
  products?: ProductRow[];
  paymentTerm?: 'NET30' | 'NET60' | 'NET90';
  buttonLabel?: string;
  onAgreeClick?: () => void;
  defaultExpanded?: boolean;
}

export default function OrderSummary({
  products = [],
  paymentTerm = 'NET30',
  buttonLabel = 'Agree and activate for $0',
  onAgreeClick,
  defaultExpanded = true,
}: Props) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const days = paymentTerm === 'NET30' ? 30 : paymentTerm === 'NET60' ? 60 : 90;

  return (
    <div className={styles.orderCard}>

      <div className={styles.orderSection}>
        <p className={styles.orderTitle}>Order Summary</p>
        <p className={styles.orderSubtitle}>Full Service Hiring</p>
      </div>

      <div className={styles.dueTodayRow}>
        <span className={styles.dueTodayLabel}>Due Today</span>
        <span className={styles.dueTodayValue}>$0</span>
      </div>

      <div className={styles.orderDivider} />

      <button
        type="button"
        className={styles.showDetailsBtn}
        onClick={() => setExpanded(v => !v)}
        aria-expanded={expanded}
      >
        <span>{expanded ? 'Hide order details' : 'Show order details'}</span>
        <span className={styles.chevronWrap}>
          <img
            src={imgChevron}
            alt=""
            className={`${styles.chevronImg}${expanded ? '' : ` ${styles.chevronDown}`}`}
          />
        </span>
      </button>

      {expanded && (
        <>
          <div className={styles.feeList}>
            {products.length > 0 ? products.map(p => (
              <div key={p.key} className={styles.feeRow}>
                <span className={styles.feeLabel}>{p.role ?? 'Role'}</span>
                <span className={styles.feeValue}>{p.feePct ?? 0}% fee per hire</span>
              </div>
            )) : (
              <>
                <div className={styles.feeRow}>
                  <span className={styles.feeLabel}>Accountant</span>
                  <span className={styles.feeValue}>15% fee per hire</span>
                </div>
                <div className={styles.feeRow}>
                  <span className={styles.feeLabel}>Other roles</span>
                  <span className={styles.feeValue}>15% fee per hire</span>
                </div>
              </>
            )}
          </div>

          <div className={styles.orderDivider} />
        </>
      )}

      <p className={styles.legalText}>
        Your plan starts today and services continue till <strong>Jan 1, 2027</strong>. You will be <strong>invoiced</strong> on the hire's start date. Payment is due within <strong>{days} days</strong> of the invoice date. Your invoice will reflect the final amount due based on the agreed fee per hire, calculated as a percentage of each hired candidate's <strong>first-year salary</strong>. Taxes may apply based on your location. If not charged, you may be responsible for reporting and <strong>paying tax</strong>. By placing this order, you agree to our{' '}
        <span className={styles.legalLink}>terms of service</span>.
      </p>

      <div className={styles.orderDivider} />

      <button
        className={styles.placeOrderBtn}
        onClick={onAgreeClick}
      >
        {buttonLabel}
      </button>

    </div>
  );
}
