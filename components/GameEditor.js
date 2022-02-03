import { useEffect, useRef } from 'react';

import styles from '../styles/components/GameEditor.module.css';

let canvas, ctx;

export default function GameEditor() {
  const canvasRef = useRef();

  // called on mouse down
  function mouseDown() {

  }

  // called on mouse move
  function mouseMove() {

  }

  // called on mouse up
  function mouseUp() {

  }

  // called on mouse leave
  function mouseLeave() {

  }

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
        onMouseLeave={mouseLeave}
      />
    </div>
  );
}
