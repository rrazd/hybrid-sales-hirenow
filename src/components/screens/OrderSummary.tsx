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
  salesTaxPct?: number;
}

export default function OrderSummary({
  products = [],
  paymentTerm = 'NET30',
  buttonLabel = 'Agree and activate for $0',
  onAgreeClick,
  defaultExpanded = true,
  salesTaxPct = 0,
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

          <div className={styles.totalsList}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Subtotal</span>
              <span className={styles.totalValue}>$0.00</span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Sales tax ({salesTaxPct}%)</span>
              <span className={styles.totalValue}>$0.00</span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabelBold}>Order total</span>
              <span className={styles.totalValueBold}>$0.00</span>
            </div>
          </div>

          <div className={styles.orderDivider} />
        </>
      )}

      <ul className={styles.timelineList}>
        <li>Your plan starts today and services continue till <strong>Jan 1, 2027</strong>.</li>
        <li>You will be <strong>invoiced</strong> on the hire's start date. Payment is due within <strong>{days} days</strong> of the invoice date.</li>
        <li>Your invoice will reflect the final amount due based on the agreed fee per hire, calculated as a percentage of each hired candidate's <strong>first-year salary.</strong></li>
      </ul>

      <p className={styles.legalText}>
        By placing this order you agree to our{' '}
        <span className={styles.legalLink}>terms of service</span>
        {'. To ensure continued service, we\'ll store and update your payment method. Learn about '}
        <span className={styles.legalLink}>how to cancel</span>
        {' and our '}
        <span className={styles.legalLink}>refund policy</span>
        .
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
