import styles from '../styles/components/IconButton.module.css';

export default function IconButton(props) {
  const { onClick, icon, down } = props;

  return (
    <button onClick={onClick}>
      <img src={`/icons/${icon}.png`} />
    </button>
  );
}
