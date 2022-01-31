import styles from '../styles/components/Colors.module.css';

export default function Colors(props) {
  const { colors, setColors, setCurrColor } = props;

  return (
    <div>
      <h1>Colors</h1>
      <div className={styles.tiles}>
        {
          colors.map((color, i) =>
            <div
              onClick={() => setCurrColor(i)}
              className={styles.tile}
              style={{ background: color }}
              key={i}
            />
          )
        }
      </div>
    </div>
  );
}
