import { useState } from 'react';

import styles from '../styles/components/Logo.module.css';

const logo = '/img/logo.png';
const logoalt = '/img/logoalt.png';

export default function Logo() {
  const [src, setSrc] = useState(logo);

  return (
    <img
      className={styles.img}
      src={src}
      onMouseDown={() => setSrc(logoalt)}
      onMouseUp={() => setSrc(logo)}
      onMouseLeave={() => setSrc(logo)}
      width="48"
      height="24"
    />
  );
}
