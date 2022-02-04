import { useRef, useState, useEffect } from 'react';
import { fillBorder, fillHover } from '../util/fill';
import { unitIndex } from '../util/mouse';
import { spriteSquares } from '../util/units';

import styles from '../styles/components/Draw.module.css';

let lastSquareIndex;
let canvas, ctx;

const squarePixels = 16;
const spritePixels = spriteSquares * squarePixels;

const border = 2;

export default function Draw(props) {
  const { objects, setObjects, colors, currColor, currObject } = props;

  const [hoverIndex, setHoverIndex] = useState(-1);
  const [sketching, setSketching] = useState(false);

  const canvasRef = useRef();

  // flood fills given object starting at given index
  function floodFill(object, squareIndex, startColor, endColor) {
    // update color
    if (object[squareIndex] !== startColor) return;
    object[squareIndex] = endColor;
    // recurse up
    if (squareIndex >= spriteSquares) {
      floodFill(object, squareIndex - spriteSquares, startColor, endColor);
    }
    // recurse down
    if (squareIndex < spriteSquares * spriteSquares - spriteSquares) {
      floodFill(object, squareIndex + spriteSquares, startColor, endColor);
    }
    // recurse left
    if (squareIndex % spriteSquares > 0) {
      floodFill(object, squareIndex - 1, startColor, endColor);
    }
    // recurse right
    if (squareIndex % spriteSquares < spriteSquares - 1) {
      floodFill(object, squareIndex + 1, startColor, endColor);
    }
  }

  // sketches canvas with given mouse data
  function sketch(e) {
    // clear tool
    if (tool === 'clear') {
      // confirm clear
      if (!window.confirm('Clear sketch?')) return;
      // update objects
      const newObjects = objects.slice();
      newObjects[currObject] = Array(spriteSquares * spriteSquares).fill(-1);
      setObjects(newObjects);
      setSketching(false);
      return;
    }
    // calculate square index
    const squareIndex = unitIndex(e, canvas, squarePixels, spriteSquares);
    // check last square position
    if (squareIndex === lastSquareIndex) return;
    lastSquareIndex = squareIndex;
    // update objects
    const newObjects = objects.slice();
    const newObject = objects[currObject].slice();
    // return if same color
    if (newObject[squareIndex] === currColor) return;
    // update objects
    newObject[squareIndex] = currColor;
    newObjects[currObject] = newObject;
    setObjects(newObjects);
  }

  // called on mouse down
  function mouseDown(e) {
    lastSquareIndex = undefined;
    setSketching(true);
    sketch(e);
  }

  // called on mouse move
  function mouseMove(e) {
    // if sketching, sketch
    if (sketching) sketch(e);
    // get and set hover index
    const squareIndex = unitIndex(e, canvas, squarePixels, spriteSquares);
    setHoverIndex(squareIndex);
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
    ctx.clearRect(0, 0, spritePixels, spritePixels);
    // get current object
    const object = objects[currObject];
    // for each pixel
    for (let x = 0; x < spriteSquares; x++) {
      for (let y = 0; y < spriteSquares; y++) {
        // set fill color
        const squareIndex = y * spriteSquares + x;
        const colorIndex = object[squareIndex];
        const color = colorIndex === -1 ? '#fff' : colors[colorIndex];
        ctx.fillStyle = color;
        // fill rect
        const pxX = x * squarePixels;
        const pxY = y * squarePixels;
        ctx.fillRect(pxX, pxY, squarePixels, squarePixels);
        // draw hover
        if (squareIndex === hoverIndex) {
          if (sketching) fillBorder(ctx, border, pxX, pxY, squarePixels, squarePixels);
          else fillHover(ctx, border, pxX, pxY, squarePixels, squarePixels);
        }
      }
    }
    fillBorder(ctx, border, 0, 0, spritePixels, spritePixels)
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
        width={spritePixels}
        height={spritePixels}
      />
      <div className={styles.tools}>
        {
          ['pencil', 'eraser', 'bucket', 'clear'].map(t =>
            <button
              className={tool === t ? styles.selected : undefined}
              onClick={() => setTool(t)}
              key={t}
            >
              <img src={`/icons/${t}.png`} />
            </button>
          )
        }
      </div>
    </div>
  );
}
