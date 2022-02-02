import { useEffect, useRef, useState } from 'react';
import { fillHover } from '../util/fill';

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

  // gets sprite index with given mouse data
  function getSpriteIndex(e) {
    // get x and y on canvas
    const currX = e.clientX - canvas.offsetLeft + window.scrollX;
    const currY = e.clientY - canvas.offsetTop + window.scrollY;
    // get x and y in grid units
    const gridX = Math.floor(currX / gridPixels);
    const gridY = Math.floor(currY / gridPixels);
    // return sprite index
    return gridY * gridWidth + gridX;
  }

  // selects color
  function select(e) {
    const spriteIndex = getSpriteIndex(e);
    setCurrColor(spriteIndex);
  }

  // hovers mouse
  function hover(e) {
    const spriteIndex = getSpriteIndex(e);
    setHoverIndex(spriteIndex);
  }

  // clears mouse hover
  function clearHover(e) {
    setHoverIndex(-1);
  }

  // draw border selector
  function fillBorder(x, y, width, height) {
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, width, border);
    ctx.fillRect(x, y, border, width);
    ctx.fillRect(x + width - border, y, border, height);
    ctx.fillRect(x, y + height - border, width, border);
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
          fillBorder(gridX, gridY, gridPixels, gridPixels);
        }
      }
    }
  }

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  // draw on data change
  useEffect(() => {
    draw();
  }, [hoverIndex, currColor]);

  return (
    <div>
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
    </div>
  );
}
