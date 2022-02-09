import { useEffect, useRef, useState } from 'react';
import { mouseIndex, mousePosition } from '../util/mouse';
import { fillHover } from '../util/fill';
import { mapSprites, spriteSquares } from '../util/units';

import styles from '../styles/components/GameEditor.module.css';

let canvas, ctx;

export default function GameEditor(props) {
  const { mapPixels } = props;

  const spritePixels = Math.round(mapPixels / mapSprites);
  const halfSpritePixels = Math.round(spritePixels / 2);
  const squarePixels = Math.round(spritePixels / spriteSquares);
  const halfSpriteSquares = Math.round(spriteSquares / 2);
  const mapSquares = Math.round(mapPixels / squarePixels);

  const [sketching, setSketching] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [gameObjects, setGameObjects] = useState([]);

  const canvasRef = useRef();

  // sketches canvas
  function sketch(e) {

  }

  // called on mouse down
  function mouseDown(e) {
    setSketching(true);
    sketch(e);
    // get mouse position
    const [mouseX, mouseY] = mousePosition(e, canvas);
    const pixelX = Math.floor(mouseX / squarePixels) - halfSpriteSquares;
    const pixelY = Math.floor(mouseY / squarePixels) - halfSpriteSquares;
    // append new gameobject
    const newGameObject = { x: pixelX, y: pixelY };
    setGameObjects(val => [...val, newGameObject]);
  }

  // called on mouse move
  function mouseMove(e) {
    if (sketching) sketch(e);
    const squareIndex = mouseIndex(e, canvas, squarePixels, mapSquares);
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

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  // draws editor to canvas
  function draw() {
    // clear canvas
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, mapPixels, mapPixels);
    // if hovering
    if (hoverIndex !== -1) {
      // draw hover
      const squareX = hoverIndex % mapSquares;
      const squareY = Math.floor(hoverIndex / mapSquares);
      const pixelX = (squareX * squarePixels) - halfSpritePixels;
      const pixelY = (squareY * squarePixels) - halfSpritePixels;
      fillHover(ctx, squarePixels, pixelX, pixelY, spritePixels, spritePixels);
    }
    // draw gameobjects
    ctx.fillStyle = '#000';
    for (const gameObject of gameObjects) {
      const pixelX = gameObject.x * squarePixels;
      const pixelY = gameObject.y * squarePixels;
      ctx.fillRect(pixelX, pixelY, spritePixels, spritePixels);
    }
  }

  // draw on data update
  useEffect(() => {
    draw();
  }, [hoverIndex, gameObjects]);

  return (
    <canvas
      className={styles.frame}
      ref={canvasRef}
      onMouseDown={mouseDown}
      onMouseMove={mouseMove}
      onMouseUp={mouseUp}
      onMouseLeave={mouseLeave}
      width={mapPixels}
      height={mapPixels}
    />
  );
}
