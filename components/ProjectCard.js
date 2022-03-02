import Link from 'next/link';

import { spriteSquares, mapSprites, mapSquares } from '../util/units';
import { useEffect, useRef } from 'react';

import styles from '../styles/components/ProjectCard.module.css';

let canvas, ctx;

const mapPixels = 128;
const squarePixels = Math.round(mapPixels / mapSquares);
const spritePixels = Math.round(mapPixels / mapSprites);

export default function ProjectCard(props) {
  const { project } = props;

  // parse values from saved data
  const colors = JSON.parse(project.colors);
  const tiles = JSON.parse(project.tiles);
  const objects = JSON.parse(project.objects);
  const gameTiles = JSON.parse(project.gameTiles);
  const gameObjects = JSON.parse(project.gameObjects);

  const canvasRef = useRef();

  function drawSprite(sprite, x, y) {
    // for each pixel
    for (let yp = 0; yp < spriteSquares; yp++) {
      for (let xp = 0; xp < spriteSquares; xp++) {
        // set fill color
        const spriteIndex = yp * spriteSquares + xp;
        const colorIndex = sprite[spriteIndex];
        if (colorIndex === -1) continue;
        const color = colors[colorIndex];
        ctx.fillStyle = color;
        // get fill position
        let xm = x + xp * squarePixels;
        let ym = y + yp * squarePixels;
        // fill pixel
        ctx.fillRect(xm, ym, squarePixels, squarePixels);
      }
    }
  }

  // get canvas ref on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  return (
    <div className={styles.container}>
      <Link href={`/project/${project.id}`}>
        <a>
          <canvas
            ref={canvasRef}
            width={mapPixels}
            height={mapPixels}
          />
        </a>
      </Link>
      <Link href={`/project/${project.id}`}>
        <a>
          <p>{project.title}</p>
        </a>
      </Link>
    </div>
  );
}
