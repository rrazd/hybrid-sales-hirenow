import { flowSteps } from '../../data/flow';
import type { Perspective } from '../../data/flow';
import { personas } from '../../data/personas';
import type { QuoteAdvisorLayout } from '../../App';
import styles from './ControlPanel.module.css';

const imgLinkedInBadge  = 'https://www.figma.com/api/mcp/asset/f0e5db34-c9b6-425d-8fc0-0fb33a39bbb0';
const imgCompanyBadge   = 'https://www.figma.com/api/mcp/asset/a5d7769e-39cd-4070-aeb2-c8248f4359cc';

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
}: ControlPanelProps) {
  const currentIdx = flowSteps.findIndex(s => s.id === currentStepId);
  const currentStep = flowSteps[currentIdx] ?? flowSteps[0];
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

        {/* Current Step Blurb */}
        <div className={styles.blurbSection}>
          <p className={styles.blurbLabel}>Step {currentStep.stepNumber}</p>
          <p className={styles.blurbText} dangerouslySetInnerHTML={{ __html: currentStep.blurb }} />
        </div>

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
                className={`${styles.segmentBtn} ${quoteAdvisorContentOn ? styles.segmentBtnActive : ''}`}
                onClick={() => onQuoteAdvisorContentChange(true)}
              >
                On
              </button>
              <button
                className={`${styles.segmentBtn} ${!quoteAdvisorContentOn ? styles.segmentBtnActive : ''}`}
                onClick={() => onQuoteAdvisorContentChange(false)}
              >
                Off
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
          <button
            className={styles.btnNext}
            onClick={() => onNavigate(flowSteps[currentIdx + 1].id)}
            disabled={currentIdx === flowSteps.length - 1 || nextDisabled}
            aria-label={`Go to step ${currentIdx + 2}`}
          >
            <span>Continue</span>
            <span className={styles.btnArrow} aria-hidden>→</span>
          </button>
        </div>

      </div>
    </aside>
  );
}
