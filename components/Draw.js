import { useRef, useState, useEffect } from 'react';
import { fillBorder, fillHover } from '../util/fill';
import { unitIndex } from '../util/mouse';

import styles from '../styles/components/Draw.module.css';

let lastIndex;
let canvas, ctx;

const pixelPx = 16;
const spriteSize = 8;
const spritePx = spriteSize * pixelPx;

const border = 2;

export default function Draw(props) {
  const { objects, setObjects, colors, currColor, currObject } = props;

  const [hoverIndex, setHoverIndex] = useState(-1);
  const [sketching, setSketching] = useState(false);

  const canvasRef = useRef();

  // sketches canvas with given mouse data
  function sketch(e) {
    // calculate pixel index
    const pixelIndex = unitIndex(e, canvas, pixelPx, spriteSize);
    // return if last position
    if (pixelIndex === lastIndex) return;
    // set last position
    lastIndex = pixelIndex;
    // update objects
    const newObjects = objects.slice();
    const newObject = objects[currObject].slice();
    // return if same color
    if (newObject[pixelIndex] === currColor) return;
    // update objects
    newObject[pixelIndex] = currColor;
    newObjects[currObject] = newObject;
    setObjects(newObjects);
  }

  // called on mouse down
  function mouseDown(e) {
    lastIndex = undefined;
    setSketching(true);
    sketch(e);
  }

  // called on mouse move
  function mouseMove(e) {
    if (sketching) {
      sketch(e);
    }
    // get pixel index
    const pixelIndex = unitIndex(e, canvas, pixelPx, spriteSize);
    // set hover index
    setHoverIndex(pixelIndex);
  }

  // called on mouse up
  function mouseUp(e) {
    setSketching(false);
  }

  // called on mouse leave
  function mouseLeave(e) {
    setSketching(false);
    setHoverIndex(-1);
  }

  // draws canvas
  function draw() {
    ctx.clearRect(0, 0, spritePx, spritePx);
    // get current object
    const object = objects[currObject];
    // for each pixel
    for (let x = 0; x < spriteSize; x++) {
      for (let y = 0; y < spriteSize; y++) {
        // set fill color
        const pixelIndex = y * spriteSize + x;
        const colorIndex = object[pixelIndex];
        const color = colorIndex === -1 ? '#fff' : colors[colorIndex];
        ctx.fillStyle = color;
        // fill rect
        const pxX = x * pixelPx;
        const pxY = y * pixelPx;
        ctx.fillRect(pxX, pxY, pixelPx, pixelPx);
        // draw hover
        if (pixelIndex === hoverIndex) {
          if (sketching) {
            fillBorder(ctx, border, pxX, pxY, pixelPx, pixelPx);
          } else {
            fillHover(ctx, border, pxX, pxY, pixelPx, pixelPx);
          }
        }
      }
    }
  }

  // get canvas and context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  // draw canvas when data updates
  useEffect(() => {
    draw();
  }, [colors, objects, currObject, hoverIndex, sketching]);

  return (
    <div className={styles.container}>
      <h1>Draw</h1>
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
