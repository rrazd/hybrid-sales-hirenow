/**
 * Screen 11b: Checkout — Billing Profile Selected
 * Perspective: Alex (Customer)
 * Fidelity: High — State after clicking "Add" on the billing form
 */

import { useState, Fragment } from 'react';
import type { ProductRow } from './SolutionBuilderScreen';
import styles from './CheckoutPageScreen.module.css';

const imgLinkedIn   = '/linkedin-logo.svg';
const imgLock       = '/lock.svg';
const imgQuestion   = '/question.svg';
const imgAlexAvatar = '/alex-avatar.png';
const imgAmyAvatar  = '/amy-avatar.png';
const imgIn14       = '/linkedin-in14.svg';
const imgLightbulb  = '/lightbulb.svg';
const imgCaret      = '/checkout-caret.svg';
const imgCheck      = '/billing-check.svg';
const imgAddIcon    = '/billing-add-icon.svg';
const imgArrowLeft  = '/arrow-left-small.svg';

interface Props {
  onNavigate?: (id: string) => void;
  products?: ProductRow[];
  paymentTerm?: 'NET30' | 'NET60' | 'NET90';
  billingEditMode?: 'allow' | 'disallow';  // default: disallow
}

type Profile = {
  id: string; name: string; email: string; address: string;
  firstName: string; lastName: string;
  address1: string; address2: string; city: string; state: string; postal: string;
};

const INITIAL_PROFILES: Profile[] = [
  {
    id: 'alex',
    name: 'Alex Smith', email: 'asmith@flexis.com', address: '950 Maude Ave, Sunnyvale, United States 95032',
    firstName: 'Alex', lastName: 'Smith',
    address1: '950 Maude Ave', address2: '', city: 'Sunnyvale', state: 'California', postal: '95032',
  },
  {
    id: 'alexis',
    name: 'Alexis Doe', email: 'adoe@flexis.com', address: '1600 Amphitheatre Pkwy, Mountain View, United States 94043',
    firstName: 'Alexis', lastName: 'Doe',
    address1: '1600 Amphitheatre Pkwy', address2: '', city: 'Mountain View', state: 'California', postal: '94043',
  },
];

type FormValues = Omit<Profile, 'id' | 'name' | 'address'>;

export default function CheckoutBillingProfileScreen({ onNavigate, products = [], paymentTerm = 'NET30', billingEditMode = 'disallow' }: Props) {
  const [profiles, setProfiles] = useState<Profile[]>(INITIAL_PROFILES);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedId, setSelectedId] = useState('alex');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [formValues, setFormValues] = useState<FormValues | null>(null);

  const selected = profiles.find(p => p.id === selectedId) ?? profiles[0];
  const editing = profiles.find(p => p.id === editingId) ?? null;

  const emptyForm: FormValues = { firstName: '', lastName: '', email: '', address1: '', address2: '', city: '', state: '', postal: '' };

  const startEditing = (p: Profile) => {
    setEditingId(p.id);
    setIsAddingNew(false);
    setFormValues({ firstName: p.firstName, lastName: p.lastName, email: p.email, address1: p.address1, address2: p.address2, city: p.city, state: p.state, postal: p.postal });
  };

  const startAdding = () => {
    setProfileOpen(false);
    setEditingId(null);
    setIsAddingNew(true);
    setFormValues(emptyForm);
  };

  const cancelForm = () => {
    setEditingId(null);
    setIsAddingNew(false);
    setFormValues(null);
  };

  const saveEditing = () => {
    if (!formValues) { cancelForm(); return; }
    const name = `${formValues.firstName} ${formValues.lastName}`.trim();
    const addr = [formValues.address1, formValues.city, `United States ${formValues.postal}`].filter(Boolean).join(', ');
    if (isAddingNew) {
      const newProfile: Profile = { id: `new-${Date.now()}`, name, address: addr, ...formValues };
      setProfiles(prev => [...prev, newProfile]);
    } else if (editingId) {
      setProfiles(prev => prev.map(p => p.id !== editingId ? p : { ...p, ...formValues, name, address: addr }));
    }
    cancelForm();
  };

  const setField = (field: keyof FormValues, value: string) =>
    setFormValues(prev => prev ? { ...prev, [field]: value } : prev);

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

            {/* Billing information card — profile selected state */}
            <div className={styles.billingCard}>
              <p className={styles.billingTitle}>Provide your billing information</p>

              {formValues !== null ? (
                /* ── Edit form ───────────────────────────────── */
                <>
                <button
                  className={styles.backToSavedBtn}
                  style={{ marginTop: 24 }}
                  onClick={cancelForm}
                >
                  <img src={imgArrowLeft} alt="" className={styles.backToSavedIcon} />
                  Back to saved information
                </button>
                <div className={styles.billingSection} style={{ marginTop: 24 }}>
                  <div className={styles.billingFields}>

                    <div className={styles.billingRow} style={{ gap: 16 }}>
                      <div className={styles.billingField}>
                        <label className={styles.billingLabel}>First name</label>
                        <input className={styles.billingInput} style={{ width: 248 }} type="text" value={formValues.firstName} onChange={e => setField('firstName', e.target.value)} />
                      </div>
                      <div className={styles.billingField}>
                        <label className={styles.billingLabel}>Last name</label>
                        <input className={styles.billingInput} style={{ width: 248 }} type="text" value={formValues.lastName} onChange={e => setField('lastName', e.target.value)} />
                      </div>
                    </div>

                    <div className={styles.billingField}>
                      <label className={styles.billingLabel}>Invoice recipient email</label>
                      <input className={styles.billingInput} style={{ width: 248 }} type="email" value={formValues.email} onChange={e => setField('email', e.target.value)} />
                    </div>

                    <div className={styles.billingField}>
                      <label className={styles.billingLabel}>Country/region</label>
                      <div className={styles.billingSelect} style={{ width: 320 }}>
                        <span className={styles.billingSelectValue}>United States</span>
                        <div className={styles.billingCaretWrap}>
                          <img src={imgCaret} alt="" className={styles.billingCaretImg} />
                        </div>
                      </div>
                    </div>

                    <div className={styles.billingField}>
                      <label className={styles.billingLabel}>Address line 1</label>
                      <input className={styles.billingInput} style={{ width: 512 }} type="text" value={formValues.address1} onChange={e => setField('address1', e.target.value)} />
                    </div>

                    <div className={styles.billingField}>
                      <label className={styles.billingLabel}>Address line 2 (optional)</label>
                      <input className={styles.billingInput} style={{ width: 512 }} type="text" value={formValues.address2} onChange={e => setField('address2', e.target.value)} />
                    </div>

                    <div className={styles.billingRow} style={{ gap: 12, width: 512 }}>
                      <div className={styles.billingField} style={{ flex: 1 }}>
                        <label className={styles.billingLabel}>City</label>
                        <input className={styles.billingInput} style={{ width: '100%' }} type="text" value={formValues.city} onChange={e => setField('city', e.target.value)} />
                      </div>
                      <div className={styles.billingField} style={{ flex: 1 }}>
                        <label className={styles.billingLabel}>State/province</label>
                        <input className={styles.billingInput} style={{ width: '100%' }} type="text" value={formValues.state} onChange={e => setField('state', e.target.value)} />
                      </div>
                    </div>

                    <div className={styles.billingField}>
                      <label className={styles.billingLabel}>Postal code</label>
                      <input className={styles.billingInput} style={{ width: 250 }} type="text" value={formValues.postal} onChange={e => setField('postal', e.target.value)} />
                    </div>

                    <button className={styles.addBtn} onClick={saveEditing}>{isAddingNew ? 'Add' : 'Save'}</button>

                  </div>
                </div>
                </>
              ) : (
                /* ── Dropdown selector ───────────────────────── */
                <div className={styles.billingForm} style={{ marginTop: 24 }}>
                <div className={styles.profileDropdownWrap}>

                  {/* Closed row trigger */}
                  <div className={styles.profileDropdown} onClick={() => setProfileOpen(o => !o)} style={{ cursor: 'pointer' }}>
                    <div className={styles.profileInfo}>
                      <span className={styles.profileName}>{selected.name}&nbsp;•&nbsp;{selected.email}</span>
                      <span className={styles.profileAddress}>{selected.address}</span>
                    </div>
                    <div className={styles.profileCaretWrap}>
                      <img src={imgCaret} alt="" className={styles.profileCaretImg} />
                    </div>
                  </div>

                  {/* Open panel — floats over content below */}
                  {profileOpen && (
                  <div className={styles.profilePanel}>

                    {/* Header row */}
                    <div className={styles.profilePanelHeader}>
                      <span className={styles.profilePanelTitle}>Saved information</span>
                      <button className={styles.profilePanelAddBtn} onClick={startAdding}>
                        <img src={imgAddIcon} alt="" className={styles.profilePanelAddIcon} />
                        Add new billing information
                      </button>
                    </div>

                    <div className={styles.profilePanelDivider} />

                    {profiles.map((p, i) => (
                      <Fragment key={p.id}>
                        <div
                          className={styles.profileOption}
                          onClick={() => { setSelectedId(p.id); setProfileOpen(false); }}
                          style={{ cursor: 'pointer' }}
                        >
                          <div className={styles.profileCheckWrap}>
                            {p.id === selectedId && <img src={imgCheck} alt="selected" className={styles.profileCheckImg} />}
                          </div>
                          <div className={styles.profileOptionInfo}>
                            <div className={styles.profileOptionDetails}>
                              <div className={styles.profileOptionNameRow}>
                                <span className={styles.profileOptionName}>{p.name}</span>
                                <span className={styles.profileOptionName}>•</span>
                                <span className={styles.profileOptionName}>{p.email}</span>
                              </div>
                              <span className={styles.profileOptionAddress}>{p.address}</span>
                            </div>
                            {billingEditMode === 'allow' && (
                              <button
                                className={styles.profileEditBtn}
                                onClick={e => { e.stopPropagation(); setProfileOpen(false); startEditing(p); }}
                              >Edit billing information</button>
                            )}
                          </div>
                        </div>
                        {i < profiles.length - 1 && <div className={styles.profilePanelDivider} />}
                      </Fragment>
                    ))}

                    <div className={styles.profilePanelDivider} />

                  </div>
                  )}

                </div>{/* end profileDropdownWrap */}

              </div>
              )}{/* end dropdown/edit conditional */}
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

              <div className={styles.orderSection}>
                <p className={styles.orderTitle}>Full-Service Hiring</p>
                {products.map(p => (
                  <p key={p.key} className={styles.orderSubtitle}>{p.role ?? 'Role'} - {p.feePct ?? 0}% fee per hire</p>
                ))}
              </div>

              <div className={styles.dueTodayRow}>
                <span className={styles.dueTodayLabel}>Due Today</span>
                <span className={styles.dueTodayValue}>$0</span>
              </div>

              <div className={styles.orderDivider} />

              <ul className={styles.timelineList}>
                <li>Your plan starts today and services continue till <strong>Jan 1, 2027</strong>.</li>
                <li>You will be <strong>invoiced</strong> on the hire's start date. Payment is due within <strong>{paymentTerm === 'NET30' ? 30 : paymentTerm === 'NET60' ? 60 : 90} days</strong> of the invoice date.</li>
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
