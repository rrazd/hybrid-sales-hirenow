/**
 * Screen 11: Order Confirmation
 * Perspective: Alex (Customer)
 * Fidelity: High — Success page after placing the order
 */

import styles from './OrderConfirmationScreen.module.css';

/* ── Nav assets (shared with CheckoutPageScreen) ── */
const imgLinkedIn   = 'https://www.figma.com/api/mcp/asset/0d4e6bb1-b7a8-47f9-9a03-2aff4be1f6eb';
const imgLock       = 'https://www.figma.com/api/mcp/asset/d527716d-bb3c-4ddd-95b0-935723a7cc88';
const imgQuestion   = 'https://www.figma.com/api/mcp/asset/2306ff4e-542d-44be-9181-32476097fbad';
const imgAlexAvatar = 'https://www.figma.com/api/mcp/asset/d05543e3-2db6-4495-90f4-f53dfee213a4';

/* ── Success illustration assets ── */
const imgVector  = 'https://www.figma.com/api/mcp/asset/1aeb4e80-8b74-4b08-b08d-e9a919a11ae1';
const imgGroup   = 'https://www.figma.com/api/mcp/asset/e1c45c16-42dd-48a8-a43a-dc3238a4c0bd';
const imgGroup1  = 'https://www.figma.com/api/mcp/asset/434ba9c3-391a-4810-a15a-5487b68edd0a';
const imgGroup2  = 'https://www.figma.com/api/mcp/asset/1f84be24-8291-4b6a-990d-41b784b5049d';
const imgGroup3  = 'https://www.figma.com/api/mcp/asset/9bd4a718-3aea-4e6d-99cc-539cda8f9f3b';
const imgGroup4  = 'https://www.figma.com/api/mcp/asset/b09a3339-5856-474c-8941-351b41d0ff71';
const imgVector1 = 'https://www.figma.com/api/mcp/asset/2563a351-6e46-4b3a-ac55-6bf3bf2f9bd5';
const imgVector2 = 'https://www.figma.com/api/mcp/asset/abc19477-dba9-44f1-88c5-20ebe5ae6ead';
const imgVector3 = 'https://www.figma.com/api/mcp/asset/5b93fbb5-620f-4a84-8dce-6e3c698d3081';
const imgGroup5  = 'https://www.figma.com/api/mcp/asset/b61a1ebd-0ac7-4f73-a8c9-e5f8f5a5b2d1';
const imgVector4 = 'https://www.figma.com/api/mcp/asset/df0c4be1-9172-4f06-a153-7f06279bdb80';
const imgVector5 = 'https://www.figma.com/api/mcp/asset/af17baf8-5a6b-4ca2-92b4-42e7170c708d';
const imgGroup6  = 'https://www.figma.com/api/mcp/asset/a420496b-ffb8-4b9a-b88a-9bfabf1e624b';
const imgVector6 = 'https://www.figma.com/api/mcp/asset/130a4af9-0843-4e55-aa22-d86dc9f3d684';
const imgVector7 = 'https://www.figma.com/api/mcp/asset/efa4cd38-5a58-4881-a9a4-c8e11e64c979';
const imgGroup7  = 'https://www.figma.com/api/mcp/asset/f58707d0-9d1d-49bf-a60f-bab80bcfa8c5';
const imgGroup8  = 'https://www.figma.com/api/mcp/asset/6ca84fd1-0dbf-46c1-a47d-2f78815805b8';
const imgGroup9  = 'https://www.figma.com/api/mcp/asset/31229081-c3e2-4b1e-a298-1fa4d14f5c8f';

/* ── Card assets ── */
const imgDownload  = 'https://www.figma.com/api/mcp/asset/054629a4-2b2a-4eab-ae11-da6a3c427a22';
const imgAmyAvatar = 'https://www.figma.com/api/mcp/asset/6c864e6b-f6b4-487d-a091-15da274c0033';
const imgIn14      = 'https://www.figma.com/api/mcp/asset/e030b837-dbe9-4b59-966b-c8790754cec0';

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
                <p className={styles.heading}>Your order was successful!</p>
                <p className={styles.body}>
                  <strong>Order FLD123131</strong>
                  {' was purchased on Jan 15, 2026. Thanks for choosing Full-service hiring. You\'ll receive a welcome email from us shortly.'}
                </p>
                <div className={styles.btnWrap}>
                  <button className={styles.downloadBtn}>
                    <span className={styles.downloadLabel}>Download your order form</span>
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
