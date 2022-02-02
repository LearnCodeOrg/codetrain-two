import { useRef, useState, useEffect } from 'react';
import { fillHover } from '../util/fill';

import styles from '../styles/components/Draw.module.css';

let sketching = false;
let lastIndex;
let canvas, ctx;

const pixelPx = 16;
const spriteSize = 8;
const spritePx = spriteSize * pixelPx;

const border = 2;

export default function Draw(props) {
  const { objects, setObjects, colors, currColor, currObject } = props;

  const [hoverIndex, setHoverIndex] = useState(-1);

  const canvasRef = useRef();

  // sketches canvas with given mouse data
  function sketch(e) {
    // get mouse position
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;
    // get pixel position
    const pixelX = Math.floor(mouseX / pixelPx);
    const pixelY = Math.floor(mouseY / pixelPx);
    // get pixel index
    const pixelIndex = pixelY * spriteSize + pixelX;
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
    sketching = true;
    sketch(e);
  }

  // called on mouse move
  function mouseMove(e) {
    if (sketching) {
      sketch(e);
    }
    // get mouse position
    const mouseX = e.clientX - canvas.offsetLeft;
    const mouseY = e.clientY - canvas.offsetTop;
    // get pixel position
    const pixelX = Math.floor(mouseX / pixelPx);
    const pixelY = Math.floor(mouseY / pixelPx);
    // get pixel index
    const pixelIndex = pixelY * spriteSize + pixelX;
    // set hover index
    setHoverIndex(pixelIndex);
  }

  // called on mouse up
  function mouseUp(e) {
    sketching = false;
  }

  // called on mouse leave
  function mouseLeave(e) {
    sketching = false;
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
          fillHover(ctx, border, pxX, pxY, pixelPx, pixelPx);
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
  }, [colors, objects, currObject, hoverIndex]);

  return (
    <div>
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
