import { useEffect, useRef } from 'react';

import styles from '../styles/components/Objects.module.css';

let canvas;
let ctx;

export default function Objects() {
  const canvasRef = useRef();

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
      />
    </div>
  );
}
