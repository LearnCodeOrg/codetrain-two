import { useRef } from 'react';

import styles from '../styles/components/Draw.module.css';

let sketching = false;

let lastX, lastY;
let canvas, ctx;

const pixelPx = 16;
const spriteSize = 4;
const spritePx = spriteSize * pixelPx;

export default function Draw() {
  const canvasRef = useRef();

  function mouseDown(e) {
    lastX = undefined;
    lastY = undefined;
    sketching = true;
    sketch(e);
  }

  function mouseMove(e) {
    if (sketching) sketch(e);
  }

  function mouseUp(e) {
    sketching = false;
  }

  function mouseLeave(e) {
    sketching = false;
  }

  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseDown={mouseDown}
        onMouseMove={mouseMove}
        onMouseUp={mouseUp}
        onMouseLeave={mouseLeave}
        width={spritePx}
        height={spritePx}
      />
    </div>
  );
}
