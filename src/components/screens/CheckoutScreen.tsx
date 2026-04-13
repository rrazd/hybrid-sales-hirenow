/**
 * Screen 9: Checkout
 * Perspective: Alex (Customer)
 * Fidelity: Lo-fi — static Gmail screenshot showing Amy's email with checkout link
 */

import styles from './CheckoutScreen.module.css';

export default function CheckoutScreen() {
  return (
    <div className={styles.page}>
      <img src="/checkout-email.png" alt="Gmail email from Amy with checkout link" className={styles.screenshot} />
    </div>
  );
}
