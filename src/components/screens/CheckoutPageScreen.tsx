/**
 * Screen 10: Checkout Page
 * Perspective: Alex (Customer)
 * Fidelity: High — LinkedIn secure checkout with order summary
 */

import { useState, useRef } from 'react';
import type { ProductRow } from './SolutionBuilderScreen';
import styles from './CheckoutPageScreen.module.css';

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
];


const imgLinkedIn   = '/linkedin-logo.svg';
const imgLock       = '/lock.svg';
const imgQuestion   = '/question.svg';
const imgAlexAvatar = '/alex-avatar.png';
const imgLightbulb  = '/lightbulb.svg';
const imgAmyAvatar  = '/amy-avatar.png';
const imgIn14       = '/linkedin-in14.svg';
const imgCaret      = '/caret-down.svg';

interface Props {
  onNavigate?: (id: string) => void;
  products?: ProductRow[];
  paymentTerm?: 'NET30' | 'NET60' | 'NET90';
}

export default function CheckoutPageScreen({ onNavigate, products = [], paymentTerm = 'NET30' }: Props) {
  const [stateValue, setStateValue] = useState('');
  const [stateOpen, setStateOpen] = useState(false);
  const [stateRect, setStateRect] = useState<{ top?: number; bottom?: number; left: number; width: number } | null>(null);
  const stateRef = useRef<HTMLDivElement>(null);

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
              <p className={styles.welcomeHeading}>Alex, thank you for choosing Full-Service Hiring</p>
              <div className={styles.inlineFeedback}>
                <div className={styles.lightbulbWrap}>
                  <img src={imgLightbulb} alt="" className={styles.lightbulbImg} />
                </div>
                <p className={styles.inlineFeedbackText}>Cancel anytime before your first hire at no cost. You'll only pay once a hire is made.</p>
              </div>
            </div>

            {/* Billing information card */}
            <div className={styles.billingCard}>
              <div className={styles.billingForm}>

                <p className={styles.billingTitle}>Enter your billing information</p>

                {/* Billing address subsection */}
                <div className={styles.billingSection}>
                  <p className={styles.billingSubsection}>Billing address</p>
                  <div className={styles.billingFields}>

                    {/* First name + Last name */}
                    <div className={styles.billingRow} style={{ gap: 16 }}>
                      <div className={styles.billingField}>
                        <label className={styles.billingLabel}>First name</label>
                        <input className={styles.billingInput} style={{ width: 248 }} type="text" />
                      </div>
                      <div className={styles.billingField}>
                        <label className={styles.billingLabel}>Last name</label>
                        <input className={styles.billingInput} style={{ width: 248 }} type="text" />
                      </div>
                    </div>

                    {/* Country/region */}
                    <div className={styles.billingField}>
                      <label className={styles.billingLabel}>Country/region</label>
                      <div className={styles.billingSelect} style={{ width: 320 }}>
                        <span className={styles.billingSelectValue}>United States</span>
                        <div className={styles.billingCaretWrap}>
                          <img src={imgCaret} alt="" className={styles.billingCaretImg} />
                        </div>
                      </div>
                    </div>

                    {/* Address line 1 */}
                    <div className={styles.billingField}>
                      <label className={styles.billingLabel}>Address line 1</label>
                      <input className={styles.billingInput} style={{ width: 512 }} type="text" />
                    </div>

                    {/* Address line 2 */}
                    <div className={styles.billingField}>
                      <label className={styles.billingLabel}>Address line 2 (optional)</label>
                      <input className={styles.billingInput} style={{ width: 512 }} type="text" />
                    </div>

                    {/* City + State/province */}
                    <div className={styles.billingRow} style={{ gap: 12, width: 512 }}>
                      <div className={styles.billingField} style={{ flex: 1 }}>
                        <label className={styles.billingLabel}>City</label>
                        <input className={styles.billingInput} style={{ width: '100%' }} type="text" />
                      </div>
                      <div className={styles.billingField} style={{ flex: 1 }}>
                        <label className={styles.billingLabel}>State/province</label>
                        <div className={styles.stateWrap} ref={stateRef} style={{ width: '100%' }}>
                          <button
                            className={`${styles.stateSelect} ${stateOpen ? styles.stateSelectOpen : ''}`}
                            onClick={() => {
                              if (!stateOpen && stateRef.current) {
                                const r = stateRef.current.getBoundingClientRect();
                                const MENU_HEIGHT = 240;
                                const spaceBelow = window.innerHeight - r.bottom;
                                if (spaceBelow >= MENU_HEIGHT + 4) {
                                  setStateRect({ top: r.bottom + 4, left: r.left, width: r.width });
                                } else {
                                  setStateRect({ bottom: window.innerHeight - r.top + 4, left: r.left, width: r.width });
                                }
                              }
                              setStateOpen(o => !o);
                            }}
                            onBlur={() => setTimeout(() => setStateOpen(false), 150)}
                          >
                            {stateValue}
                          </button>
                          <svg className={styles.stateCaret} width="14" height="7" viewBox="0 0 14 7" fill="none" aria-hidden>
                            <polygon points="0,0 14,0 7,7" fill="rgba(0,0,0,0.9)" />
                          </svg>
                          {stateOpen && stateRect && (
                            <div className={styles.stateMenu} style={{ position: 'fixed', top: stateRect.top, bottom: stateRect.bottom, left: stateRect.left, width: stateRect.width }}>
                              {US_STATES.map(s => (
                                <div
                                  key={s}
                                  className={`${styles.stateMenuItem} ${stateValue === s ? styles.stateMenuItemSelected : ''}`}
                                  onMouseDown={() => { setStateValue(s); setStateOpen(false); }}
                                >
                                  {s}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Postal code */}
                    <div className={styles.billingField}>
                      <label className={styles.billingLabel}>Postal code</label>
                      <input className={styles.billingInput} style={{ width: 250 }} type="text" />
                    </div>

                  </div>
                </div>

                {/* Invoice details subsection */}
                <div className={styles.billingSection} style={{ paddingTop: 20 }}>
                  <p className={styles.billingSubsection}>Invoice details</p>
                  <div className={styles.billingField}>
                    <label className={styles.billingLabel}>Invoice recipient email</label>
                    <input className={styles.billingInput} style={{ width: 248 }} type="email" />
                  </div>
                </div>

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
                {[0, 70, 140].map((top) => (
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

              {/* Product title + per-role subtitles */}
              <div className={styles.orderSection}>
                <p className={styles.orderTitle}>Full-Service Hiring</p>
                {products.map(p => (
                  <p key={p.key} className={styles.orderSubtitle}>{p.role ?? 'Role'} - {p.feePct ?? 0}% fee per hire</p>
                ))}
              </div>

              {/* Due Today */}
              <div className={styles.dueTodayRow}>
                <span className={styles.dueTodayLabel}>Due Today</span>
                <span className={styles.dueTodayValue}>$0</span>
              </div>

              <div className={styles.orderDivider} />

              {/* Timeline bullets */}
              <ul className={styles.timelineList}>
                <li>Your plan starts today and services continue till <strong>Jan 1, 2027</strong>.</li>
                <li>You will be <strong>invoiced</strong> on the hire's start date. Payment is due within <strong>{paymentTerm === 'NET30' ? 30 : paymentTerm === 'NET60' ? 60 : 90} days</strong> of the invoice date.</li>
                <li>Your invoice will reflect the final amount due based on the agreed fee per hire, calculated as a percentage of each hired candidate's <strong>first-year salary.</strong></li>
              </ul>

              {/* Legal text */}
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
                onClick={() => onNavigate?.('order-confirmation')}
              >
                Agree and activate for $0
              </button>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
