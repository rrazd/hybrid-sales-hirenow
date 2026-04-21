import { personas } from '../../data/personas';
import styles from './WelcomeScreen.module.css';

const imgLinkedInLogo   = '/linkedin-logo.svg';
const imgLinkedInBadge  = '/linkedin-in21.svg';
const imgCompanyBadge   = '/company-badge.svg';

interface Props {
  onBegin: () => void;
}

export default function WelcomeScreen({ onBegin }: Props) {
  return (
    <div className={styles.page}>

      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroTop}>
          <div className={styles.logoRow}>
            <img src={imgLinkedInLogo} alt="LinkedIn" className={styles.logo} />
            <span className={styles.logoLabel}>Prototype</span>
          </div>
        </div>

        <div className={styles.heroBottom}>
          <h1 className={styles.title}>Hybrid Sales</h1>
          <div className={styles.subtitleRow}>
            <div className={styles.subtitleLine} />
            <p className={styles.subtitle}>powered by <strong>LinkedIn Business Platform</strong></p>
            <div className={styles.subtitleLine} />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <p className={styles.intro}>
          This prototype follows two people through a connected journey.
        </p>

        {/* Persona cards */}
        <div className={styles.cards}>

          {/* Alex */}
          <div className={styles.card} style={{ '--card-color': personas.Alex.color, '--card-bg': personas.Alex.bg } as React.CSSProperties}>
            <div className={styles.cardHeader}>
              <div className={styles.avatarWrap}>
                <img src={personas.Alex.avatar.photoImage} alt="Alex" className={styles.avatar} />
                <img src={imgCompanyBadge} alt="" className={styles.avatarBadge} />
              </div>
              <div>
                <p className={styles.cardName}>Alex</p>
                <p className={styles.cardRole}>{personas.Alex.role}</p>
              </div>
            </div>
            <p className={styles.cardDesc}>
              Alex is a manager who works at a small business. He's responsible for finding and hiring candidates.
            </p>
            <div className={styles.jtbdBlock}>
              <p className={styles.jtbdLabel}>Root JTBD</p>
              <p className={styles.jtbdText}>
                Help me confidently choose and manage the right purchase for my business, with the right level of support.
              </p>
            </div>
          </div>

          {/* Amy */}
          <div className={styles.card} style={{ '--card-color': personas.Amy.color, '--card-bg': personas.Amy.bg } as React.CSSProperties}>
            <div className={styles.cardHeader}>
              <div className={styles.avatarWrap}>
                <img src={personas.Amy.avatar.photoImage} alt="Amy" className={styles.avatar} />
                <img src={imgLinkedInBadge} alt="" className={styles.avatarBadge} />
              </div>
              <div>
                <p className={styles.cardName}>Amy</p>
                <p className={styles.cardRole}>{personas.Amy.role}</p>
              </div>
            </div>
            <p className={styles.cardDesc}>
              Amy is a LinkedIn sales rep focused on converting high-intent Full Service Hiring leads and guiding customers through purchase.
            </p>
            <div className={styles.jtbdBlock}>
              <p className={styles.jtbdLabel}>Root JTBD</p>
              <p className={styles.jtbdText}>
                Convert qualified leads into Full Service Hiring customers, increasing commission likelihood while ensuring a strong customer experience.
              </p>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className={styles.ctaRow}>
          <button className={styles.ctaBtn} onClick={onBegin}>
            <span>Start journey</span>
            <span className={styles.ctaArrow} aria-hidden>→</span>
          </button>
        </div>
      </div>

    </div>
  );
}
