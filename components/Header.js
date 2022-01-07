import Image from 'next/image';
import Link from 'next/link';

import styles from '../styles/components/Header.module.css';

export default function Header() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a>
          <Image
            src="/img/logo.png"
            width="48"
            height="48"
            quality="100"
          />
        </a>
      </Link>
      <h1>Codetrain</h1>
      <span className="flexfill" />
      <Link href="/create">
        <a className={styles.link}>Create</a>
      </Link>
    </div>
  );
}
