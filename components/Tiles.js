import { useEffect, useState, useRef } from 'react';
import { spriteSquares } from '../util/units'
import { fillBorder, fillHover } from '../util/fill';
import { mouseIndex } from '../util/mouse';

import styles from '../styles/components/Tiles.module.css';

let canvas;
let ctx;

const gridHeight = 4;
const gridWidth = 4;
const spritePixels = 32;
const squarePixels = Math.round(spritePixels / spriteSquares);
const canvasWidth = gridWidth * spritePixels;
const canvasHeight = gridHeight * spritePixels;

const border = 4;

export default function Tiles(props) {
  const { tiles, colors, currTile, setCurrTile } = props;

  const canvasRef = useRef();

  const [hoverIndex, setHoverIndex] = useState(-1);

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  // selects tile based on given mouse data
  function select(e) {
    const spriteIndex = mouseIndex(e, canvas, spritePixels, gridWidth);
    if (spriteIndex === currTile) return;
    setCurrTile(spriteIndex);
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
        // for each square
        const sprite = tiles[spriteIndex];
        for (let px = 0; px < spriteSquares; px++) {
          for (let py = 0; py < spriteSquares; py++) {
            // set square color
            const pixelIndex = py * spriteSquares + px;
            const colorIndex = sprite[pixelIndex];
            ctx.fillStyle = colorIndex === -1 ? '#fff' : colors[colorIndex];
            // calculate square dimensions
            const squareX = x * spritePixels + px * squarePixels;
            const squareY = y * spritePixels + py * squarePixels;
            ctx.fillRect(squareX, squareY, squarePixels, squarePixels);
          }
        }
      }
    }
    // draw border
    fillBorder(ctx, border, 0, 0, canvasWidth, canvasHeight);
  }

  // draw when curr tile changes
  useEffect(() => {
    draw();
  }, [currTile, hoverIndex, colors, tiles]);

  // hover over tiles
  function hover(e) {
    const spriteIndex = mouseIndex(e, canvas, spritePixels, gridWidth);
    setHoverIndex(spriteIndex);
  }

  return (
    <div className={styles.container}>
      <h1>Tiles</h1>
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
