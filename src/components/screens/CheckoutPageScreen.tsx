/**
 * Screen 10: Checkout Page
 * Perspective: Alex (Customer)
 * Fidelity: High — LinkedIn secure checkout with order summary
 */

import { useState, useRef, useEffect } from 'react';
import type { ProductRow } from './SolutionBuilderScreen';
import OrderSummary from './OrderSummary';
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
const imgCaret      = '/checkout-caret.svg';

interface Props {
  onNavigate?: (id: string) => void;
  products?: ProductRow[];
  paymentTerm?: 'NET30' | 'NET60' | 'NET90';
  checkoutLayout?: 'with-subheaders' | 'no-subheaders';
  formBorderMode?: 'show' | 'hide';
}

export default function CheckoutPageScreen({ onNavigate, products = [], paymentTerm = 'NET30', checkoutLayout = 'with-subheaders', formBorderMode = 'hide' }: Props) {
  const showSubheaders = checkoutLayout === 'with-subheaders';
  const hideBorder = formBorderMode === 'hide';
  const [showBillingError, setShowBillingError] = useState(false);
  const [stateValue, setStateValue] = useState('');
  const [stateOpen, setStateOpen] = useState(false);
  const [stateRect, setStateRect] = useState<{ top?: number; bottom?: number; left: number; width: number } | null>(null);
  const stateRef = useRef<HTMLDivElement>(null);

  // Close dropdown on any scroll so it doesn't drift from its anchor
  useEffect(() => {
    const close = () => setStateOpen(false);
    window.addEventListener('scroll', close, true);
    return () => window.removeEventListener('scroll', close, true);
  }, []);

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
              <p className={styles.billingTitle}>Provide your billing information</p>
              {showBillingError && (
                <div className={styles.inlineError}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" flex-shrink="0" style={{ flexShrink: 0, marginTop: 1 }}>
                    <circle cx="10" cy="10" r="10" fill="#CF0007" />
                    <rect x="5" y="9" width="10" height="2" rx="1" fill="white" />
                  </svg>
                  <span className={styles.inlineErrorText}>Add billing information before continuing further.</span>
                </div>
              )}
              <div className={`${styles.billingForm}${!hideBorder ? ` ${styles.formWithBorder}` : ''}`} style={{ marginTop: 24 }}>

                {/* Billing address subsection */}
                <div className={styles.billingSection}>
                  <div className={styles.billingFields}>

                    {/* Billing contact subtitle */}
                    {showSubheaders && <p className={styles.billingSubsection}>Billing contact</p>}

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

                    {/* Invoice recipient email */}
                    <div className={styles.billingField}>
                      <label className={styles.billingLabel}>Invoice recipient email</label>
                      <input className={styles.billingInput} style={{ width: 248 }} type="email" />
                    </div>

                    {/* Billing address subtitle */}
                    {showSubheaders && <p className={styles.billingSubsection} style={{ marginTop: 24 }}>Billing address</p>}

                    {/* Country/region */}
                    <div className={styles.billingField}>
                      <label className={styles.billingLabel}>Country/region</label>
                      <div className={styles.billingSelect} style={{ width: 248 }}>
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

                    {/* Add button */}
                    <button className={styles.addBtn} onClick={() => onNavigate?.('checkout-billing-profile')}>Add</button>

                  </div>
                </div>

              </div>
            </div>

            {/* FAQ card */}
            <div className={styles.card}>
              <p className={styles.faqHeading}>Frequently asked questions</p>

              <div className={styles.faqList}>
                <div className={styles.faqItem}>
                  <p className={styles.faqQ}>Will I be charged during my free trial?</p>
                  <p className={styles.faqA}>We will not charge you until your free trial has ended. You can cancel anytime before March 2, 2026 to avoid being charged</p>
                </div>
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
            <OrderSummary
              products={products}
              paymentTerm={paymentTerm}
              onAgreeClick={() => setShowBillingError(true)}
            />
          </div>

        </div>
      </div>

    </div>
  );
}
