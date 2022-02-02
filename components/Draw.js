import { useRef, useState, useEffect } from 'react';

import styles from '../styles/components/Draw.module.css';

let sketching = false;
let lastX, lastY;
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
    // return if last position
    if (pixelX === lastX && pixelY === lastY) return;
    // set last position
    lastX = pixelX;
    lastY = pixelY;
    // get pixel index
    const pixelIndex = pixelY * spriteSize + pixelX;
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
    lastX = undefined;
    lastY = undefined;
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

  // draw hover
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
          fillHover(pxX, pxY, pixelPx, pixelPx);
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
