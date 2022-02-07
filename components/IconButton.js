import styles from '../styles/components/IconButton.module.css';

export default function IconButton(props) {
  const { onClick, icon, down, auto } = props;

  return (
    <button
      className={
        auto ? `${styles.button} ${styles.auto}` :
        down ? `${styles.button} ${styles.down}` :
        styles.button
      }
      onClick={onClick}
    >
      <img src={`/icons/${icon}.png`} />
    </button>
  );
}
