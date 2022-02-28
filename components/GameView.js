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
  const {
    onError, colors, codes,
    objects, currObject,
    tiles, currTile,
    gameObjects, setGameObjects,
    gameTiles, setGameTiles
  } = props;

  const auth = getAuth();
  const db = getFirestore();

  const [playing, setPlaying] = useState(false);
  const [refresh, setRefresh] = useState(false);

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

  // updates id of current object with given value
  function updateObjectId(newId) {
    // get current object
    const { id, ...heldObject } = gameObjects[gameObjects.length - 1];
    const newGameObjects = gameObjects.slice();
    // splice new object into gameobjects
    const newGameObject = { id: newId, ...heldObject };
    newGameObjects.splice(gameObjects.length - 1, 1, newGameObject);
    setGameObjects(newGameObjects);
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
          tiles={tiles}
          currTile={currTile}
          gameObjects={gameObjects}
          setGameObjects={setGameObjects}
          gameTiles={gameTiles}
          setGameTiles={setGameTiles}
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
          <>
            <IconButton
              onClick={deleteGameObject}
              icon="clear"
            />
            <input
              className="textinput"
              placeholder="Object ID"
              value={gameObjects[gameObjects.length - 1].id}
              onChange={e => updateObjectId(e.target.value)}
            />
          </>
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
