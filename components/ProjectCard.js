import { useEffect, useRef } from 'react';

import styles from '../styles/components/ProjectCard.module.css';

let canvas, ctx;

const mapPixels = 128;

export default function ProjectCard() {
  const canvasRef = useRef();

  // get canvas ref on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={mapPixels}
        height={mapPixels}
      />
    </div>
  );
}
