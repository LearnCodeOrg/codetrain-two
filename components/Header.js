import Logo from './Logo';
import Link from 'next/link';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <Logo />
      <h1>Codetrain</h1>
      <span className="flexfill" />
      <Link href="/">
        <a className={styles.link}>Home</a>
      </Link>
      <Link href="/create">
        <a className={styles.link}>Create</a>
      </Link>
      <Link href="/docs">
        <a className={styles.link}>Projects</a>
      </Link>
      <Link href="/docs">
        <a className={styles.link}>Docs</a>
      </Link>
    </div>
  );
}
