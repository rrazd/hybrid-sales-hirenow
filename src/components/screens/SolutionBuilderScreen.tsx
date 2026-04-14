/**
 * Screen 7: Solution Builder
 * Perspective: Amy (LinkedIn Sales Rep)
 * Fidelity: High — full interactive layout with ANT Design v5.
 *
 * Amy configures a quote for Alex in LinkedIn's internal sales tool.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, Button, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { QuoteAdvisorLayout } from '../../App';
import { JOB_ROLES, ROLE_SALARIES } from '../../data/jobRoles';
import styles from './SolutionBuilderScreen.module.css';

const DEFAULT_SALARY = 150000;
const DEFAULT_FEE_PCT = 15;

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

const imgNavLogo       = 'https://www.figma.com/api/mcp/asset/545cc161-0813-417c-87b2-8106774bd214';
const imgAmyAvatar     = 'https://www.figma.com/api/mcp/asset/45195051-c50e-47c1-a044-9948975abdd0';
const imgAlexAvatar    = 'https://www.figma.com/api/mcp/asset/d05543e3-2db6-4495-90f4-f53dfee213a4';
const imgAlexHero      = 'https://www.figma.com/api/mcp/asset/05256d12-4662-4a99-bba6-d052c6f35f15';
const imgCheckIcon     = 'https://www.figma.com/api/mcp/asset/252c479f-5ead-4a4d-b549-3ab7d7800642';
const imgChevron       = 'https://www.figma.com/api/mcp/asset/8625bbe4-1fee-44ed-b49d-1d4322e32b44';
const imgLinkExternal  = 'https://www.figma.com/api/mcp/asset/131ace80-59cc-485b-a2d2-d55ebadc0bf9';
const imgSignalSuccess = 'https://www.figma.com/api/mcp/asset/aae46a4b-1016-43a3-85bb-3a52c255c7a0';
const imgCloseSmall    = 'https://www.figma.com/api/mcp/asset/560fce82-de18-4add-8b60-76f31c37abcd';
const imgSignalNotice  = 'https://www.figma.com/api/mcp/asset/d0ac7d69-84ee-4ff1-8323-70b4b9b2f8f8';
const imgSignalErrorSm = 'https://www.figma.com/api/mcp/asset/853282d5-dbd0-4563-95e1-aaad9cffb021';
const imgCopyLinkIcon  = 'https://www.figma.com/api/mcp/asset/b709a829-291e-44e7-b56e-e360f76e9de4';
const imgToastSuccess  = 'https://www.figma.com/api/mcp/asset/f28b7d85-bbf6-4e05-a89c-51b56632c4dd';
const imgToastClose    = 'https://www.figma.com/api/mcp/asset/6d543344-4111-4a4f-8921-69fd28b64b55';
const imgConfirmClose  = 'https://www.figma.com/api/mcp/asset/02a279a0-3e9a-4bb6-a57d-9ab09cef7b8b';

export type ProductRow = { key: string; role?: string; feePct?: number; salary?: number; feeAmount?: number };

function buildProductColumns(onEdit: (row: ProductRow) => void, onRemove: (key: string) => void): ColumnsType<ProductRow> {
  return [
    {
      title: 'Product',
      key: 'product',
      render: (_, row) => row.role ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.9)', letterSpacing: '-0.15px', lineHeight: 1.25 }}>
            Full-service hiring
          </span>
          <span style={{ fontSize: 14, letterSpacing: '-0.15px', lineHeight: 1.25, color: 'rgba(0,0,0,0.9)' }}>{row.role}</span>
          <div className={styles.feeTooltipWrap}>
            <span className={styles.calloutLink}>
              <span className={styles.calloutLinkText}>Fee: {row.feePct}% of hire's salary</span>
            </span>
            <div className={styles.feeTooltip}>
              Based on a <strong>forecasted</strong> Account salary of {fmt(row.salary ?? 0)}, LinkedIn's fee per hire would be {fmt(row.feeAmount ?? 0)}.
            </div>
          </div>
        </div>
      ) : null,
    },
    {
      title: 'Quantity',
      key: 'quantity',
      width: 240,
      align: 'right',
      render: (_, row) => row.role ? (
        <div className={styles.feeTooltipWrap} style={{ justifyContent: 'flex-end' }}>
          <span className={styles.calloutLink}>
            <span className={styles.calloutLinkText}>Covers all hires</span>
          </span>
          <div className={styles.feeTooltip}>
            Any number of hires can be made during the agreed upon term
          </div>
        </div>
      ) : null,
    },
    {
      title: 'Rep discount',
      key: 'repDiscount',
      width: 200,
      align: 'right',
      render: (_, row) => row.role ? <span style={{ fontSize: 14, letterSpacing: '-0.15px', color: 'rgba(0,0,0,0.9)' }}>--</span> : null,
    },
    {
      title: 'Unit price',
      key: 'unitPrice',
      width: 176,
      align: 'right',
      render: (_, row) => row.role ? <span style={{ fontSize: 14, letterSpacing: '-0.15px', color: 'rgba(0,0,0,0.9)' }}>--</span> : null,
    },
    {
      title: 'Net price',
      key: 'netPrice',
      width: 160,
      align: 'right',
      render: (_, row) => row.role ? <span style={{ fontSize: 14, letterSpacing: '-0.15px', color: 'rgba(0,0,0,0.9)' }}>$0.00 upfront</span> : null,
    },
    {
      title: '',
      key: 'actions',
      width: 160,
      align: 'right',
      render: (_, row) => row.role ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
          <button className={styles.btnTertiary} onClick={() => onEdit(row)}>Edit</button>
          <button className={styles.btnTertiary} onClick={() => onRemove(row.key)}>Remove</button>
        </div>
      ) : null,
    },
  ];
}

function buildReadOnlyProductColumns(): ColumnsType<ProductRow> {
  return [
    {
      title: 'Product',
      key: 'product',
      render: (_, row) => row.role ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.9)', letterSpacing: '-0.15px', lineHeight: 1.25 }}>Full-service hiring</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 14, color: 'rgba(0,0,0,0.9)', letterSpacing: '-0.15px', lineHeight: 1.25 }}>{row.role}</span>
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.9)' }}>∙</span>
            <div className={styles.feeTooltipWrap}>
              <span className={styles.calloutLink}><span className={styles.calloutLinkText}>Fee: {row.feePct}% of hire's salary</span></span>
              <div className={styles.feeTooltip}>Based on a <strong>forecasted</strong> Account salary of {fmt(row.salary ?? 0)}, LinkedIn's fee per hire would be {fmt(row.feeAmount ?? 0)}.</div>
            </div>
          </div>
        </div>
      ) : null,
    },
    {
      title: 'Quantity', key: 'quantity', width: 240, align: 'right',
      render: (_, row) => row.role ? (
        <div className={styles.feeTooltipWrap} style={{ justifyContent: 'flex-end' }}>
          <span className={styles.calloutLink}><span className={styles.calloutLinkText}>Covers all hires</span></span>
          <div className={styles.feeTooltip}>Any number of hires can be made during the agreed upon term</div>
        </div>
      ) : null,
    },
    { title: 'Rep discount', key: 'repDiscount', width: 200, align: 'right', render: (_, row) => row.role ? <span style={{ fontSize: 14, letterSpacing: '-0.15px', color: 'rgba(0,0,0,0.9)' }}>--</span> : null },
    { title: 'Unit price', key: 'unitPrice', width: 176, align: 'right', render: (_, row) => row.role ? <span style={{ fontSize: 14, letterSpacing: '-0.15px', color: 'rgba(0,0,0,0.9)' }}>--</span> : null },
    { title: 'Net price', key: 'netPrice', width: 160, align: 'right', render: (_, row) => row.role ? <span style={{ fontSize: 14, letterSpacing: '-0.15px', color: 'rgba(0,0,0,0.9)' }}>$0.00 upfront</span> : null },
  ];
}

// Role typeahead for the Full Service Hiring modal (controlled)
interface RoleTypeaheadProps {
  value: string;
  onChange: (v: string) => void;
  onSelect: (role: string) => void;
  isSelected?: boolean;
  hasError?: boolean;
}
function RoleTypeahead({ value, onChange, onSelect, isSelected, hasError }: RoleTypeaheadProps) {
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = value.trim()
    ? JOB_ROLES.filter(r => r.toLowerCase().includes(value.toLowerCase()))
    : [];

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder="Search by role name"
        className={`${styles.fieldInput} ${hasError ? styles.fieldInputError : ''}`}
        style={isSelected ? { color: 'rgba(0,0,0,0.9)' } : undefined}
        onChange={e => { onChange(e.target.value); setOpen(true); }}
        onFocus={() => { if (value) setOpen(true); }}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />
      {open && matches.length > 0 && (
        <div className={styles.roleDropdown}>
          {matches.map(role => (
            <div
              key={role}
              className={styles.roleDropdownItem}
              onMouseDown={() => { onSelect(role); setOpen(false); }}
            >
              {role}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Quote Advisor content — shared between in-card and floating layouts
interface QuoteAdvisorContentProps {
  contentOn?: boolean;
  products?: ProductRow[];
}
function QuoteAdvisorContent({ contentOn, products = [] }: QuoteAdvisorContentProps) {
  if (contentOn && products.length > 0) {
    return (
      <div className={styles.advisorCardStack}>
        <div className={styles.advisorCard}>
          <div className={styles.advisorCardHeader}>
            <span className={styles.advisorCardTagAlert}>Must be resolved</span>
          </div>
          <p className={styles.advisorCardTitle}>Task title</p>
          <p className={styles.advisorCardDesc}>task description</p>
          <button className={styles.advisorCardBtn}>Review</button>
        </div>
        <div className={styles.advisorCard}>
          <div className={styles.advisorCardHeader}>
            <span className={styles.advisorCardTagInfo}>Information only</span>
          </div>
          <p className={styles.advisorCardTitle}>Task title</p>
          <p className={styles.advisorCardDesc}>task description</p>
        </div>
      </div>
    );
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
      <div style={{ position: 'relative', width: 16, height: 16, flexShrink: 0 }}>
        <img src={imgSignalSuccess} alt="" style={{ position: 'absolute', left: 1, top: 1, width: 14, height: 14, display: 'block' }} />
      </div>
      <span style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif', fontSize: 14, fontWeight: 400, color: 'rgba(0,0,0,0.6)', letterSpacing: '-0.15px', lineHeight: 1.25 }}>
        No items to review at the moment
      </span>
    </div>
  );
}

interface SolutionBuilderScreenProps {
  quoteAdvisorLayout?: QuoteAdvisorLayout;
  currentStepId?: string;
  onNavigate?: (stepId: string) => void;
  onCanContinueChange?: (can: boolean) => void;
  quoteAdvisorContentOn?: boolean;
  onHasProductsChange?: (has: boolean) => void;
  products?: ProductRow[];
  onProductsChange?: (products: ProductRow[]) => void;
}

export default function SolutionBuilderScreen({
  quoteAdvisorLayout = 'floating',
  currentStepId,
  onNavigate,
  onCanContinueChange,
  quoteAdvisorContentOn,
  onHasProductsChange,
  products: productsProp = [],
  onProductsChange,
}: SolutionBuilderScreenProps) {
  // Modal / product state
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [checkoutError, setCheckoutError] = useState(false);
  const products = productsProp;
  const setProducts = (updater: ProductRow[] | ((prev: ProductRow[]) => ProductRow[])) => {
    const next = typeof updater === 'function' ? updater(products) : updater;
    onProductsChange?.(next);
  };
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Confirmation dialog state
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Toast state
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const showToast = () => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToastVisible(true);
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 3000);
  };

  const showProductMenu = menuOpen;
  const showFilled = products.length > 0;
  const showModal = modalOpen;
  const [roleQuery, setRoleQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [findersFee, setFindersFee] = useState(String(DEFAULT_FEE_PCT));
  const [roleError, setRoleError] = useState(false);
  const isEditingRef = useRef(false);

  const productColumns = useMemo(() => buildProductColumns(
    (row) => {
      isEditingRef.current = true;
      setEditingKey(row.key);
      setRoleQuery(row.role ?? '');
      setSelectedRole(row.role ?? '');
      setFindersFee(String(row.feePct ?? DEFAULT_FEE_PCT));
      setModalOpen(true);
    },
    (key) => setProducts(prev => prev.filter(p => p.key !== key)),
  ), []);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  useEffect(() => {
    if (showModal) {
      if (!isEditingRef.current) {
        setRoleQuery('');
        setSelectedRole('');
        setFindersFee(String(DEFAULT_FEE_PCT));
        setRoleError(false);
      }
      isEditingRef.current = false;
    }
  }, [showModal]);

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingKey(null);
  };

  const handleAddProduct = () => {
    if (!selectedRole) {
      setRoleError(true);
    } else {
      setRoleError(false);
      const salary = ROLE_SALARIES[selectedRole] ?? DEFAULT_SALARY;
      const pct = Math.max(0, parseFloat(findersFee) || 0);
      const fee = Math.round(salary * pct / 100);
      const row: ProductRow = { key: editingKey ?? `fsh-${Date.now()}`, role: selectedRole, feePct: pct, salary, feeAmount: fee };
      setProducts(prev => editingKey ? prev.map(p => p.key === editingKey ? row : p) : [...prev, row]);
      setEditingKey(null);
      setModalOpen(false);
    }
  };

  useEffect(() => {
    if (currentStepId === 'solution-builder') {
      onCanContinueChange?.(products.length > 0);
    } else {
      onCanContinueChange?.(true);
    }
  }, [products, currentStepId, onCanContinueChange]);

  useEffect(() => {
    onHasProductsChange?.(products.length > 0);
  }, [products, onHasProductsChange]);

  const forecastedSalary = ROLE_SALARIES[selectedRole] ?? DEFAULT_SALARY;
  const feePct = Math.max(0, parseFloat(findersFee) || 0);
  const feeAmount = Math.round(forecastedSalary * feePct / 100);
  const readOnlyColumns = useMemo(() => buildReadOnlyProductColumns(), []);
  const isFilled = currentStepId === 'solution-builder-filled';

  // ── Step 8: Checkout generated (read-only) ──────────────────
  if (isFilled) {
    return (
      <div className={styles.page}>

        {/* Nav */}
        <header className={styles.topNav}>
          <div className={styles.navLeft}>
            <img src={imgNavLogo} alt="LinkedIn" className={styles.navLogo} />
            <span className={styles.navTitle}>SOLUTION BUILDER</span>
          </div>
          <div className={styles.navSpacer} />
          <Avatar src={imgAmyAvatar} size={32} style={{ flexShrink: 0 }} />
        </header>

        {/* Sub-header */}
        <div className={styles.subHeader}>
          <div className={styles.subHeaderLeft}>
            <div className={styles.breadcrumbs}>
              <span className={styles.breadcrumbItem}>Quotes</span>
              <div className={styles.chevronWrap}><img src={imgChevron} alt="" className={styles.chevronInner} /></div>
            </div>
            <div className={styles.quoteAndCrm}>
              <div className={styles.quoteRow}>
                <Typography.Title level={3} style={{ margin: 0, fontSize: 24, fontWeight: 600, color: 'rgba(0,0,0,0.9)', letterSpacing: '0.36px' }}>
                  Q123213
                </Typography.Title>
                <Tag
                  style={{
                    background: '#fde2bc',
                    border: 'none',
                    borderRadius: 4,
                    color: 'rgba(0,0,0,0.9)',
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    fontSize: 16,
                    fontWeight: 600,
                    letterSpacing: '-0.32px',
                    lineHeight: 1.25,
                    padding: '1px 4px',
                    margin: 0,
                  }}
                >
                  Checkout in progress
                </Tag>
              </div>
              <div className={styles.crmLink}>
                <span className={styles.crmLinkText}>HireNow CRM</span>
                <div className={styles.linkIconWrap}><img src={imgLinkExternal} alt="" className={styles.linkIconInner} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main scrollable */}
        <main className={styles.main}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 1280, width: '100%', margin: '0 auto' }}>

            {/* Hero card */}
            <div className={styles.heroCard}>
              <div className={styles.heroLeft}>
                <img src={imgAlexHero} alt="Alex" className={styles.heroAvatar} />
                <div>
                  <p className={styles.heroTitle}>Alex Rodrigo's checkout generated</p>
                  <p className={styles.heroExpiry}>Expires on 02/13/2026 (in 30 days)</p>
                </div>
              </div>
              <div className={styles.heroActions}>
                <Button
                  className={styles.btnCancel}
                  style={{ borderRadius: 24, fontSize: 16, fontWeight: 600, letterSpacing: '-0.32px', padding: '12px 24px', height: 'auto' }}
                  onClick={() => setConfirmOpen(true)}
                >
                  Cancel link and edit quote
                </Button>
                <Button
                  type="primary"
                  style={{ borderRadius: 24, fontSize: 16, fontWeight: 600, letterSpacing: '-0.32px', padding: '12px 24px', height: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}
                  onClick={showToast}
                >
                  <div style={{ position: 'relative', width: 20, height: 20, flexShrink: 0 }}>
                    <img src={imgCopyLinkIcon} alt="" style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', display: 'block' }} />
                  </div>
                  Copy checkout link
                </Button>
              </div>
            </div>

            {/* Main card: Products + Billing */}
            <div className={styles.cardReadOnly}>

              {/* Products */}
              <section className={styles.section}>
                <Typography.Title level={2} style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Products</Typography.Title>
                <div className={styles.tableWithGuides}>
                  <div className={`${styles.totalsGuide} ${styles.totalsGuideLeft}`} />
                  <div className={`${styles.totalsGuide} ${styles.totalsGuideRight}`} />
                  <Table<ProductRow>
                    columns={readOnlyColumns}
                    dataSource={products}
                    pagination={false}
                    style={{ marginTop: 0 }}
                  />
                  <div className={styles.totalsOuter}>
                    <div className={styles.totalsBlock}>
                      <div className={`${styles.totalsRow} ${styles.totalsRowGray}`}>
                        <span className={styles.totalsLabel}>Total discount (0%)</span>
                        <span>$0.00</span>
                      </div>
                      <div className={`${styles.totalsRow} ${styles.totalsRowRegular}`}>
                        <span>Total before tax</span><span>$0.00</span>
                      </div>
                      <div className={`${styles.totalsRow} ${styles.totalsRowRegular}`}>
                        <span>Estimated tax</span><span>$0.00</span>
                      </div>
                      <div className={`${styles.totalsRow} ${styles.totalsRowGray}`}>
                        <span className={styles.totalsLabelDark}>Total after tax</span>
                        <span className={styles.totalsValueDark}>$0.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Billing */}
              <section className={styles.section}>
                <Typography.Title level={2} style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Billing</Typography.Title>
                <div className={styles.billingRow}>
                  {[
                    { label: 'Start date', value: 'Signing date' },
                    { label: 'Term', value: '12 months' },
                    { label: 'Payment method', value: 'Invoice' },
                  ].map(({ label, value }) => (
                    <div key={label} className={styles.billingField}>
                      <Typography.Text style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.75)', display: 'block', marginBottom: 4 }}>{label}</Typography.Text>
                      <Typography.Text style={{ fontSize: 16, color: 'rgba(0,0,0,0.9)', display: 'block', letterSpacing: '-0.32px' }}>{value}</Typography.Text>
                    </div>
                  ))}
                  <div className={styles.billingField}>
                    <Typography.Text style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.75)', display: 'block', marginBottom: 4 }}>Invoice payment term</Typography.Text>
                    <Typography.Text style={{ fontSize: 16, color: 'rgba(0,0,0,0.9)', letterSpacing: '-0.32px' }}>NET30</Typography.Text>
                  </div>
                </div>
              </section>

            </div>
          </div>
        </main>

        {/* Confirmation dialog */}
        {confirmOpen && (
          <div className={styles.confirmScrim}>
            <div className={styles.confirmDialog}>
              <button className={styles.confirmCloseBtn} onClick={() => setConfirmOpen(false)}>
                <div className={styles.confirmCloseBtnInner}>
                  <div className={styles.confirmCloseIconWrap}>
                    <img src={imgConfirmClose} alt="Close" className={styles.confirmCloseIconInner} />
                  </div>
                </div>
              </button>
              <div className={styles.confirmHeader}>
                <p className={styles.confirmHeading}>Cancel current checkout link and edit quote?</p>
              </div>
              <div className={styles.confirmBody}>
                <p className={styles.confirmBodyText}>This will deactivate the current checkout link, so it can no longer be used.</p>
                <p className={styles.confirmBodyText}>You'll return to the quote editor to make changes and generate a new link.</p>
              </div>
              <div className={styles.confirmDivider} />
              <div className={styles.confirmButtons}>
                <button className={styles.confirmBtnCancel} onClick={() => setConfirmOpen(false)}>Keep link and quote</button>
                <button className={styles.confirmBtnContinue} onClick={() => { setConfirmOpen(false); onNavigate?.('solution-builder'); }}>Cancel link and edit quote</button>
              </div>
            </div>
          </div>
        )}

        {/* Toast — only rendered when visible so animation doesn't fire on step mount */}
        {toastVisible && (
          <div className={styles.toast}>
            <div className={styles.toastRow}>
              <div className={styles.toastIconText}>
                <div className={styles.toastIconWrap}>
                  <img src={imgToastSuccess} alt="" className={styles.toastIconInner} />
                </div>
                <p className={styles.toastText}>Link copied to clipboard.</p>
              </div>
              <button className={styles.toastCloseBtn} onClick={() => setToastVisible(false)}>
                <div className={styles.toastCloseIconWrap}>
                  <img src={imgToastClose} alt="" className={styles.toastCloseIconInner} />
                </div>
              </button>
            </div>
          </div>
        )}

      </div>
    );
  }

  return (
    <div className={styles.page}>

      {/* ── 1. Top Nav ──────────────────────────────────────── */}
      <header className={styles.topNav}>
        <div className={styles.navLeft}>
          <img src={imgNavLogo} alt="LinkedIn" className={styles.navLogo} />
          <span className={styles.navTitle}>SOLUTION BUILDER</span>
        </div>
        <div className={styles.navSpacer} />
        <Avatar src={imgAmyAvatar} size={32} style={{ flexShrink: 0 }} />
      </header>

      {/* ── 2. Sub-header ───────────────────────────────────── */}
      <div className={styles.subHeader}>
        <div className={styles.subHeaderLeft}>
          <div className={styles.breadcrumbs}>
            <span className={styles.breadcrumbItem}>Quotes</span>
            <div className={styles.chevronWrap}>
              <img src={imgChevron} alt="" className={styles.chevronInner} />
            </div>
          </div>
          <div className={styles.quoteRow}>
            <Typography.Title level={3} style={{ margin: 0, fontSize: 24, fontWeight: 600, color: 'rgba(0,0,0,0.9)', letterSpacing: '0.36px' }}>
              Q123213
            </Typography.Title>
            <Tag
              style={{
                background: 'rgba(0,0,0,0.08)',
                border: 'none',
                borderRadius: 4,
                color: 'rgba(0,0,0,0.9)',
                fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                fontSize: 16,
                fontWeight: 600,
                letterSpacing: '-0.32px',
                lineHeight: 1.25,
                padding: '4px 8px',
                margin: 0,
              }}
            >
              Quote in progress
            </Tag>
          </div>
        </div>
        <div className={styles.subHeaderRight}>
          <div className={styles.navSaved}>
            <span>All changes saved</span>
          </div>
          <div className={styles.crmLink}>
            <span className={styles.crmLinkText}>HireNow CRM</span>
            {/* LinkExternalSmall: 16×16 outer, inner image 13×13 at left:3px top:1px */}
            <div className={styles.linkIconWrap}>
              <img src={imgLinkExternal} alt="" className={styles.linkIconInner} />
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Main Scrollable Area ──────────────────────────── */}
      <main className={`${styles.main} ${quoteAdvisorLayout === 'floating' ? styles.mainWithFloat : ''}`}>
        <div className={styles.card}>

          {/* ── Section A: Customer ─────────────────────────── */}
          <section className={styles.section}>
            <Typography.Title level={2} style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
              Customer
            </Typography.Title>
            <div className={styles.customerField}>
              <Avatar src={imgAlexAvatar} size={48} style={{ flexShrink: 0, borderRadius: '50%' }} />
              <div className={styles.customerInfo}>
                <Typography.Text style={{ fontSize: 16, fontWeight: 600, color: 'rgba(0,0,0,0.9)', letterSpacing: '-0.32px', lineHeight: 1.25, display: 'block' }}>
                  Alex Rodrigo
                </Typography.Text>
                <Typography.Text style={{ fontSize: 12, fontWeight: 400, color: 'rgba(0,0,0,0.6)', lineHeight: 1.25, display: 'block' }}>
                  arodrigo@gmail.com
                </Typography.Text>
              </div>
            </div>
          </section>

          {/* ── Section B: Products ─────────────────────────── */}
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <Typography.Title level={2} style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
                Products
              </Typography.Title>
              <div className={styles.addProductWrapper} ref={menuRef}>
                <Button
                  className={styles.btnOutlined}
                  style={{
                    borderRadius: 24,
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: '-0.15px',
                    lineHeight: 1.25,
                    padding: '7px 16px',
                    height: 'auto',
                  }}
                  onClick={() => setModalOpen(true)}
                >
                  Add product
                </Button>
              </div>
            </div>
            {checkoutError && products.length === 0 && (
              <div className={styles.fieldError} style={{ marginTop: -8 }}>
                <div className={styles.fieldErrorIcon}>
                  <img src={imgSignalErrorSm} alt="" className={styles.fieldErrorIconImg} />
                </div>
                <span>Add at least one product to generate a checkout link.</span>
              </div>
            )}

            <div className={styles.tableWithGuides}>
              {/* Vertical guide lines — span from table header top to totals bottom */}
              <div className={`${styles.totalsGuide} ${styles.totalsGuideLeft}`} />
              <div className={`${styles.totalsGuide} ${styles.totalsGuideRight}`} />

              <Table<ProductRow>
                columns={productColumns}
                dataSource={products}
                pagination={false}
                locale={{
                  emptyText: (
                    <span style={{
                      fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                      fontSize: 14,
                      fontWeight: 400,
                      color: 'rgba(0,0,0,0.6)',
                      letterSpacing: '-0.32px',
                      lineHeight: 1.25,
                    }}>
                      There aren't any products added, once there are you'll see them here.
                    </span>
                  ),
                }}
                style={{ marginTop: 0 }}
              />

              {/* Totals block */}
              <div className={styles.totalsOuter}>
              <div className={styles.totalsBlock}>
                <div className={`${styles.totalsRow} ${styles.totalsRowGray}`}>
                  <span className={styles.totalsLabel}>Total discount (0%)</span>
                  <span>$0.00</span>
                </div>
                <div className={`${styles.totalsRow} ${styles.totalsRowRegular}`}>
                  <span>Total before tax</span>
                  <span>$0.00</span>
                </div>
                <div className={`${styles.totalsRow} ${styles.totalsRowRegular}`}>
                  <span>Estimated tax</span>
                  <span>$0.00</span>
                </div>
                <div className={`${styles.totalsRow} ${styles.totalsRowGray}`}>
                  <span className={styles.totalsLabelDark}>Total after tax</span>
                  <span className={styles.totalsValueDark}>$0.00</span>
                </div>
              </div>
              </div>
            </div>{/* end tableWithGuides */}
          </section>

          {/* ── Section C: Billing ──────────────────────────── */}
          <section className={styles.section}>
            <Typography.Title level={2} style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
              Billing
            </Typography.Title>
            <div className={styles.billingRow}>
              {(showFilled
                ? [
                    { label: 'Start date', value: 'Signing date' },
                    { label: 'Term', value: '12 months' },
                    { label: 'Payment method', value: 'Invoice' },
                  ]
                : [
                    { label: 'Start date', value: '--' },
                    { label: 'Term', value: '--' },
                    { label: 'Payment method', value: '--' },
                  ]
              ).map(({ label, value }) => (
                <div key={label} className={styles.billingField}>
                  <Typography.Text style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.75)', display: 'block', marginBottom: 4 }}>
                    {label}
                  </Typography.Text>
                  <Typography.Text style={{ fontSize: 16, color: 'rgba(0,0,0,0.9)', display: 'block', letterSpacing: '-0.32px' }}>
                    {value}
                  </Typography.Text>
                </div>
              ))}
              {showFilled && (
                <div className={styles.billingField}>
                  <Typography.Text style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.75)', display: 'block', marginBottom: 4 }}>
                    Invoice payment term
                  </Typography.Text>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Typography.Text style={{ fontSize: 16, color: 'rgba(0,0,0,0.9)', letterSpacing: '-0.32px' }}>
                      NET30
                    </Typography.Text>
                    <button className={styles.btnTertiary}>
                      Edit
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ── Section D: Quote Advisor — hidden when floating ── */}
          {quoteAdvisorLayout === 'in-card' && (
            <section className={`${styles.section} ${styles.sectionDivider}`}>
              <Typography.Title level={2} style={{ fontSize: 20, fontWeight: 600, margin: '0 0 8px' }}>
                Quote advisor
              </Typography.Title>
              <QuoteAdvisorContent contentOn={quoteAdvisorContentOn} products={products} />
            </section>
          )}

        </div>

        {/* Floating Quote Advisor panel — to the right of the card */}
        {quoteAdvisorLayout === 'floating' && (
          <div className={styles.floatingAdvisor}>
            <Typography.Title level={2} style={{ fontSize: 20, fontWeight: 600, margin: '0 0 24px' }}>
              Quote advisor
            </Typography.Title>
            <QuoteAdvisorContent contentOn={quoteAdvisorContentOn} products={products} />
          </div>
        )}
      </main>

      {/* ── Modal: Full Service Hiring ──────────────────────── */}
      {showModal && (
        <div className={styles.modalScrim}>
          <div className={styles.modal}>
            {/* Header */}
            <div className={styles.modalHeader}>
              <Typography.Title level={2} style={{ fontSize: 20, fontWeight: 600, margin: 0, letterSpacing: '0.38px' }}>
                {editingKey ? 'Edit Full-service hiring' : 'Add Full-service hiring'}
              </Typography.Title>
              <button className={styles.modalCloseBtn} onClick={handleModalClose}>
                <img src={imgCloseSmall} alt="Close" style={{ width: 12, height: 12, display: 'block' }} />
              </button>
            </div>

            {/* Body */}
            <div className={styles.modalBody}>
              {/* Role typeahead */}
              <div className={styles.modalField}>
                <label className={styles.fieldLabel}>Role</label>
                <RoleTypeahead
                  value={roleQuery}
                  onChange={v => { setRoleQuery(v); if (v !== selectedRole) setSelectedRole(''); }}
                  onSelect={role => { setSelectedRole(role); setRoleQuery(role); setRoleError(false); }}
                  isSelected={!!selectedRole}
                  hasError={roleError}
                />
                {roleError && (
                  <div className={styles.fieldError}>
                    <div className={styles.fieldErrorIcon}>
                      <img src={imgSignalErrorSm} alt="" className={styles.fieldErrorIconImg} />
                    </div>
                    <span>Add a role</span>
                  </div>
                )}
              </div>

              {/* Finder's fee */}
              <div className={styles.modalField}>
                <label className={styles.fieldLabel}>Finder's fee (% of hire's salary)</label>
                <div className={styles.feeInputWrap}>
                  <input
                    type="text"
                    value={findersFee}
                    className={styles.feeInput}
                    onChange={e => setFindersFee(e.target.value.replace(/[^0-9.]/g, ''))}
                  />
                  <span className={styles.feePrefix}>%</span>
                </div>
                <p className={styles.fieldHelper}>Between XX% – XX%</p>
              </div>

              {/* Info notice */}
              <div className={styles.modalNotice}>
                <div style={{ position: 'relative', width: 24, height: 24, flexShrink: 0, marginTop: 2 }}>
                  <img src={imgSignalNotice} alt="" style={{ position: 'absolute', left: 3, top: 3, width: 18, height: 18, display: 'block' }} />
                </div>
                <Typography.Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.9)', letterSpacing: '-0.15px', lineHeight: 1.25, display: 'block', minHeight: '3.75em' }}>
                  Headcount isn't fixed, this agreement covers all hires for this role during the term.{selectedRole && (
                    <> LinkedIn's fee per hire: <strong>{feePct}% (finder's fee) × {fmt(forecastedSalary)} (forecasted salary) = {fmt(feeAmount)}.</strong></>
                  )}
                </Typography.Text>
              </div>
            </div>

            {/* Footer */}
            <div className={styles.modalFooter}>
              <div className={styles.modalDivider} />
              <div className={styles.modalActions}>
                <Button
                  className={styles.btnCancel}
                  style={{ borderRadius: 24, fontSize: 16, fontWeight: 600, letterSpacing: '-0.32px', padding: '12px 24px', height: 'auto' }}
                  onClick={handleModalClose}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  style={{ borderRadius: 24, fontSize: 16, fontWeight: 600, letterSpacing: '-0.32px', padding: '12px 24px', height: 'auto' }}
                  onClick={handleAddProduct}
                >
                  {editingKey ? 'Save' : 'Add'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── 4. Footer ───────────────────────────────────────── */}
      <footer className={styles.footer}>
        <Button
          className={styles.btnCancel}
          style={{
            borderRadius: 24,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '-0.32px',
            lineHeight: 1.25,
            padding: '12px 24px',
            height: 'auto',
          }}
        >
          Cancel
        </Button>
        <Button
          type="primary"
          style={{
            borderRadius: 24,
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: 16,
            fontWeight: 600,
            letterSpacing: '-0.32px',
            lineHeight: 1.25,
            padding: '12px 24px',
            height: 'auto',
          }}
          onClick={() => {
            if (products.length === 0) {
              setCheckoutError(true);
            } else {
              onNavigate?.('solution-builder-filled');
            }
          }}
        >
          Generate checkout
        </Button>
      </footer>

    </div>
  );
}
