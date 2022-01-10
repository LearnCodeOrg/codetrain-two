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
