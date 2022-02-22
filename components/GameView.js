import IconButton from './IconButton';
import GameEditor from './GameEditor';
import GameFrame from './GameFrame';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import getGameSrc from '../util/getGameSrc';

import styles from '../styles/components/GameView.module.css';

const mapPixels = 256;

export default function GameView(props) {
  const { onError, colors, codes, objects, currObject } = props;

  const auth = getAuth();
  const db = getFirestore();

  const [playing, setPlaying] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [gameObjects, setGameObjects] = useState([]);

  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');

  // deletes current gameobject
  function deleteGameObject() {
    // confirm delete
    if (!window.confirm('Delete object?')) return;
    // delete current object
    const newGameObjects = gameObjects.slice(0, -1);
    setGameObjects(newGameObjects);
  }

  // downloads game as html file
  function downloadGame() {
    const gameSrc = getGameSrc({ colors, codes, objects, gameObjects });
    const link = document.createElement('a');
    link.download = 'game.html';
    link.href = `data:text/html;charset=utf-8,${encodeURIComponent(gameSrc)}`;
    link.click();
  }

  // saves project to firebase
  async function saveProject() {
    setSaving(false);
    const project = {
      colors: JSON.stringify(colors),
      codes: JSON.stringify(codes),
      objects: JSON.stringify(objects),
      gameObjects: JSON.stringify(gameObjects),
      uid: auth.currentUser.uid,
      title: title
    };
    const projectsRef = collection(db, 'projects-two');
    await addDoc(projectsRef, project);
  }

  return (
    <div className={styles.container}>
      <Dialog open={saving} onClose={() => setSaving(false)}>
        <DialogContent>
          <form
            className={styles.saveform}
            onSubmit={e => {
              e.preventDefault();
              saveProject();
            }}
          >
            Save Project
            <input
              className="textinput"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Title"
              required
            />
            <button className="textbutton">
              Save
            </button>
          </form>
        </DialogContent>
      </Dialog>
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
        <IconButton
          onClick={downloadGame}
          icon="download"
        />
        <IconButton
          onClick={() => {
            setTitle('');
            setSaving(true);
          }}
          icon="save"
        />
        {
          (!playing && !!gameObjects.length) &&
          <IconButton
            onClick={deleteGameObject}
            icon="clear"
          />
        }
        {
          playing &&
          <IconButton
            onClick={() => setRefresh(true)}
            icon="replay"
          />
        }
      </div>
    </div>
  );
}
