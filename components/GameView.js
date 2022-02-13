import IconButton from './IconButton';
import GameEditor from './GameEditor';
import GameFrame from './GameFrame';

import { useState } from 'react';

import styles from '../styles/components/GameView.module.css';

const mapPixels = 256;

export default function GameView(props) {
  const { onError, colors, objects, currObject } = props;

  const [playing, setPlaying] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [gameObjects, setGameObjects] = useState([]);

  return (
    <div className={styles.container}>
      {
        playing ?
        <GameFrame
          onError={onError}
          refresh={refresh}
          setRefresh={setRefresh}
          mapPixels={mapPixels}
          gameObjects={gameObjects}
          {...props}
        /> :
        <GameEditor
          mapPixels={mapPixels}
          colors={colors}
          objects={objects}
          currObject={currObject}
          gameObjects={gameObjects}
          setGameObjects={setGameObjects}
        />
      }
      <div className={styles.toolbar}>
        <IconButton
          onClick={() => setPlaying(val => !val)}
          icon={playing ? 'pause' : 'play'}
          down={playing}
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
