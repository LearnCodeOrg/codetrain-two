import { useEffect, useState, useRef } from 'react';
import { spriteSquares } from '../util/units'
import { fillBorder, fillHover } from '../util/fill';
import { mouseIndex } from '../util/mouse';
import drawSprite from '../util/drawSprite';

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
        // get sprite
        const spriteIndex = y * gridWidth + x;
        const sprite = tiles[spriteIndex];
        // get sprite position
        const spriteX = x * spritePixels;
        const spriteY = y * spritePixels;
        // draw sprite
        drawSprite(ctx, sprite, spriteX, spriteY, colors, squarePixels);
        // fill hover
        if (hoverIndex === spriteIndex) {
          fillHover(ctx, border, spriteX, spriteY, spritePixels, spritePixels);
        }
        // fill border
        if (currTile === spriteIndex) {
          fillBorder(ctx, border, spriteX, spriteY, spritePixels, spritePixels);
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
