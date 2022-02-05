import GameFrame from './GameFrame';

import { useEffect, useRef, useState } from 'react';

import styles from '../styles/components/GameEditor.module.css';

let canvas, ctx;

export default function GameEditor() {
  const canvasRef = useRef();

  const [sketching, setSketching] = useState(false);
  const [playing, setPlaying] = useState(false);

  // sketches canvas
  function sketch(e) {

  }

  // called on mouse down
  function mouseDown(e) {
    setSketching(true);
    sketch(e);
  }

  // called on mouse move
  function mouseMove(e) {
    if (sketching) sketch(e);
  }

  // called on mouse up
  function mouseUp(e) {
    setSketching(false);
  }

  // called on mouse leave
  function mouseLeave(e) {
    setSketching(false);
  }

  // get canvas context on start
  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  }, []);

  return (
    <div>
      {
        playing ?
        <GameFrame /> :
        <canvas
          ref={canvasRef}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
          onMouseLeave={mouseLeave}
        />
      }
    </div>
  );
}
