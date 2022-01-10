import { useEffect, useState, useRef } from 'react';

import styles from '../styles/components/Objects.module.css';

let canvas;
let ctx;

const gridHeight = 4;
const gridWidth = 4;
const gridPixels = 16;
const canvasWidth = gridWidth * gridPixels;
const canvasHeight = gridHeight * gridPixels;

export default function Objects() {
  const canvasRef = useRef();

  const [currObject, setCurrObject] = useState(0);

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

  return (
    <div>
      <h1>Objects</h1>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={select}
      />
    </div>
  );
}
