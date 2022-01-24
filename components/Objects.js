import { useEffect, useState, useRef } from 'react';

import styles from '../styles/components/Objects.module.css';

let canvas;
let ctx;

const gridHeight = 4;
const gridWidth = 4;
const gridPixels = 32;
const canvasWidth = gridWidth * gridPixels;
const canvasHeight = gridHeight * gridPixels;

const border = 2;

export default function Objects() {
  const canvasRef = useRef();

  const [currObject, setCurrObject] = useState(0);
  const [hoverIndex, setHoverIndex] = useState(-1);

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  // selects object based on given mouse data
  function select(e) {
    // get x and y on canvas
    const currX = e.clientX - canvas.offsetLeft + window.scrollX;
    const currY = e.clientY - canvas.offsetTop + window.scrollY;
    // get x and y in grid units
    const gridX = Math.floor(currX / gridPixels);
    const gridY = Math.floor(currY / gridPixels);
    // select sprite
    const spriteIndex = gridY * gridWidth + gridX;
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
        // if selected
        if (currObject === spriteIndex) {
          // draw sprite
          const spriteX = x * gridPixels;
          const spriteY = y * gridPixels;
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

  function hover(e) {
    // get x and y on canvas
    const currX = e.clientX - canvas.offsetLeft + window.scrollX;
    const currY = e.clientY - canvas.offsetTop + window.scrollY;
    // get x and y in grid units
    const gridX = Math.floor(currX / gridPixels);
    const gridY = Math.floor(currY / gridPixels);
    // return sprite index
    const spriteIndex = gridY * gridWidth + gridX;
    setHoverIndex(spriteIndex);
  }

  return (
    <div>
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
