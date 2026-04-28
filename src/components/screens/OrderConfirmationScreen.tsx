/**
 * Screen 11: Order Confirmation
 * Perspective: Alex (Customer)
 * Fidelity: High — Success page after placing the order
 */

import styles from './OrderConfirmationScreen.module.css';

/* ── Nav assets (shared with CheckoutPageScreen) ── */
const imgLinkedIn   = '/linkedin-logo.svg';
const imgLock       = '/lock.svg';
const imgQuestion   = '/question.svg';
const imgAlexAvatar = '/alex-avatar.png';

/* ── Success illustration assets (stored locally in /public) ── */
const imgVector  = '/success-vector.svg';
const imgGroup   = '/success-group.svg';
const imgGroup1  = '/success-group1.svg';
const imgGroup2  = '/success-group2.svg';
const imgGroup3  = '/success-group3.svg';
const imgGroup4  = '/success-group4.svg';
const imgVector1 = '/success-vector1.svg';
const imgVector2 = '/success-vector2.svg';
const imgVector3 = '/success-vector3.svg';
const imgGroup5  = '/success-group5.svg';
const imgVector4 = '/success-vector4.svg';
const imgVector5 = '/success-vector5.svg';
const imgGroup6  = '/success-group6.svg';
const imgVector6 = '/success-vector6.svg';
const imgVector7 = '/success-vector7.svg';
const imgGroup7  = '/success-group7.svg';
const imgGroup8  = '/success-group8.svg';
const imgGroup9  = '/success-group9.svg';

/* ── Card assets ── */
const imgAmyAvatar = '/amy-avatar.png';
const imgIn14      = '/linkedin-in14.svg';

const abs: React.CSSProperties = { position: 'absolute', display: 'block', maxWidth: 'none', width: '100%', height: '100%' };

function SuccessIllustration() {
  return (
    <div className={styles.illustration}>
      {/* Bottom ground strip */}
      <div style={{ position: 'absolute', inset: '69.53% 0 0 0' }}>
        <img alt="" style={abs} src={imgVector} />
      </div>
      {/* Top-half scene (imgGroup fills this container, sub-images relative to it) */}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: '50%', left: 0 }}>
        <img alt="" style={abs} src={imgGroup} />
        <div style={{ position: 'absolute', inset: '2.22% 25.49% 85.86% 40.39%' }}>
          <img alt="" style={abs} src={imgGroup1} />
        </div>
        <div style={{ position: 'absolute', inset: '27.57% 77.89% 68.05% 9.08%' }}>
          <img alt="" style={abs} src={imgGroup2} />
        </div>
      </div>
      {/* Decorative elements relative to root 128×128 */}
      {([
        [imgGroup3,  '0.34% 1.56% 48.44% 70.25%'],
        [imgGroup4,  '71.88% 0 2.34% 0'],
        [imgVector1, '20.56% 39.69% 63.98% 53.7%'],
        [imgVector2, '26.67% 18.94% 58.59% 69.84%'],
        [imgVector3, '27.81% 14.77% 35.86% 53.36%'],
        [imgGroup5,  '48.44% 31.25% 42.19% 47.66%'],
        [imgVector4, '56.25% 26.56% 40.62% 64.06%'],
        [imgVector5, '43.75% 14.35% 39.84% 73.44%'],
        [imgGroup6,  '87.42% 24.96% 1.15% 64.09%'],
        [imgVector6, '26.51% 18.36% 54.45% 69.53%'],
        [imgVector7, '64.06% 14.47% 9.38% 58.75%'],
        [imgGroup7,  '90.63% 14.01% -0.08% 74.17%'],
        [imgGroup8,  '20.65% 42.34% 0 16.67%'],
        [imgGroup9,  '60.94% 76.56% 25.78% 5.47%'],
      ] as [string, string][]).map(([src, inset], i) => (
        <div key={i} style={{ position: 'absolute', inset }}>
          <img alt="" style={abs} src={src} />
        </div>
      ))}
    </div>
  );
}

export default function OrderConfirmationScreen() {
  return (
    <div className={styles.page}>

      {/* ── Top nav (same as checkout page) ───────────────── */}
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
        <div className={styles.contentArea}>
          <div className={styles.card}>

            <SuccessIllustration />

            {/* Unified text section — matches Figma frame y=184 h=239 */}
            <div className={styles.textSection}>

              {/* Inner 632px frame — heading, body, button centered */}
              <div className={styles.textInner}>
                <p className={styles.heading}>Welcome to Full-Service Hiring!</p>
                <p className={styles.body}>
                  {'Thanks for choosing Full-Service Hiring, you\'ll receive a welcome email from us shortly. You can manage this agreement and billing in Admin Center.'}
                </p>
                <div className={styles.btnWrap}>
                  <button className={styles.downloadBtn}>
                    <span className={styles.downloadLabel}>Go to Admin Center</span>
                  </button>
                </div>
              </div>

              {/* Divider + More questions — 32px below button, left-aligned */}
              <div className={styles.moreQuestionsWrap}>
                <div className={styles.divider} />
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

          </div>
        </div>
      </div>

    </div>
  );
}
