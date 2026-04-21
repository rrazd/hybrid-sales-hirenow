/**
 * Screen 3: Phone Number Modal
 * Perspective: Alex (LinkedIn Customer)
 * Fidelity: Low — no clickable hotspots, control panel nav only.
 *
 * Figma node 0:19091.
 * Scrim covers entire browser frame (including nav). Modal centered on top.
 */

import { useState } from 'react';
import NotLbpRibbon from '../NotLbpRibbon/NotLbpRibbon';
import styles from './PhoneModalScreen.module.css';

const imgLiLogo     = '/linkedin-logo.svg';
const imgOval       = '/oval-avatar.svg';
const imgLeftCard   = '/plan-left-card.svg';
const imgRadioOuter = '/radio-outer.svg';
const imgRadioInner = '/radio-inner.svg';

const TOTAL_IMGS = 5;

export default function PhoneModalScreen() {
  const [loadedCount, setLoadedCount] = useState(0);
  const onLoad = () => setLoadedCount(c => c + 1);
  const ready = loadedCount >= TOTAL_IMGS;

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.browserWrap}>
        {!ready && <div className={styles.skeleton} />}
        {/* browser is position:relative — scrim and modal are absolute children covering everything */}
        <div className={styles.browser}>

          {/* ── Base page (nav + content) ── */}
          <div className={styles.topNav}>
            <img src={imgLiLogo} alt="LinkedIn" className={styles.liLogo} onLoad={onLoad} />
            <div className={styles.navRight}>
              <div className={styles.searchBar} />
              <img src={imgOval} alt="" className={styles.avatar} onLoad={onLoad} />
            </div>
          </div>

          <div className={styles.pageBody}>
            <div className={styles.progressBar} />
            <div className={styles.cardRow}>
              <div className={styles.cardLeft}>
                <img src={imgLeftCard} alt="" className={styles.cardImg} onLoad={onLoad} />
              </div>
              <div className={styles.cardRight}>
                <span className={styles.cardTitle}>Full-service hiring</span>
                <div className={styles.radioWrap}>
                  <img src={imgRadioOuter} alt="" className={styles.radioOuter} onLoad={onLoad} />
                  <img src={imgRadioInner} alt="" className={styles.radioInner} onLoad={onLoad} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Scrim — covers entire browser including nav ── */}
          <div className={styles.dimOverlay} aria-hidden />

          {/* ── Modal — centered over full browser frame ── */}
          <div className={styles.modal} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderPill} />
              <svg className={styles.closeIcon} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M1 1L11 11M11 1L1 11" stroke="#56687A" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.modalTextLine} />
              <div className={styles.modalInput} />
            </div>
            <div className={styles.modalFooter}>
              <div className={styles.modalBtnCancel} />
              <div className={styles.modalBtnConfirm} />
            </div>
          </div>
        </div>

        <NotLbpRibbon />
      </div>
    </div>
  );
}
