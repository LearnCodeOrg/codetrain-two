import styles from '../styles/components/Colors.module.css';

const tileCount = 4;
const tilePx = 32;
const canvasWidth = tileCount * tilePx;
const canvasHeight = tilePx;

export default function Colors(props) {
  const { colors, setColors, setCurrColor } = props;

  return (
    <div>
      <h1>Colors</h1>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
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
