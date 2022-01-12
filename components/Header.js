import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import styles from '../styles/components/Header.module.css';

const logo = '/img/logo.png';
const logoalt = '/img/logoalt.png';

export default function Header() {
  const [logoSrc, setLogoSrc] = useState(logo);

  return (
    <div className={styles.container}>
      <Link href="/">
        <a>
          <img
            src={logoSrc}
            onMouseEnter={() => setLogoSrc(logoalt)}
            onMouseLeave={() => setLogoSrc(logo)}
            width="48"
            height="48"
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
