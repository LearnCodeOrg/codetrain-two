import { useEffect, useState, useRef } from 'react';
import { fillHover } from '../util/fill';

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
  const { currObject, setCurrObject } = props;

  const canvasRef = useRef();

  const [hoverIndex, setHoverIndex] = useState(-1);

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

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

  // selects object based on given mouse data
  function select(e) {
    const spriteIndex = getSpriteIndex(e);
    if (spriteIndex === currObject) return;
    setCurrObject(spriteIndex);
  }

  // fills canvas border
  function fillBorder(x, y, width, height) {
    ctx.fillRect(x, y, width, border);
    ctx.fillRect(x, y, border, width);
    ctx.fillRect(x + width - border, y, border, height);
    ctx.fillRect(x, y + height - border, width, border);
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
        const spriteX = x * gridPixels;
        const spriteY = y * gridPixels;
        if (hoverIndex === spriteIndex) {
          fillHover(ctx, border, spriteX, spriteY, gridPixels, gridPixels);
        }
        if (currObject === spriteIndex) {
          fillBorder(spriteX, spriteY, gridPixels, gridPixels);
        }
      }
    }
    // draw border
    fillBorder(0, 0, canvasWidth, canvasHeight);
  }

  // draw when curr object changes
  useEffect(() => {
    draw();
  }, [currObject, hoverIndex]);

  // hover over objects
  function hover(e) {
    const spriteIndex = getSpriteIndex(e);
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
