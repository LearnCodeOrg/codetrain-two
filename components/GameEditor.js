import { useEffect, useRef, useState } from 'react';
import { mousePosition, mouseIndex } from '../util/mouse';
import { fillBorder, fillHover } from '../util/fill';
import { mapSprites, spriteSquares } from '../util/units';
import randomWords from 'random-words';
import drawSprite from '../util/drawSprite';

import styles from '../styles/components/GameEditor.module.css';

let canvas, ctx;

export default function GameEditor(props) {
  const {
    mapPixels, colors,
    objects, currObject,
    tiles, currTile,
    gameObjects, setGameObjects,
    gameTiles, setGameTiles
  } = props;

  const spritePixels = Math.round(mapPixels / mapSprites);
  const halfSpritePixels = Math.round(spritePixels / 2);
  const squarePixels = Math.round(spritePixels / spriteSquares);
  const halfSpriteSquares = Math.round(spriteSquares / 2);
  const mapSquares = Math.round(mapPixels / squarePixels);

  const [sketching, setSketching] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);

  const canvasRef = useRef();

  // clamps given val between min and max
  function clamp(val, min, max) {
    return val < min ? min : val > max ? max : val;
  }

  // clamps given x and y values between min and max
  function clampXY(x, y, min, max) {
    const newX = clamp(x, min, max);
    const newY = clamp(y, min, max);
    return [newX, newY];
  }

  // return clamped square position
  function getClampedPos(e) {
    // get mouse position
    const [mouseX, mouseY] = mousePosition(e, canvas);
    let newX = Math.floor(mouseX / squarePixels) - halfSpriteSquares;
    let newY = Math.floor(mouseY / squarePixels) - halfSpriteSquares;
    // return clamped position
    return clampXY(newX, newY, 0, mapSquares - spriteSquares);
  }

  // sketches canvas
  function sketch(e) {
    // sketch tiles
    if (currObject === -1) {
      // get mouse position
      const [mouseX, mouseY] = mousePosition(e, canvas);
      // get x and y in map units
      const tileX = clamp(Math.floor(mouseX / spritePixels), 0, mapSprites - 1);
      const tileY = clamp(Math.floor(mouseY / spritePixels), 0, mapSprites - 1);
      const tileIndex = tileY * mapSprites + tileX;
      // return if same tile
      if (gameTiles[tileIndex] === currTile) return;
      // update tile
      const newGameTiles = gameTiles.slice();
      newGameTiles[tileIndex] = currTile;
      setGameTiles(newGameTiles);
      return;
    }
    // get clamped position
    const [newX, newY] = getClampedPos(e);
    // if gameobjects
    if (gameObjects.length) {
      // get clicked object
      const clickedObject = gameObjects[gameObjects.length - 1];
      const { x, y, ...obj } = clickedObject;
      const newGameObjects = gameObjects.slice();
      const heldIndex = gameObjects.indexOf(clickedObject);
      // move clicked object
      newGameObjects.splice(heldIndex, 1);
      newGameObjects.push({ x: newX, y: newY, ...obj });
      setGameObjects(newGameObjects);
      return;
    }
  }

  // called on mouse down
  function mouseDown(e) {
    // start sketching
    setSketching(true);
    // if tile selected
    if (currObject === -1) {
      // get tile index
      const tileIndex = mouseIndex(e, canvas, spritePixels, mapSprites);
      // return if same tile
      if (gameTiles[tileIndex] === currTile) return;
      // set new tile
      const newGameTiles = gameTiles.slice();
      newGameTiles[tileIndex] = currTile;
      setGameTiles(newGameTiles);
      return;
    }
    // get clamped position
    const [newX, newY] = getClampedPos(e);
    // get clicked objects
    const [mouseX, mouseY] = mousePosition(e, canvas);
    const clicked = gameObjects.filter(obj => (
      obj.x * squarePixels >= mouseX - spritePixels &&
      obj.x * squarePixels <= mouseX &&
      obj.y * squarePixels >= mouseY - spritePixels &&
      obj.y * squarePixels <= mouseY
    )).reverse();
    // if clicked object
    if (clicked.length) {
      // get clicked object
      const clickedObject = clicked[0];
      const { x, y, ...obj } = clickedObject;
      const newGameObjects = gameObjects.slice();
      const heldIndex = gameObjects.indexOf(clickedObject);
      // move clicked object
      newGameObjects.splice(heldIndex, 1);
      newGameObjects.push({ x: newX, y: newY, ...obj });
      setGameObjects(newGameObjects);
      return;
    }
    // get mouse position
    const squareX = hoverIndex % mapSquares - halfSpriteSquares;
    const squareY = Math.floor(hoverIndex / mapSquares) - halfSpriteSquares;
    // append new gameobject
    const id = randomWords({ exactly: 1, minLength: 3, maxLength: 5 })[0];
    const newGameObject = { x: squareX, y: squareY, object: currObject, id };
    setGameObjects(val => [...val, newGameObject]);
  }

  // called on mouse move
  function mouseMove(e) {
    // sketch
    if (sketching) sketch(e);
    // get square position
    let [mouseX, mouseY] = mousePosition(e, canvas);
    let squareX = Math.floor(mouseX / squarePixels);
    let squareY = Math.floor(mouseY / squarePixels);
    // clamp square position
    let [clampedSquareX, clampedSquareY] = clampXY(
      squareX, squareY, halfSpriteSquares, mapSquares - halfSpriteSquares
    );
    // calculate square index
    const squareIndex = clampedSquareY * mapSquares + clampedSquareX;
    // set hover index
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
    // for each tile
    for (let x = 0; x < mapSprites; x++) {
      for (let y = 0; y < mapSprites; y++) {
        // get game tile
        const gameTileIndex = y * mapSprites + x;
        const gameTile = gameTiles[gameTileIndex];
        // get sprite
        const sprite = tiles[gameTile];
        // draw sprite
        drawSprite(
          ctx, sprite,
          x * spritePixels, y * spritePixels,
          colors, squarePixels
        );
      }
    }
    // draw gameobjects
    for (let i = 0; i < gameObjects.length; i++) {
      // get sprite
      const gameObject = gameObjects[i];
      const sprite = objects[gameObject.object];
      // get sprite position
      const pixelX = gameObject.x * squarePixels;
      const pixelY = gameObject.y * squarePixels;
      // draw sprite
      drawSprite(ctx, sprite, pixelX, pixelY, colors, spriteSquares);
      // fill hover if last object
      if (i === gameObjects.length - 1) {
        fillHover(ctx, squarePixels, pixelX, pixelY, spritePixels, spritePixels);
      }
    }
    // if hovering
    if (hoverIndex !== -1) {
      // draw hover
      let hoverX = hoverIndex % mapSquares;
      let hoverY = Math.floor(hoverIndex / mapSquares);
      // calculate tile hover
      if (currObject === -1) {
        hoverX = Math.floor(hoverX / mapSprites) * mapSprites * squarePixels;
        hoverY = Math.floor(hoverY / mapSprites) * mapSprites * squarePixels;
      // calculate object hover
      } else {
        hoverX = hoverX * squarePixels - halfSpritePixels;
        hoverY = hoverY * squarePixels - halfSpritePixels;
      }
      // fill border if sketching
      if (sketching) {
        fillBorder(ctx, squarePixels, hoverX, hoverY, spritePixels, spritePixels);
      // fill hover if hovering
      } else {
        fillHover(ctx, squarePixels, hoverX, hoverY, spritePixels, spritePixels);
      }
    }
  }

  // draw on data update
  useEffect(() => {
    draw();
  }, [hoverIndex, colors, objects, gameObjects, gameTiles, sketching, tiles]);

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
