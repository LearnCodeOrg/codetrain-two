import { useEffect, useRef, useState } from 'react';

import styles from '../styles/components/Colors.module.css';

let canvas, ctx;

const tileCount = 4;
const tilePx = 32;
const canvasWidth = tileCount * tilePx;
const canvasHeight = tilePx;

export default function Colors(props) {
  const { colors, setColors, currColor, setCurrColor } = props;

  const [hoverIndex, setHoverIndex] = useState(-1);

  const canvasRef = useRef();

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

  // draw hover selector
  function fillHover(x, y, width, height) {
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, border * 2, border);
    ctx.fillRect(x, y, border, border * 2);
    ctx.fillRect(x + width - border * 2, y, border * 2, border);
    ctx.fillRect(x + width - border, y, border, border * 2);
    ctx.fillRect(x, y + height - border, border * 2, border);
    ctx.fillRect(x, y + height - border * 2, border, border * 2);
    ctx.fillRect(x + width - border * 2, y + height - border, border * 2, border);
    ctx.fillRect(x + width - border, y + height - border * 2, border, border * 2);
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
          fillHover(gridX, gridY, gridPixels, gridPixels);
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
