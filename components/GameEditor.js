import IconButton from './IconButton';
import GameFrame from './GameFrame';

import { useEffect, useRef, useState } from 'react';

import styles from '../styles/components/GameEditor.module.css';

let canvas, ctx;

const mapPixels = 256;

export default function GameEditor(props) {
  const { onError } = props;

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
    <div className={styles.container}>
      {
        playing ?
        <GameFrame
          onError={onError}
          {...props}
        /> :
        <canvas
          ref={canvasRef}
          onMouseDown={mouseDown}
          onMouseMove={mouseMove}
          onMouseUp={mouseUp}
          onMouseLeave={mouseLeave}
          width={mapPixels}
          height={mapPixels}
        />
      }
      <IconButton
        onClick={() => setPlaying(val => !val)}
        icon={playing ? 'pause' : 'play'}
        down={!playing}
      />
    </div>
  );
}
