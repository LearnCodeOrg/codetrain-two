import Image from 'next/image';

import styles from '../styles/components/IconButton.module.css';

export default function IconButton(props) {
  const { onClick, icon, down } = props;

  return (
    <button
      className={down ? `${styles.button} ${styles.down}` : styles.button}
      onClick={onClick}
    >
      <Image
        src={`/icons/${icon}.png`}
        width="24"
        height="24"
        alt={icon}
      />
    </button>
  );
}
