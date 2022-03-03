import Link from 'next/link';

import { mapSprites, mapSquares } from '../util/units';
import { useEffect, useRef } from 'react';
import drawSprite from '../util/drawSprite';

import styles from '../styles/components/ProjectCard.module.css';

let canvas, ctx;

const mapPixels = 128;
const squarePixels = Math.round(mapPixels / mapSquares);
const spritePixels = Math.round(mapPixels / mapSprites);

export default function ProjectCard(props) {
  const { project } = props;

  // parse values from saved data
  const colors = JSON.parse(project.colors);
  const tileSprites = JSON.parse(project.tileSprites);
  const objectSprites = JSON.parse(project.objectSprites);
  const tiles = JSON.parse(project.tiles);
  const objects = JSON.parse(project.objects);

  const canvasRef = useRef();

  function drawCover() {
    // for each tile
    for (let y = 0; y < mapSprites; y++) {
      for (let x = 0; x < mapSprites; x++) {
        // get sprite
        const spriteIndex = y * mapSprites + x;
        const sprite = tileSprites[tiles[spriteIndex]];
        // draw sprite
        drawSprite(
          ctx, sprite,
          x * spritePixels, y * spritePixels,
          colors, squarePixels
        );
      }
    }
    // for each object
    for (const object of objects) {
      // get sprite
      const { x, y } = object;
      const sprite = objectSprites[object.objectIndex];
      // draw sprite
      drawSprite(
        ctx, sprite,
        x * squarePixels, y * squarePixels,
        colors, squarePixels
      );
    }
  }

  // get canvas ref on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    drawCover();
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
