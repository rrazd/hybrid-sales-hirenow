/**
 * Screen 7: Solution Builder
 * Perspective: Amy (LinkedIn Sales Rep)
 * Fidelity: High — full interactive layout with ANT Design v5.
 *
 * Amy configures a quote for Alex in LinkedIn's internal sales tool.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Avatar, Button, Table, Tag, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { QuoteAdvisorLayout, FSHLayout } from '../../App';
import { JOB_ROLES, ROLE_SALARIES } from '../../data/jobRoles';
import styles from './SolutionBuilderScreen.module.css';

const DEFAULT_SALARY = 150000;
const DEFAULT_FEE_PCT = 15;

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

const imgNavLogo       = '/linkedin-logo.svg';
const imgAmyAvatar     = '/amy-avatar.png';
const imgAlexAvatar    = '/alex-avatar.png';
const imgAlexHero      = 'https://www.figma.com/api/mcp/asset/05256d12-4662-4a99-bba6-d052c6f35f15';
const imgCheckIcon     = 'https://www.figma.com/api/mcp/asset/252c479f-5ead-4a4d-b549-3ab7d7800642';
const imgChevron       = 'https://www.figma.com/api/mcp/asset/8625bbe4-1fee-44ed-b49d-1d4322e32b44';
const imgLinkExternal  = 'https://www.figma.com/api/mcp/asset/27f853cf-8d03-418d-8ba2-512a6b7589a3';
const imgSignalSuccess = 'https://www.figma.com/api/mcp/asset/aae46a4b-1016-43a3-85bb-3a52c255c7a0';
const imgCloseSmall    = 'https://www.figma.com/api/mcp/asset/a5be571a-9b5a-4b47-8fc5-67853f09c724';
const imgSignalNotice  = 'https://www.figma.com/api/mcp/asset/d0ac7d69-84ee-4ff1-8323-70b4b9b2f8f8';
const imgSignalErrorSm = 'https://www.figma.com/api/mcp/asset/da459368-7e79-4f2a-9389-86d21f37b18b';
const imgCopyLinkIcon  = 'https://www.figma.com/api/mcp/asset/bf15c9e2-17dd-4f44-ba36-8129d94213d1';
const imgToastSuccess  = 'https://www.figma.com/api/mcp/asset/19040906-95e3-4347-b441-f0487c8b725d';
const imgToastClose    = 'https://www.figma.com/api/mcp/asset/a5be571a-9b5a-4b47-8fc5-67853f09c724';
const imgConfirmClose  = 'https://www.figma.com/api/mcp/asset/a5be571a-9b5a-4b47-8fc5-67853f09c724';
const imgAddSmall      = 'https://www.figma.com/api/mcp/asset/678cf85e-c2af-45d6-9847-5b3a07238fbd';

export type ProductRow = { key: string; role?: string; feePct?: number; salary?: number; feeAmount?: number };

function buildProductColumns(onEdit: (row: ProductRow) => void, onRemove: (key: string) => void): ColumnsType<ProductRow> {
  return [
    {
      title: 'Product',
      key: 'product',
      onCell: (row) => row.role ? {} : { colSpan: 6 },
      render: (_, row) => row.role ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.9)', letterSpacing: '-0.15px', lineHeight: 1.25 }}>
            Full-service hiring
          </span>
          {row.role === 'Miscellaneous' ? (
            <div className={styles.feeTooltipWrap}>
              <span className={styles.calloutLink}>
                <span className={styles.calloutLinkValueText} style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>Miscellaneous</span>
              </span>
              <div className={styles.feeTooltip}>This role is included by default so the customer can add additional roles during the contract term without updating the contract.</div>
            </div>
          ) : (
            <span style={{ fontSize: 12, letterSpacing: '-0.15px', lineHeight: 1.25, color: 'rgba(0,0,0,0.6)' }}>{row.role}</span>
          )}
          <div className={styles.feeTooltipWrap}>
            <span className={styles.calloutLink}>
              <span className={styles.calloutLinkText} style={{ fontSize: 12 }}>{row.feePct}% fee per hire</span>
            </span>
            <div className={styles.feeTooltip}>
              Based on a <strong>forecasted</strong> Account salary of {fmt(row.salary ?? 0)}, LinkedIn's fee per hire would be {fmt(row.feeAmount ?? 0)}.
            </div>
          </div>
        </div>
      ) : (
        <span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(0,0,0,0.6)', letterSpacing: '-0.32px', lineHeight: 1.25 }}>
          There aren't any products added, once there are you'll see them here.
        </span>
      ),
    },
    {
      title: 'Quantity',
      key: 'quantity',
      width: 348,
      align: 'right',
      onCell: (row) => row.role ? {} : { colSpan: 0 },
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
      title: 'Net price',
      key: 'netPrice',
      width: 160,
      align: 'right',
      onCell: (row) => row.role ? {} : { colSpan: 0 },
      render: (_, row) => row.role ? <span style={{ fontSize: 14, letterSpacing: '-0.15px', color: 'rgba(0,0,0,0.9)' }}>$0.00 upfront</span> : null,
    },
    {
      title: '',
      key: 'actions',
      width: 160,
      align: 'right',
      onCell: (row) => row.role ? {} : { colSpan: 0 },
      render: (_, row) => row.role ? (
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
          <button className={styles.btnTertiary} onClick={() => onEdit(row)}>Edit</button>
          <button className={styles.btnTertiary} onClick={() => onRemove(row.key)}>Remove</button>
        </div>
      ) : null,
    },
  ];
}

function buildSepLineProductColumns(): ColumnsType<ProductRow> {
  return [
    {
      title: 'Product',
      key: 'product',
      render: (_, row) => row.role ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'flex-start' }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.9)', letterSpacing: '-0.15px', lineHeight: 1.25 }}>
            Full-service hiring
          </span>
          {row.role === 'Miscellaneous' ? (
            <div className={styles.feeTooltipWrap}>
              <span className={styles.calloutLink}>
                <span className={styles.calloutLinkValueText} style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>Miscellaneous</span>
              </span>
              <div className={styles.feeTooltip}>This role is included by default so the customer can add additional roles during the contract term without updating the contract.</div>
            </div>
          ) : (
            <span style={{ fontSize: 12, letterSpacing: '-0.15px', lineHeight: 1.25, color: 'rgba(0,0,0,0.6)' }}>{row.role}</span>
          )}
          <div className={styles.feeTooltipWrap}>
            <span className={styles.calloutLink}>
              <span className={styles.calloutLinkText} style={{ fontSize: 12 }}>{row.feePct}% fee per hire</span>
            </span>
            <div className={styles.feeTooltip}>
              Based on a <strong>forecasted</strong> Account salary of {fmt(row.salary ?? 0)}, LinkedIn's fee per hire would be {fmt(row.feeAmount ?? 0)}.
            </div>
          </div>
        </div>
      ) : null,
    },
    {
      title: 'Quantity', key: 'quantity', width: 348, align: 'right',
      render: (_, row) => row.role ? (
        <div className={styles.feeTooltipWrap} style={{ justifyContent: 'flex-end' }}>
          <span className={styles.calloutLink}><span className={styles.calloutLinkText}>Covers all hires</span></span>
          <div className={styles.feeTooltip}>Any number of hires can be made during the agreed upon term</div>
        </div>
      ) : null,
    },
    { title: 'Net price', key: 'netPrice', width: 160, align: 'right', render: (_, row) => row.role ? <span style={{ fontSize: 14, letterSpacing: '-0.15px', color: 'rgba(0,0,0,0.9)' }}>$0.00 upfront</span> : null },
  ];
}

const HierarchyIndicator = () => (
  <svg width="7" height="10" viewBox="0 0 7 10" fill="none" aria-hidden style={{ flexShrink: 0, marginTop: 4 }}>
    <path d="M1 0 L1 7 L7 7" stroke="rgba(0,0,0,0.18)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

interface GroupedProductTableProps {
  products: ProductRow[];
  onEdit?: () => void;
  onRemove?: () => void;
  readOnly?: boolean;
}
function GroupedProductTable({ products, onEdit, onRemove, readOnly = false }: GroupedProductTableProps) {
  const isEmpty = products.length === 0;
  const cellStyle: React.CSSProperties = { fontSize: 14, letterSpacing: '-0.15px', color: 'rgba(0,0,0,0.9)', lineHeight: 1.25 };
  return (
    <div className={styles.groupedTableWrapper}>
      <table className={styles.groupedTable}>
        <colgroup>
          <col />
          <col style={{ width: 188 }} />
          <col style={{ width: 160 }} />
          <col style={{ width: 160 }} />
        </colgroup>
        <thead>
          <tr>
            <th>Product</th>
            <th style={{ textAlign: 'right' }}>Quantity</th>
            <th style={{ textAlign: 'right' }}>Net price</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {isEmpty ? (
            <tr>
              <td colSpan={4} className={styles.groupedEmptyTd}>
                <span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(0,0,0,0.6)', letterSpacing: '-0.32px', lineHeight: 1.25 }}>
                  There aren't any products added, once there are you'll see them here.
                </span>
              </td>
            </tr>
          ) : (
            <>
              {/* Parent row */}
              <tr className={styles.groupedParentTr}>
                <td><span style={{ ...cellStyle, fontWeight: 600, whiteSpace: 'nowrap' }}>Full service hiring</span></td>
                <td style={{ textAlign: 'right' }}>
                  <div className={styles.feeTooltipWrap} style={{ justifyContent: 'flex-end' }}>
                    <span className={styles.calloutLink}><span className={styles.calloutLinkText}>Unlimited</span></span>
                    <div className={styles.feeTooltip}>Any number of hires can be made during the agreed upon contract term.</div>
                  </div>
                </td>
                <td style={{ textAlign: 'right' }}><span style={cellStyle}>$0.00 upfront</span></td>
                <td>
                  {!readOnly && (
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 4 }}>
                      <button className={styles.btnTertiary} onClick={onEdit}>Edit</button>
                      <button className={styles.btnTertiary} onClick={onRemove}>Remove</button>
                    </div>
                  )}
                </td>
              </tr>
              {/* Child rows */}
              {products.map(p => (
                <tr key={p.key} className={styles.groupedChildTr}>
                  <td>
                    <div className={styles.gtChildProductCell}>
                      <HierarchyIndicator />
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
                        {p.role === 'Miscellaneous' ? (
                          <div className={styles.feeTooltipWrap}>
                            <span className={styles.calloutLink}>
                              <span className={styles.calloutLinkValueText} style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>Miscellaneous</span>
                            </span>
                            <div className={styles.feeTooltip}>This role is included by default so the customer can add additional roles during the contract term without updating the contract.</div>
                          </div>
                        ) : (
                          <span style={{ ...cellStyle, fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>{p.role}</span>
                        )}
                        <div className={styles.feeTooltipWrap}>
                          <span className={styles.calloutLink}><span className={styles.calloutLinkText} style={{ fontSize: 12 }}>{p.feePct}% fee per hire</span></span>
                          <div className={styles.feeTooltip}>
                            The fee per hire is the percentage of the hire's first-year salary paid to LinkedIn.
                            {p.role !== 'Miscellaneous' && <> For a forecasted salary of {fmt(p.salary ?? 0)} for {p.role}, the fee would be {fmt(p.feeAmount ?? 0)}.</>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td /><td /><td />
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
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
            {row.role === 'Miscellaneous' ? (
              <div className={styles.feeTooltipWrap}>
                <span className={styles.calloutLink}>
                  <span className={styles.calloutLinkValueText} style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)' }}>Miscellaneous</span>
                </span>
                <div className={styles.feeTooltip}>This role is included by default so the customer can add additional roles during the contract term without updating the contract.</div>
              </div>
            ) : (
              <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.6)', letterSpacing: '-0.15px', lineHeight: 1.25 }}>{row.role}</span>
            )}
            <span style={{ fontSize: 12, color: 'rgba(0,0,0,0.9)' }}>∙</span>
            <div className={styles.feeTooltipWrap}>
              <span className={styles.calloutLink}><span className={styles.calloutLinkText} style={{ fontSize: 12 }}>{row.feePct}% fee per hire</span></span>
              <div className={styles.feeTooltip}>Based on a <strong>forecasted</strong> Account salary of {fmt(row.salary ?? 0)}, LinkedIn's fee per hire would be {fmt(row.feeAmount ?? 0)}.</div>
            </div>
          </div>
        </div>
      ) : null,
    },
    {
      title: 'Quantity', key: 'quantity', width: 348, align: 'right',
      render: (_, row) => row.role ? (
        <div className={styles.feeTooltipWrap} style={{ justifyContent: 'flex-end' }}>
          <span className={styles.calloutLink}><span className={styles.calloutLinkText}>Covers all hires</span></span>
          <div className={styles.feeTooltip}>Any number of hires can be made during the agreed upon term</div>
        </div>
      ) : null,
    },
    { title: 'Net price', key: 'netPrice', width: 160, align: 'right', render: (_, row) => row.role ? <span style={{ fontSize: 14, letterSpacing: '-0.15px', color: 'rgba(0,0,0,0.9)' }}>$0.00 upfront</span> : null },
  ];
}

// Role typeahead for the Full Service Hiring modal (controlled)
interface RoleTypeaheadProps {
  value: string;
  onChange: (v: string) => void;
  onSelect: (role: string) => void;
  onClear?: () => void;
  isSelected?: boolean;
  hasError?: boolean;
}
function RoleTypeahead({ value, onChange, onSelect, onClear, isSelected, hasError }: RoleTypeaheadProps) {
  const [open, setOpen] = useState(false);
  const [dropdownRect, setDropdownRect] = useState<{ top?: number; bottom?: number; left: number; width: number } | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = value.trim()
    ? JOB_ROLES.filter(r => r !== 'Miscellaneous' && r.toLowerCase().includes(value.toLowerCase()))
    : [];

  const openDropdown = () => {
    if (inputRef.current) {
      const r = inputRef.current.getBoundingClientRect();
      const DROPDOWN_HEIGHT = 240; // max visible height
      const spaceBelow = window.innerHeight - r.bottom;
      if (spaceBelow >= DROPDOWN_HEIGHT + 4) {
        setDropdownRect({ top: r.bottom + 4, left: r.left, width: r.width });
      } else {
        setDropdownRect({ bottom: window.innerHeight - r.top + 4, left: r.left, width: r.width });
      }
    }
    setOpen(true);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          placeholder="Search by role name"
          className={`${styles.fieldInput} ${hasError ? styles.fieldInputError : ''}`}
          style={{ ...(isSelected ? { color: 'rgba(0,0,0,0.9)' } : {}), ...(isSelected ? { paddingRight: 40 } : {}) }}
          onChange={e => { onChange(e.target.value); openDropdown(); }}
          onFocus={() => { if (value) openDropdown(); }}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
        />
        {isSelected && onClear && (
          <button
            className={styles.typeaheadClearBtn}
            onMouseDown={e => { e.preventDefault(); onClear(); }}
            aria-label="Clear"
            tabIndex={-1}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <circle cx="10" cy="10" r="10" fill="rgba(0,0,0,0.9)"/>
              <path d="M6.5 6.5L13.5 13.5M13.5 6.5L6.5 13.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        )}
      </div>
      {open && matches.length > 0 && dropdownRect && (
        <div
          className={styles.roleDropdown}
          style={{ position: 'fixed', top: dropdownRect.top, bottom: dropdownRect.bottom, left: dropdownRect.left, width: dropdownRect.width }}
        >
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
  fshLayout?: FSHLayout;
  paymentTerm?: 'NET30' | 'NET60' | 'NET90';
  onPaymentTermChange?: (term: 'NET30' | 'NET60' | 'NET90') => void;
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
  fshLayout = 'grouped',
  paymentTerm: paymentTermProp = 'NET30',
  onPaymentTermChange,
}: SolutionBuilderScreenProps) {
  // Modal / product state — each layout maintains its own products
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [checkoutError, setCheckoutError] = useState(false);
  const [sepLineProducts, setSepLineProducts] = useState<ProductRow[]>(productsProp);
  const [groupedProducts, setGroupedProducts] = useState<ProductRow[]>(productsProp);
  const products = fshLayout === 'sep-line' ? sepLineProducts : groupedProducts;

  // Use a ref so setProducts is always stable and always routes to the current layout's setter
  const fshLayoutRef = useRef(fshLayout);
  useEffect(() => { fshLayoutRef.current = fshLayout; });
  const setProducts = useCallback((updater: ProductRow[] | ((prev: ProductRow[]) => ProductRow[])) => {
    if (fshLayoutRef.current === 'sep-line') {
      setSepLineProducts(prev => typeof updater === 'function' ? updater(prev) : updater);
    } else {
      setGroupedProducts(prev => typeof updater === 'function' ? updater(prev) : updater);
    }
  }, []);

  const paymentTerm = paymentTermProp;
  const setPaymentTerm = (t: 'NET30' | 'NET60' | 'NET90') => onPaymentTermChange?.(t);
  const [paymentTermOpen, setPaymentTermOpen] = useState(false);
  const [paymentTermRect, setPaymentTermRect] = useState<{ top?: number; bottom?: number; left: number; width: number } | null>(null);
  const paymentTermRef = useRef<HTMLDivElement>(null);

  // Saving indicator state
  const [saving, setSaving] = useState(false);
  const savingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMountedSave = useRef(false);

  // Sync active layout's products to parent (for checkout page)
  useEffect(() => {
    onProductsChange?.(products);
    if (isMountedSave.current) {
      setSaving(true);
      if (savingTimer.current) clearTimeout(savingTimer.current);
      savingTimer.current = setTimeout(() => setSaving(false), 1200);
    } else {
      isMountedSave.current = true;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sepLineProducts, groupedProducts, fshLayout]);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Grouped modal state
  interface GroupedRole { id: string; roleQuery: string; role: string; feePct: string; }
  const [groupedRoles, setGroupedRoles] = useState<GroupedRole[]>([]);
  const [groupedRoleErrors, setGroupedRoleErrors] = useState<Set<string>>(new Set());
  const pendingScrollId = useRef<string | null>(null);
  const modalBodyRef = useRef<HTMLDivElement>(null);
  const addGroupedRole = () => {
    const newId = `gr-${Date.now()}`;
    pendingScrollId.current = newId;
    setGroupedRoles(prev => [...prev, { id: newId, roleQuery: '', role: '', feePct: String(DEFAULT_FEE_PCT) }]);
  };
  const removeGroupedRole = (id: string) => {
    setGroupedRoles(prev => prev.filter(r => r.id !== id));
    setGroupedRoleErrors(prev => { const next = new Set(prev); next.delete(id); return next; });
  };

  useEffect(() => {
    const id = pendingScrollId.current;
    if (!id || !modalBodyRef.current) return;
    const card = modalBodyRef.current.querySelector<HTMLElement>(`[data-role-id="${id}"]`);
    if (!card) return;
    // Scroll to bottom so the new card and the "Add role" button are both visible
    modalBodyRef.current.scrollTo({ top: modalBodyRef.current.scrollHeight, behavior: 'smooth' });
    const input = card.querySelector<HTMLInputElement>('input');
    // preventScroll: true stops the browser from overriding our scroll position on focus
    input?.focus({ preventScroll: true });
    pendingScrollId.current = null;
  }, [groupedRoles]);
  const updateGroupedRole = (id: string, patch: Partial<GroupedRole>) => {
    setGroupedRoles(prev => prev.map(r => r.id === id ? { ...r, ...patch } : r));
    if (patch.role) setGroupedRoleErrors(prev => { const next = new Set(prev); next.delete(id); return next; });
  };
  const openEditGroupedModal = () => {
    // Restore groupedRoles from saved products (skip last which is always the misc row)
    const restored: GroupedRole[] = products.slice(0, -1).map((p, i) => ({
      id: `gr-edit-${i}-${p.key}`,
      roleQuery: p.role ?? '',
      role: p.role ?? '',
      feePct: String(p.feePct ?? DEFAULT_FEE_PCT),
    }));
    setGroupedRoles(restored);
    setModalOpen(true);
  };

  const handleAddGroupedProduct = () => {
    const emptyIds = new Set(groupedRoles.filter(r => !r.role).map(r => r.id));
    if (emptyIds.size > 0) {
      setGroupedRoleErrors(emptyIds);
      return;
    }
    const miscSalary = ROLE_SALARIES['Miscellaneous'] ?? DEFAULT_SALARY;
    const miscRow: ProductRow = { key: `fsh-misc-${Date.now()}`, role: 'Miscellaneous', feePct: DEFAULT_FEE_PCT, salary: miscSalary, feeAmount: Math.round(miscSalary * DEFAULT_FEE_PCT / 100) };
    const addedRows: ProductRow[] = groupedRoles
      .filter(r => r.role)
      .map(r => {
        const salary = ROLE_SALARIES[r.role] ?? DEFAULT_SALARY;
        const pct = Math.max(0, parseFloat(r.feePct) || 0);
        return { key: `fsh-${Date.now()}-${r.id}`, role: r.role, feePct: pct, salary, feeAmount: Math.round(salary * pct / 100) };
      });
    setGroupedRoleErrors(new Set());
    setProducts([...addedRows, miscRow]);
    setModalOpen(false);
  };

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
    (key) => setProducts((prev: ProductRow[]) => prev.filter((p: ProductRow) => p.key !== key)),
  ), [setProducts]);

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
      if (fshLayout === 'grouped') {
        // groupedRoles seeded by caller (openEditGroupedModal or fresh-add path)
      } else if (!isEditingRef.current) {
        setRoleQuery('');
        setSelectedRole('');
        setFindersFee(String(DEFAULT_FEE_PCT));
        setRoleError(false);
      }
      isEditingRef.current = false;
    }
  }, [showModal, fshLayout]);

  // Close modal when switching layouts
  const prevFshLayoutRef = useRef(fshLayout);
  useEffect(() => {
    if (prevFshLayoutRef.current !== fshLayout) {
      prevFshLayoutRef.current = fshLayout;
      setModalOpen(false);
      setEditingKey(null);
    }
  }, [fshLayout]);

  const handleModalClose = () => {
    setModalOpen(false);
    setEditingKey(null);
    setGroupedRoleErrors(new Set());
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
      setProducts((prev: ProductRow[]) => editingKey ? prev.map((p: ProductRow) => p.key === editingKey ? row : p) : [...prev, row]);
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
  const sepLineColumns = useMemo(() => buildSepLineProductColumns(), []);
  const isFilled = currentStepId === 'solution-builder-filled' || currentStepId === 'solution-builder-complete';
  const isComplete = currentStepId === 'solution-builder-complete';

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

        {/* Sub-header — same structure as step 7, status updated */}
        <div className={styles.subHeader}>
          <div className={styles.subHeaderLeft}>
            <div className={styles.quoteRow}>
              <Typography.Title level={3} style={{ margin: 0, fontSize: 24, fontWeight: 600, color: 'rgba(0,0,0,0.9)', letterSpacing: '0.36px' }}>
                Q123213
              </Typography.Title>
              <Tag
                style={{
                  background: isComplete ? '#d4edda' : '#fde2bc',
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
                {isComplete ? 'Checkout complete' : 'Checkout in progress'}
              </Tag>
            </div>
          </div>
          <div className={styles.subHeaderRight}>
            <div className={styles.crmLink}>
              <span className={styles.crmLinkText}>HireNow CRM</span>
              <div className={styles.linkIconWrap}>
                <img src={imgLinkExternal} alt="" className={styles.linkIconInner} />
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
                  <p className={styles.heroTitle}>{isComplete ? 'Alex Rodrigo has placed the order.' : 'Alex Rodrigo\'s checkout generated'}</p>
                  {!isComplete && <p className={styles.heroExpiry}>Expires on 02/13/2026 (in 30 days)</p>}
                </div>
              </div>
              {!isComplete && (
                <div className={styles.heroActions}>
                  <Button
                    className={styles.btnCancel}
                    style={{ borderRadius: 24, fontSize: 16, fontWeight: 600, letterSpacing: '-0.32px', padding: '12px 24px', height: 'auto' }}
                    onClick={() => setConfirmOpen(true)}
                  >
                    Edit quote
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
              )}
            </div>

            {/* Main card: Products + Billing */}
            <div className={styles.cardReadOnly}>

              {/* Products */}
              <section className={styles.section}>
                <Typography.Title level={2} style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>Products</Typography.Title>
                <div className={styles.tableWithGuides}>
                  <div className={`${styles.totalsGuide} ${styles.totalsGuideLeftGrouped}`} />
                  <div className={`${styles.totalsGuide} ${styles.totalsGuideRightGrouped}`} />
                  {fshLayout === 'grouped' ? (
                    <GroupedProductTable products={products} readOnly />
                  ) : (
                    <Table<ProductRow>
                      columns={readOnlyColumns}
                      dataSource={products}
                      pagination={false}
                      style={{ marginTop: 0 }}
                    />
                  )}
                  <div className={`${styles.totalsOuter} ${styles.totalsOuterGrouped}`}>
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
                      <Typography.Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.9)', display: 'block', letterSpacing: '-0.15px' }}>{value}</Typography.Text>
                    </div>
                  ))}
                  <div className={styles.billingField}>
                    <Typography.Text style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.75)', display: 'block', marginBottom: 4 }}>Invoice payment term</Typography.Text>
                    <Typography.Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.9)', letterSpacing: '-0.15px' }}>{paymentTerm}</Typography.Text>
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
                <p className={styles.confirmHeading}>Edit quote</p>
              </div>
              <div className={styles.confirmBody}>
                <p className={styles.confirmBodyText}><strong>This will deactivate the current checkout link</strong>, so it can no longer be used. You'll return to the quote editor to make changes and generate a new link.</p>
              </div>
              <div className={styles.confirmDivider} />
              <div className={styles.confirmButtons}>
                <button className={styles.confirmBtnCancel} onClick={() => setConfirmOpen(false)}>Cancel</button>
                <button className={styles.confirmBtnContinue} onClick={() => { setConfirmOpen(false); onNavigate?.('solution-builder'); }}>Edit quote</button>
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
        <div className={styles.crmLink}>
          <span className={styles.crmLinkText}>HireNow CRM</span>
          <div className={styles.linkIconWrap}>
            <img src={imgLinkExternal} alt="" className={styles.linkIconInner} />
          </div>
        </div>
      </div>

      {/* ── 3. Main Scrollable Area ──────────────────────────── */}
      <main className={styles.main}>
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
                <Typography.Text style={{ fontSize: 14, fontWeight: 400, color: 'rgba(0,0,0,0.6)', lineHeight: 1.25, display: 'block' }}>
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
                <div className={fshLayout === 'grouped' && products.length > 0 ? styles.feeTooltipWrap : undefined}>
                  <Button
                    className={styles.btnOutlined}
                    disabled={fshLayout === 'grouped' && products.length > 0}
                    style={{
                      borderRadius: 24,
                      fontSize: 14,
                      fontWeight: 600,
                      letterSpacing: '-0.15px',
                      lineHeight: 1.25,
                      padding: '7px 16px',
                      height: 'auto',
                    }}
                    onClick={() => { setGroupedRoles([{ id: `gr-${Date.now()}`, roleQuery: '', role: '', feePct: String(DEFAULT_FEE_PCT) }]); setModalOpen(true); }}
                  >
                    Add product
                  </Button>
                  {fshLayout === 'grouped' && products.length > 0 && (
                    <div className={styles.feeTooltip} style={{ right: 0, left: 'auto', width: 320 }}>
                      Only one product (Full-service hiring) is available, and it has already been added to this quote.
                    </div>
                  )}
                </div>
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

              {fshLayout === 'grouped' ? (
                <GroupedProductTable
                  products={products}
                  onEdit={openEditGroupedModal}
                  onRemove={() => setProducts([])}
                />
              ) : (
                <Table<ProductRow>
                  columns={productColumns}
                  dataSource={products}
                  locale={{
                    emptyText: (
                      <span style={{ fontSize: 14, fontWeight: 400, color: 'rgba(0,0,0,0.6)', letterSpacing: '-0.32px', lineHeight: 1.25 }}>
                        There aren't any products added, once there are you'll see them here.
                      </span>
                    ),
                  }}
                  pagination={false}
                  style={{ marginTop: 0 }}
                  components={{
                    table: (props: React.HTMLAttributes<HTMLTableElement>) => (
                      <table {...props} style={{ ...props.style, tableLayout: 'fixed', width: '100%' }} />
                    ),
                  }}
                />
              )}

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
                  <Typography.Text style={{ fontSize: 14, color: 'rgba(0,0,0,0.9)', display: 'block', letterSpacing: '-0.15px' }}>
                    {value}
                  </Typography.Text>
                </div>
              ))}
              <div className={styles.billingField}>
                <Typography.Text style={{ fontSize: 14, fontWeight: 600, color: 'rgba(0,0,0,0.75)', display: 'block', marginBottom: 8 }}>
                  Invoice payment term
                </Typography.Text>
                <div className={styles.paymentTermWrap} ref={paymentTermRef}>
                  <button
                    className={`${styles.paymentTermSelect} ${paymentTermOpen ? styles.paymentTermSelectOpen : ''}`}
                    onClick={() => {
                      if (!paymentTermOpen && paymentTermRef.current) {
                        const r = paymentTermRef.current.getBoundingClientRect();
                        const MENU_HEIGHT = 176; // 3 items × ~48px + 32px padding
                        const spaceBelow = window.innerHeight - r.bottom;
                        if (spaceBelow >= MENU_HEIGHT + 4) {
                          setPaymentTermRect({ top: r.bottom + 4, left: r.left, width: r.width });
                        } else {
                          setPaymentTermRect({ bottom: window.innerHeight - r.top + 4, left: r.left, width: r.width });
                        }
                      }
                      setPaymentTermOpen(o => !o);
                    }}
                    onBlur={() => setTimeout(() => setPaymentTermOpen(false), 150)}
                  >
                    {paymentTerm}
                  </button>
                  <svg className={styles.paymentTermCaret} width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <polygon points="0,0 14,0 7,7" fill="rgba(0,0,0,0.9)"/>
                  </svg>
                  {paymentTermOpen && paymentTermRect && (
                    <div className={styles.paymentTermMenu} style={{ position: 'fixed', top: paymentTermRect.top, bottom: paymentTermRect.bottom, left: paymentTermRect.left, width: paymentTermRect.width }}>
                      {(['NET30', 'NET60', 'NET90'] as const).map(opt => (
                        <div
                          key={opt}
                          className={`${styles.paymentTermMenuItem} ${paymentTerm === opt ? styles.paymentTermMenuItemSelected : ''}`}
                          onMouseDown={() => { setPaymentTerm(opt); setPaymentTermOpen(false); }}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* ── Modal: Full Service Hiring (sep-line) ───────────── */}
      {showModal && fshLayout !== 'grouped' && (
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
                <label className={styles.fieldLabel}>Role name</label>
                <RoleTypeahead
                  value={roleQuery}
                  onChange={v => { setRoleQuery(v); if (v !== selectedRole) setSelectedRole(''); }}
                  onSelect={role => { setSelectedRole(role); setRoleQuery(role); setRoleError(false); }}
                  onClear={() => { setRoleQuery(''); setSelectedRole(''); }}
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
                  {editingKey ? 'Save' : 'Add to quote'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal: Full Service Hiring (grouped) ────────────── */}
      {showModal && fshLayout === 'grouped' && (
        <div className={styles.modalScrim}>
          <div className={`${styles.modal} ${styles.modalGrouped}`}>

            {/* Header */}
            <div className={styles.modalHeader}>
              <Typography.Title level={2} style={{ fontSize: 20, fontWeight: 600, margin: 0, letterSpacing: '0.38px' }}>
                Add Full-service hiring
              </Typography.Title>
              <button className={styles.modalCloseBtn} onClick={handleModalClose}>
                <img src={imgCloseSmall} alt="Close" style={{ width: 12, height: 12, display: 'block' }} />
              </button>
            </div>

            {/* Body */}
            <div className={styles.modalBody} ref={modalBodyRef}>
              <div className={styles.groupedRolesSection}>
                <div className={styles.groupedRolesSectionHeader}>
                  <p className={styles.groupedRolesSectionTitle}>Roles</p>
                  <p className={styles.groupedRolesSectionSubtitle}>Headcount isn't fixed for roles, the contract covers all hires.</p>
                </div>

                {groupedRoles.map((entry, entryIdx) => (
                  <div key={entry.id} data-role-id={entry.id} className={`${styles.groupedRoleCard} ${groupedRoleErrors.has(entry.id) ? styles.groupedRoleCardError : ''}`}>
                    {/* Labels row */}
                    <div className={styles.groupedRoleCardLabels}>
                      <div className={styles.groupedRoleField}>
                        <label className={`${styles.fieldLabel} ${groupedRoleErrors.has(entry.id) ? styles.fieldLabelError : ''}`}>Role name</label>
                      </div>
                      <div className={styles.groupedFeeField}>
                        <div className={styles.feeTooltipWrap}>
                          <span className={`${styles.calloutLink} ${styles.calloutLinkLabel}`}>
                            <span className={styles.calloutLinkLabelText}>Fee per hire</span>
                          </span>
                          <div className={styles.feeTooltip} style={{ left: 'auto', right: 0 }}>The fee per hire is the percentage of the hire's first-year salary paid to LinkedIn.</div>
                        </div>
                      </div>
                    </div>
                    {/* Inputs + Remove row */}
                    <div className={styles.groupedRoleCardRow}>
                      <div className={styles.groupedRoleCardLeft}>
                        <div className={styles.groupedRoleField}>
                          <RoleTypeahead
                            value={entry.roleQuery}
                            onChange={v => updateGroupedRole(entry.id, { roleQuery: v, role: v !== entry.role ? '' : entry.role })}
                            onSelect={role => updateGroupedRole(entry.id, { role, roleQuery: role })}
                            onClear={() => updateGroupedRole(entry.id, { roleQuery: '', role: '' })}
                            isSelected={!!entry.role}
                            hasError={groupedRoleErrors.has(entry.id)}
                          />
                          {groupedRoleErrors.has(entry.id) && (
                            <div className={styles.fieldError}>
                              <div className={styles.fieldErrorIcon}>
                                <img src={imgSignalErrorSm} alt="" className={styles.fieldErrorIconImg} />
                              </div>
                              <span>Add a role</span>
                            </div>
                          )}
                        </div>
                        <div className={styles.groupedFeeField}>
                          <div className={styles.feeInputWrap}>
                            <input
                              type="text"
                              value={entry.feePct}
                              className={styles.feeInput}
                              onChange={e => updateGroupedRole(entry.id, { feePct: e.target.value.replace(/[^0-9.]/g, '') })}
                            />
                            <span className={styles.feePrefix}>%</span>
                          </div>
                        </div>
                      </div>
                      {entryIdx > 0 && (
                        <button className={styles.groupedRemoveBtn} onClick={() => removeGroupedRole(entry.id)}>
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                <button className={styles.groupedAddRoleBtn} onClick={addGroupedRole}>
                  <img src={imgAddSmall} alt="" style={{ width: 12, height: 12 }} />
                  <span>Add another role</span>
                </button>
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
                  onClick={handleAddGroupedProduct}
                >
                  Add to quote
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
