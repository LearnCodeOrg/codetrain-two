import { useEffect, useRef } from 'react';

import styles from '../styles/components/Colors.module.css';

let canvas, ctx;

const tileCount = 4;
const tilePx = 32;
const canvasWidth = tileCount * tilePx;
const canvasHeight = tilePx;

export default function Colors(props) {
  const { colors, setColors, setCurrColor } = props;

  const canvasRef = useRef();

  // draw hover selector
  function fillHover(x, y, width, height) {
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, border * 2, border);
    ctx.fillRect(x, y, border, border * 2);
    ctx.fillRect(x + width - border * 2, y, border * 2, border);
    ctx.fillRect(x + width - border, y, border, border * 2);
    ctx.fillRect(x, y + height - border, border * 2, border);
    ctx.fillRect(x, y + height - border * 2, border, border * 2);
    ctx.fillRect(x + width - border * 2, y + height - border, border * 2, border);
    ctx.fillRect(x + width - border, y + height - border * 2, border, border * 2);
  }

  // draw border selector
  function fillBorder(x, y, width, height) {
    ctx.fillStyle = '#000';
    ctx.fillRect(x, y, width, border);
    ctx.fillRect(x, y, border, width);
    ctx.fillRect(x + width - border, y, border, height);
    ctx.fillRect(x, y + height - border, width, border);
  }

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  return (
    <div>
      <h1>Colors</h1>
      <canvas
        ref={canvasRef}
        width={canvasWidth}
        height={canvasHeight}
      />
    </div>
  );
}
