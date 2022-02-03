import { useEffect, useRef } from 'react';

import styles from '../styles/components/GameEditor.module.css';

let canvas, ctx;

export default function GameEditor() {
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
      />
    </div>
  );
}
