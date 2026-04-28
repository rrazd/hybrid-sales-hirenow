import { useState } from 'react';
import { flowSteps } from '../../data/flow';
import type { Perspective } from '../../data/flow';
import { personas } from '../../data/personas';
import type { QuoteAdvisorLayout, FSHLayout, GlobalHeaderLayout } from '../../App';
import styles from './ControlPanel.module.css';

const imgLinkedInBadge  = '/linkedin-in21.svg';
const imgCompanyBadge   = '/company-badge.svg';

interface ControlPanelProps {
  currentStepId: string;
  onNavigate: (stepId: string) => void;
  isOpen?: boolean;
  onCollapse?: () => void;
  quoteAdvisorLayout?: QuoteAdvisorLayout;
  onQuoteAdvisorLayoutChange?: (layout: QuoteAdvisorLayout) => void;
  nextDisabled?: boolean;
  hasProducts?: boolean;
  quoteAdvisorContentOn?: boolean;
  onQuoteAdvisorContentChange?: (on: boolean) => void;
  fshLayout?: FSHLayout;
  onFSHLayoutChange?: (layout: FSHLayout) => void;
  globalHeaderLayout?: GlobalHeaderLayout;
  onGlobalHeaderLayoutChange?: (layout: GlobalHeaderLayout) => void;
  onReset?: () => void;
}

function Avatar({ perspective }: { perspective: Perspective }) {
  const persona = personas[perspective];
  const av = persona.avatar;

  if (av.type === 'illustration' && av.bgImage && av.personImage && av.badgeImage) {
    return (
      <div className={styles.avatarIllustration}>
        <img src={av.bgImage} alt="" className={styles.avatarBg} />
        <img src={av.personImage} alt={perspective} className={styles.avatarPerson} />
        <img src={av.badgeImage} alt="" className={styles.avatarBadge} />
      </div>
    );
  }

  if (av.type === 'photo' && av.photoImage) {
    const badge = perspective === 'Amy' ? imgLinkedInBadge : imgCompanyBadge;
    return (
      <div className={styles.avatarPhotoWrap}>
        <img src={av.photoImage} alt={perspective} className={styles.avatarPhoto} />
        <img src={badge} alt="" className={styles.avatarLinkedInBadge} />
      </div>
    );
  }

  return (
    <span className={styles.avatarInitials} style={{ background: personas[perspective].color }}>
      {av.initials?.[0] ?? perspective[0]}
    </span>
  );
}

export default function ControlPanel({
  currentStepId,
  onNavigate,
  isOpen = true,
  onCollapse,
  quoteAdvisorLayout = 'in-card',
  onQuoteAdvisorLayoutChange,
  nextDisabled = false,
  hasProducts = false,
  quoteAdvisorContentOn = false,
  onQuoteAdvisorContentChange,
  fshLayout = 'grouped',
  onFSHLayoutChange,
  globalHeaderLayout = 'generic',
  onGlobalHeaderLayoutChange,
  onReset,
}: ControlPanelProps) {
  const [stepsOpen, setStepsOpen] = useState(false);
  const currentIdx = flowSteps.findIndex(s => s.id === currentStepId);
  const currentStep = flowSteps[currentIdx] ?? flowSteps[1];
  const totalNumberedSteps = Math.max(...flowSteps.map(s => s.stepNumber));
  const perspective = currentStep.perspective;
  const persona = personas[perspective];

  return (
    <aside
      className={`${styles.panel} ${!isOpen ? styles.panelCollapsed : ''}`}
      style={{ '--persona-color': persona.color, '--persona-bg': persona.bg } as React.CSSProperties}
    >
      <div className={styles.panelInner}>

        {/* Collapse trigger */}
        {onCollapse && (
          <button className={styles.collapseBtn} onClick={onCollapse} title="Collapse panel">
            ‹
          </button>
        )}


        {/* Perspective Indicator — fades to white, no hard divider */}
        <div
          className={styles.perspectiveSection}
          style={{ background: `linear-gradient(to bottom, ${persona.bg} 40%, rgba(255,255,255,0) 100%)` }}
        >
          <div className={styles.perspectiveBadge}>
            <Avatar perspective={perspective} />
            <div>
              <p className={styles.perspectiveName}>{perspective}</p>
              <p className={styles.perspectiveRole}>{persona.role}</p>
            </div>
          </div>
        </div>

        {/* Current Step Blurb + Step Picker */}
        <div className={styles.blurbSection}>
          <button
            className={styles.stepPickerBtn}
            onClick={() => setStepsOpen(o => !o)}
          >
            <span className={styles.blurbLabel}>Step {currentStep.stepNumber} of {totalNumberedSteps}</span>
            <svg
              className={`${styles.stepPickerChevron} ${stepsOpen ? styles.stepPickerChevronOpen : ''}`}
              width="10" height="6" viewBox="0 0 10 6" fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {stepsOpen && (
            <div className={styles.stepDropdown}>
              {flowSteps.map(step => (
                <button
                  key={step.id}
                  className={`${styles.stepDropdownItem} ${step.id === currentStepId ? styles.stepDropdownItemActive : ''}`}
                  onClick={() => { onNavigate(step.id); setStepsOpen(false); }}
                >
                  <span className={styles.stepDropdownNum}>{step.stepNumber}</span>
                  <span className={styles.stepDropdownLabel}>{step.label}</span>
                </button>
              ))}
            </div>
          )}

          <p className={styles.blurbText} dangerouslySetInnerHTML={{ __html: currentStep.blurb }} />
        </div>

        {/* Restore recommended settings — top of config area */}
        {(currentStep.supportsFSHLayoutToggle || currentStep.supportsQuoteAdvisorToggle || currentStep.supportsGlobalHeaderToggle) && onReset && (
          <div className={styles.resetSection}>
            <button className={styles.resetBtn} onClick={onReset}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M1.5 6A4.5 4.5 0 1 0 3.2 2.5M1.5 1v2h2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Restore recommended settings
            </button>
          </div>
        )}

        {/* FSH table layout toggle — only for step 7 */}
        {currentStep.supportsFSHLayoutToggle && onFSHLayoutChange && (
          <div className={styles.layoutSection}>
            <p className={styles.layoutLabel}>FSH selection layout</p>
            <div className={styles.layoutSegment}>
              <button
                className={`${styles.segmentBtn} ${fshLayout === 'grouped' ? styles.segmentBtnActive : ''}`}
                onClick={() => onFSHLayoutChange('grouped')}
              >
                Grouped
              </button>
              <button
                className={`${styles.segmentBtn} ${fshLayout === 'sep-line' ? styles.segmentBtnActive : ''}`}
                onClick={() => onFSHLayoutChange('sep-line')}
              >
                Separate
              </button>
            </div>
          </div>
        )}

        {/* Global header toggle — only for solution-builder steps */}
        {currentStep.supportsGlobalHeaderToggle && onGlobalHeaderLayoutChange && (
          <div className={styles.layoutSection}>
            <p className={styles.layoutLabel}>Products table header</p>
            <div className={`${styles.layoutSegment} ${styles.layoutSegmentCompact}`}>
              <button
                className={`${styles.segmentBtn} ${globalHeaderLayout === 'generic' ? styles.segmentBtnActive : ''}`}
                onClick={() => onGlobalHeaderLayoutChange('generic')}
              >
                Generic
              </button>
              <button
                className={`${styles.segmentBtn} ${globalHeaderLayout === 'fsh-custom' ? styles.segmentBtnActive : ''}`}
                onClick={() => onGlobalHeaderLayoutChange('fsh-custom')}
              >
                Custom
              </button>
              <button
                className={`${styles.segmentBtn} ${globalHeaderLayout === 'fsh-custom-2' ? styles.segmentBtnActive : ''}`}
                onClick={() => onGlobalHeaderLayoutChange('fsh-custom-2')}
              >
                Custom 2
              </button>
              <button
                className={`${styles.segmentBtn} ${globalHeaderLayout === 'fsh-custom-3' ? styles.segmentBtnActive : ''}`}
                onClick={() => onGlobalHeaderLayoutChange('fsh-custom-3')}
              >
                Custom 3
              </button>
            </div>
          </div>
        )}

        {/* Quote Advisor layout picker — only for applicable steps */}
        {currentStep.supportsQuoteAdvisorToggle && onQuoteAdvisorLayoutChange && (
          <div className={styles.layoutSection}>
            <p className={styles.layoutLabel}>Quote advisor layout</p>
            <div className={styles.layoutSegment}>
              <button
                className={`${styles.segmentBtn} ${quoteAdvisorLayout === 'floating' ? styles.segmentBtnActive : ''}`}
                onClick={() => onQuoteAdvisorLayoutChange('floating')}
              >
                Floating right
              </button>
              <button
                className={`${styles.segmentBtn} ${quoteAdvisorLayout === 'in-card' ? styles.segmentBtnActive : ''}`}
                onClick={() => onQuoteAdvisorLayoutChange('in-card')}
              >
                Within card
              </button>
            </div>
          </div>
        )}

        {/* Quote Advisor content toggle — only when products exist */}
        {currentStep.supportsQuoteAdvisorToggle && hasProducts && onQuoteAdvisorContentChange && (
          <div className={styles.layoutSection}>
            <p className={styles.layoutLabel}>Quote advisor content</p>
            <div className={styles.layoutSegment}>
              <button
                className={`${styles.segmentBtn} ${!quoteAdvisorContentOn ? styles.segmentBtnActive : ''}`}
                onClick={() => onQuoteAdvisorContentChange(false)}
              >
                Off
              </button>
              <button
                className={`${styles.segmentBtn} ${quoteAdvisorContentOn ? styles.segmentBtnActive : ''}`}
                onClick={() => onQuoteAdvisorContentChange(true)}
              >
                On
              </button>
            </div>
          </div>
        )}

        {/* Footer Nav */}
        <div className={styles.navFooter}>
          {currentIdx > 0 ? (
            <button
              className={styles.btnBack}
              onClick={() => onNavigate(flowSteps[currentIdx - 1].id)}
            >
              ← Back
            </button>
          ) : (
            <div className={styles.btnSpacer} />
          )}
          {currentIdx < flowSteps.length - 1 && (
            <button
              className={styles.btnNext}
              onClick={() => onNavigate(flowSteps[currentIdx + 1].id)}
              disabled={nextDisabled}
              aria-label={`Go to step ${currentIdx + 2}`}
            >
              <span>Continue</span>
              <span className={styles.btnArrow} aria-hidden>→</span>
            </button>
          )}
        </div>

      </div>
    </aside>
  );
}
