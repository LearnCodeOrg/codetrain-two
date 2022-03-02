import Link from 'next/link';

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
