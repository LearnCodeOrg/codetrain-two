import IconButton from './IconButton';
import GameFrame from './GameFrame';

import { useEffect, useRef, useState } from 'react';

import styles from '../styles/components/GameView.module.css';

let canvas, ctx;

const mapPixels = 256;

export default function GameView(props) {
  const { onError } = props;

  const canvasRef = useRef();

  const [sketching, setSketching] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
          refresh={refresh}
          setRefresh={setRefresh}
          {...props}
        /> :
        <GameEditor />
      }
      <div className={styles.toolbar}>
        <IconButton
          onClick={() => setPlaying(val => !val)}
          icon={playing ? 'pause' : 'play'}
          down={!playing}
        />
        {
          playing &&
          <IconButton
            onClick={() => setRefresh(true)}
            icon="replay"
            auto
          />
        }
      </div>
    </div>
  );
}
