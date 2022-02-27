import { useEffect, useState, useRef } from 'react';
import { mouseIndex } from '../util/mouse';

import styles from '../styles/components/Tiles.module.css';

let canvas;
let ctx;

const canvasWidth = gridWidth * spritePixels;
const canvasHeight = gridHeight * spritePixels;

export default function Tiles(props) {
  const { tiles, colors, currTile, setCurrTile } = props;

  const canvasRef = useRef();

  const [hoverIndex, setHoverIndex] = useState(-1);

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  // selects tile based on given mouse data
  function select(e) {
    const spriteIndex = mouseIndex(e, canvas, spritePixels, gridWidth);
    if (spriteIndex === currTile) return;
    setCurrTile(spriteIndex);
  }

  // hover over tiles
  function hover(e) {
    const spriteIndex = mouseIndex(e, canvas, spritePixels, gridWidth);
    setHoverIndex(spriteIndex);
  }

  return (
    <div className={styles.container}>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={select}
        onMouseMove={hover}
        onMouseLeave={() => setHoverIndex(-1)}
      />
    </div>
  );
}
