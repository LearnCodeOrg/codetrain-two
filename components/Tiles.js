import { useEffect, useState, useRef } from 'react';
import styles from '../styles/components/Tiles.module.css';

let canvas;
let ctx;

const canvasWidth = gridWidth * spritePixels;
const canvasHeight = gridHeight * spritePixels;

export default function Tiles(props) {
  const canvasRef = useRef();

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);
  return (
    <div>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
    </div>
  );
}
