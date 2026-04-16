/**
 * Screen 10: Checkout Page
 * Perspective: Alex (Customer)
 * Fidelity: High — LinkedIn secure checkout with order summary
 */

import { useState } from 'react';
import type { ProductRow } from './SolutionBuilderScreen';
import styles from './CheckoutPageScreen.module.css';


const imgLinkedIn   = 'https://www.figma.com/api/mcp/asset/0d4e6bb1-b7a8-47f9-9a03-2aff4be1f6eb';
const imgLock       = 'https://www.figma.com/api/mcp/asset/d527716d-bb3c-4ddd-95b0-935723a7cc88';
const imgQuestion   = 'https://www.figma.com/api/mcp/asset/2306ff4e-542d-44be-9181-32476097fbad';
const imgAlexAvatar = 'https://www.figma.com/api/mcp/asset/d05543e3-2db6-4495-90f4-f53dfee213a4';
const imgLightbulb  = 'https://www.figma.com/api/mcp/asset/8a44dad0-e90e-475c-adbf-60b2088bc0e1';
const imgAmyAvatar  = 'https://www.figma.com/api/mcp/asset/ac2dcc5d-283a-4cf6-a368-dfcd532954fa';
const imgIn14       = 'https://www.figma.com/api/mcp/asset/7f2e4030-eeec-46af-8c50-f1e41ed52dab';
const imgChevron    = 'https://www.figma.com/api/mcp/asset/5e9ef1e1-400b-4315-81a0-7efb478b84de';

interface Props {
  onNavigate?: (id: string) => void;
  products?: ProductRow[];
  paymentTerm?: 'NET30' | 'NET60' | 'NET90';
}

export default function CheckoutPageScreen({ onNavigate, products = [], paymentTerm = 'NET30' }: Props) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <div className={styles.page}>

      {/* ── Top nav ───────────────────────────────────────── */}
      <header className={styles.topNav}>
        <div className={styles.navInner}>
          <div className={styles.navLeft}>
            <div className={styles.navLogoWrap}>
              <img src={imgLinkedIn} alt="LinkedIn" className={styles.navLogoImg} />
            </div>
            <div className={styles.secureLabel}>
              <div className={styles.lockWrap}>
                <img src={imgLock} alt="" className={styles.lockImg} />
              </div>
              <span className={styles.secureLabelText}>SECURE CHECKOUT</span>
            </div>
          </div>
          <div className={styles.navRight}>
            <div className={styles.navIconWrap}>
              <img src={imgQuestion} alt="" className={styles.navIconImg} />
            </div>
            <img src={imgAlexAvatar} alt="Alex" className={styles.navAvatar} />
          </div>
        </div>
      </header>

      {/* ── Main content ──────────────────────────────────── */}
      <div className={styles.main}>
        <div className={styles.contentRow}>

          {/* Left column */}
          <div className={styles.leftCol}>

            {/* Welcome card */}
            <div className={styles.card}>
              <p className={styles.welcomeHeading}>Alex, thank you for choosing Full-service hiring</p>
              <div className={styles.inlineFeedback}>
                <div className={styles.lightbulbWrap}>
                  <img src={imgLightbulb} alt="" className={styles.lightbulbImg} />
                </div>
                <p className={styles.inlineFeedbackText}>Cancel anytime before your first hire at no cost. You'll only pay once a hire is made.</p>
              </div>
            </div>

            {/* FAQ card */}
            <div className={styles.card}>
              <p className={styles.faqHeading}>Frequently asked questions</p>

              <div className={styles.faqList}>
                {[
                  {
                    q: 'Will this order affect my contract end date or renewal date?',
                    a: 'No. This order will match your current contract end date. If your contract auto-renews, it will renew at the same time.',
                  },
                  {
                    q: 'When will I get access?',
                    a: 'Access is typically granted within minutes. If you don\'t receive access within 24 hours, please contact your LinkedIn representative.',
                  },
                  {
                    q: 'Can I change my payment method for this order?',
                    a: 'No. Your payment method is tied to your main contract and can\'t be changed here. If you\'d like to change your payment method, please contact your LinkedIn representative to complete your purchase.',
                  },
                ].map(({ q, a }) => (
                  <div key={q} className={styles.faqItem}>
                    <p className={styles.faqQ}>{q}</p>
                    <p className={styles.faqA}>{a}</p>
                  </div>
                ))}
              </div>

              <div className={styles.faqBars}>
                {[0, 94, 188].map((top) => (
                  <div key={top} className={styles.faqBarGroup} style={{ top }}>
                    <div className={styles.faqBar} style={{ width: '68%', background: '#d9d9d9' }} />
                    <div className={styles.faqBar} style={{ width: '100%', background: 'rgba(217,217,217,0.8)' }} />
                    <div className={styles.faqBar} style={{ width: '27%', background: 'rgba(217,217,217,0.8)' }} />
                  </div>
                ))}
              </div>

              <div className={styles.faqDivider} />

              <div className={styles.moreQuestions}>
                <div>
                  <p className={styles.moreQTitle}>More questions?</p>
                  <p className={styles.moreQSub}>Contact your LinkedIn representative</p>
                </div>
                <div className={styles.repCard}>
                  <img src={imgAmyAvatar} alt="Amy Smith" className={styles.repAvatar} />
                  <div className={styles.repInfo}>
                    <div className={styles.repNameRow}>
                      <span className={styles.repName}>Amy Smith</span>
                      <img src={imgIn14} alt="" className={styles.repIn14} />
                    </div>
                    <span className={styles.repEmail}>asmith@linkedin.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — Order Summary */}
          <div className={styles.rightCol}>
            <div className={styles.orderCard}>

              <div className={styles.orderSection}>
                <p className={styles.orderTitle}>Order summary</p>
                <p className={styles.orderSubtitle}>Full-service hiring</p>
              </div>

              <div className={styles.dueTodayRow}>
                <span className={styles.dueTodayLabel}>Due today</span>
                <span className={styles.dueTodayValue}>$0</span>
              </div>

              <div className={styles.orderDivider} />

              <button className={styles.showDetailsBtn} onClick={() => setDetailsOpen(o => !o)}>
                <span>{detailsOpen ? 'Hide order details' : 'Show order details'}</span>
                <div className={styles.chevronWrap}>
                  <img
                    src={imgChevron}
                    alt=""
                    className={styles.chevronImg}
                    style={{ transform: detailsOpen ? 'rotate(180deg)' : undefined }}
                  />
                </div>
              </button>

              {detailsOpen && (
                <div className={styles.orderDetails}>
                  {products.map(p => (
                    <div key={p.key} className={styles.lineItem}>
                      <span className={styles.lineItemName}>{p.role ?? 'Role'} ({p.feePct ?? 0}% of hire's salary)</span>
                      <span className={styles.lineItemValue}>$0.00</span>
                    </div>
                  ))}

                  <div className={styles.orderDivider} />

                  <div className={styles.subtotalsSection}>
                    <div className={styles.subtotalRow}>
                      <span>Subtotal</span>
                      <span>$0.00</span>
                    </div>
                    <div className={styles.subtotalRow}>
                      <span>Estimated taxes</span>
                      <span>$0.00</span>
                    </div>
                    <div className={styles.subtotalRowBold}>
                      <span>Order total</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <div className={styles.orderDivider} />
                </div>
              )}

              <ul className={styles.timelineList}>
                <li>Your plan starts today and services continue till <strong>Jan 1, 2027</strong>.</li>
                <li>You will be <strong>invoiced</strong> on the hire's start date. Payment is due within <strong>{paymentTerm === 'NET30' ? 30 : paymentTerm === 'NET60' ? 60 : 90} days</strong> of the invoice date.</li>
                <li>Your invoice will reflect the final amount due as a percentage of the hired candidate(s) <strong>first year salary</strong>.</li>
              </ul>

              <div className={styles.orderDivider} />

              <p className={styles.legalText}>
                By placing this order you agree to our{' '}
                <span className={styles.legalLink}>terms of service</span>
                {'. To ensure continued service, we\'ll store and update your payment method. Learn about '}
                <span className={styles.legalLink}>how to cancel</span>
                {' and our '}
                <span className={styles.legalLink}>refund policy</span>
                {'.'}
              </p>

              <button
                className={styles.placeOrderBtn}
                onClick={() => onNavigate?.('order-confirmation')}
              >
                Agree and activate for $0
              </button>

              <button
                className={styles.editQuoteBtn}
                onClick={() => onNavigate?.('solution-builder-filled')}
              >
                Edit quote
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
