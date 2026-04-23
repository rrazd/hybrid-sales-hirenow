/**
 * Screen 9: Checkout
 * Perspective: Alex (Customer)
 * Fidelity: Lo-fi — static Gmail screenshot showing Amy's email with checkout link
 */

import styles from './CheckoutScreen.module.css';
import NotLbpRibbon from '../NotLbpRibbon/NotLbpRibbon';

export default function CheckoutScreen() {
  return (
    <div className={styles.page}>
      <div className={styles.imgWrap}>
        <img src="/checkout-email.png" alt="Gmail email from Amy with checkout link" className={styles.screenshot} />
        <div className={styles.ribbonAnchor}>
          <NotLbpRibbon />
        </div>
      </div>
    </div>
  );
}
