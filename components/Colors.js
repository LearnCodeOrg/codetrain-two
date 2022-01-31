import styles from '../styles/components/Colors.module.css';

export default function Colors(props) {
  const { colors, setColors, setCurrColor } = props;

  return (
    <div>
      <div>
        {
          colors.map((color, i) =>
            <div
              onClick={() => setCurrColor(i)}
              style={{ background: color }}
              key={i}
            />
          )
        }
      </div>
    </div>
  );
}
