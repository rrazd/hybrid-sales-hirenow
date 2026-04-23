/**
 * Screen 15: Payment Due Email
 * Perspective: Alex (Customer)
 * Fidelity: High — mobile email screenshot
 */

import styles from './PaymentEmailScreen.module.css';

export default function PaymentEmailScreen() {
  return (
    <div className={styles.page}>
      <img src="/payment-email.png" alt="Payment due email" className={styles.screenshot} />
    </div>
  );
}
