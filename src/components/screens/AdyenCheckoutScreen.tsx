/**
 * Screen 16: Adyen Checkout
 * Perspective: Alex (Customer)
 * Fidelity: High — Adyen hosted checkout + payment success, side by side
 */

import styles from './AdyenCheckoutScreen.module.css';

export default function AdyenCheckoutScreen() {
  return (
    <div className={styles.page}>
      <img src="/adyen-checkout1.png" alt="Adyen checkout" className={styles.screenshot} />
      <img src="/adyen-checkout2.png" alt="Payment successful" className={styles.screenshot} />
    </div>
  );
}
