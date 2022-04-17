import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

import styles from './Nav.module.css';

import { useCart } from '../hooks/use-cart';

const Nav = () => {
  const { subtotal, checkout } = useCart();
  return (
    <nav className={styles.nav}>
      <p className={styles.navTitle}>
        <Link href="/">
          <a>e-commerce store</a>
        </Link>
      </p>
      <p className={styles.navCart}>
        <Link href="/cart">
          <a><FaShoppingCart /> ${subtotal.toFixed(2)}</a>
        </Link>
      </p>
    </nav>
  )
}

export default Nav;