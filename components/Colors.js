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
