import { useEffect, useState, useRef } from 'react';
import { spriteSize } from '../util/units'
import { fillBorder, fillHover } from '../util/fill';
import { unitIndex } from '../util/mouse';

import styles from '../styles/components/Objects.module.css';

let canvas;
let ctx;

const gridHeight = 4;
const gridWidth = 4;
const gridPixels = 32;
const canvasWidth = gridWidth * gridPixels;
const canvasHeight = gridHeight * gridPixels;

const border = 4;

export default function Objects(props) {
  const { objects, colors, currObject, setCurrObject } = props;

  const canvasRef = useRef();

  const [hoverIndex, setHoverIndex] = useState(-1);

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  // selects object based on given mouse data
  function select(e) {
    const spriteIndex = unitIndex(e, canvas, gridPixels, gridWidth);
    if (spriteIndex === currObject) return;
    setCurrObject(spriteIndex);
  }

  // draws canvas
  function draw() {
    // clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    // for each sprite
    ctx.fillStyle = '#000';
    for (let x = 0; x < gridWidth; x++) {
      for (let y = 0; y < gridHeight; y++) {
        // get sprite index
        const spriteIndex = y * gridWidth + x;
        // draw sprite
        const sprite = objects[spriteIndex];
        for (let px = 0; px < spriteSize; px++) {
          for (let py = 0; py < spriteSize; py++) {
            const pixelIndex = py * spriteSize + px;
            const colorIndex = sprite[pixelIndex];
            ctx.fillStyle = colorIndex === -1 ? '#fff' : colors[colorIndex];
            const squarePixels = gridPixels / spriteSize;
            ctx.fillRect(
              x * gridPixels + px * squarePixels, y * gridPixels + py * squarePixels,
              squarePixels, squarePixels
            );
          }
        }
        // draw pixels
        const spriteX = x * gridPixels;
        const spriteY = y * gridPixels;
        // fill hover
        if (hoverIndex === spriteIndex) {
          fillHover(ctx, border, spriteX, spriteY, gridPixels, gridPixels);
        }
        // fill border
        if (currObject === spriteIndex) {
          fillBorder(ctx, border, spriteX, spriteY, gridPixels, gridPixels);
        }
      }
    }
    // draw border
    fillBorder(ctx, border, 0, 0, canvasWidth, canvasHeight);
  }

  // draw when curr object changes
  useEffect(() => {
    draw();
  }, [currObject, hoverIndex, colors, objects]);

  // hover over objects
  function hover(e) {
    const spriteIndex = unitIndex(e, canvas, gridPixels, gridWidth);
    setHoverIndex(spriteIndex);
  }

  return (
    <div className={styles.container}>
      <h1>Objects</h1>
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
