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

/* ── Success illustration assets ── */
const imgVector  = 'https://www.figma.com/api/mcp/asset/42d99c1c-81fa-40f6-9868-403373b7e904';
const imgGroup   = 'https://www.figma.com/api/mcp/asset/3e53750e-5225-4d91-af58-f551d43495b9';
const imgGroup1  = 'https://www.figma.com/api/mcp/asset/c178684e-c166-4158-91ca-c963316df66d';
const imgGroup2  = 'https://www.figma.com/api/mcp/asset/20720654-07ee-4115-899a-5c56a9820ec0';
const imgGroup3  = 'https://www.figma.com/api/mcp/asset/8e1d6cf9-ec52-4471-b99c-d57624739fd3';
const imgGroup4  = 'https://www.figma.com/api/mcp/asset/2340a61c-884a-42c9-b87e-9a07939999f6';
const imgVector1 = 'https://www.figma.com/api/mcp/asset/dea13ded-c967-4bf7-a815-f98eafd5eb65';
const imgVector2 = 'https://www.figma.com/api/mcp/asset/b841fbaf-1652-4e69-bcb2-53825c4c7c8d';
const imgVector3 = 'https://www.figma.com/api/mcp/asset/18709474-99fe-4936-8757-f3b8c3c5bd84';
const imgGroup5  = 'https://www.figma.com/api/mcp/asset/62ff7193-021e-48e7-b32e-cf90b78dd6a5';
const imgVector4 = 'https://www.figma.com/api/mcp/asset/a5b34c4f-22e7-4751-b662-de891617af4b';
const imgVector5 = 'https://www.figma.com/api/mcp/asset/95687782-b2c3-4ab4-9958-5fcb7eb776a3';
const imgGroup6  = 'https://www.figma.com/api/mcp/asset/fdfbf5d9-bbca-4119-aa15-b71be2ea2749';
const imgVector6 = 'https://www.figma.com/api/mcp/asset/7c878c56-3536-4857-a9fc-86dfeec775f4';
const imgVector7 = 'https://www.figma.com/api/mcp/asset/c5f26c30-e10d-4530-ad69-dc995b517a67';
const imgGroup7  = 'https://www.figma.com/api/mcp/asset/b9971f5c-eb26-49e7-bb54-b23fd19ddfcc';
const imgGroup8  = 'https://www.figma.com/api/mcp/asset/c0abf545-a390-4a7c-9a8f-b78031c8935f';
const imgGroup9  = 'https://www.figma.com/api/mcp/asset/4eaccf5e-58d2-4369-a799-51a13298294e';

/* ── Card assets ── */
const imgDownload  = 'https://www.figma.com/api/mcp/asset/054629a4-2b2a-4eab-ae11-da6a3c427a22';
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
                <p className={styles.heading}>Welcome to Full-service hiring!</p>
                <p className={styles.body}>
                  {'Thanks for choosing Full-service hiring, you\'ll receive a welcome email from us shortly. You can manage this agreement and billing in Admin Center.'}
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
