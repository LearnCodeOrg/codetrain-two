import { useEffect, useRef, useState } from 'react';
import { fillBorder, fillHover } from '../util/fill';
import { mouseIndex } from '../util/mouse';

import styles from '../styles/components/Colors.module.css';

let canvas, ctx;

const gridWidth = 4;
const gridHeight = 1;
const gridPixels = 32;
const canvasWidth = gridWidth * gridPixels;
const canvasHeight = gridHeight * gridPixels;

const border = 4;

export default function Colors(props) {
  const { colors, setColors, currColor, setCurrColor } = props;

  const [hoverIndex, setHoverIndex] = useState(-1);

  const canvasRef = useRef();

  // selects color
  function select(e) {
    const spriteIndex = mouseIndex(e, canvas, gridPixels, gridWidth);
    setCurrColor(spriteIndex);
  }

  // hovers mouse
  function hover(e) {
    const spriteIndex = mouseIndex(e, canvas, gridPixels, gridWidth);
    setHoverIndex(spriteIndex);
  }

  // clears mouse hover
  function clearHover(e) {
    setHoverIndex(-1);
  }

  // draws canvas
  function draw() {
    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        // get color index
        const colorIndex = y * gridWidth + x;
        ctx.fillStyle = colors[colorIndex];
        const gridX = x * gridPixels;
        const gridY = y * gridPixels;
        ctx.fillRect(gridX, gridY, gridPixels, gridPixels);
        if (colorIndex === hoverIndex) {
          fillHover(ctx, border, gridX, gridY, gridPixels, gridPixels);
        }
        if (colorIndex === currColor) {
          fillBorder(ctx, border, gridX, gridY, gridPixels, gridPixels);
        }
      }
    }
  }

  // updates current color with given value
  function updateColor(val) {
    const newColors = colors.slice();
    newColors[currColor] = val;
    setColors(newColors);
  }

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  // draw on data change
  useEffect(() => {
    draw();
  }, [hoverIndex, currColor, colors]);

  return (
    <div className={styles.container}>
      <h1>Colors</h1>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={select}
        onMouseMove={hover}
        onMouseLeave={clearHover}
      />
      <label className={styles.colorlabel}>
        Update Color
        <input
          type="color"
          value={colors[currColor]}
          onChange={e => updateColor(e.target.value)}
        />
      </label>
    </div>
  );
}
