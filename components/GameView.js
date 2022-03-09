import IconButton from './IconButton';
import GameEditor from './GameEditor';
import GameFrame from './GameFrame';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  getFirestore, collection, addDoc, doc, updateDoc
} from 'firebase/firestore';
import getGameSrc from '../util/getGameSrc';
import signIn from '../util/signIn';

import styles from '../styles/components/GameView.module.css';

const mapPixels = 256;

export default function GameView(props) {
  const {
    onError, colors, codes,
    objectSprites, currObject,
    tileSprites, currTile,
    objects, setObjects,
    tiles, setTiles,
    id, currUser, setupUser
  } = props;

  const auth = getAuth();
  const db = getFirestore();

  const [playing, setPlaying] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState(props.title);

  // deletes current gameobject
  function deleteGameObject() {
    // confirm delete
    if (!window.confirm('Delete object?')) return;
    // delete current object
    const newGameObjects = objects.slice(0, -1);
    setObjects(newGameObjects);
  }

  // downloads game as html file
  function downloadGame() {
    const gameSrc = getGameSrc({
      colors, codes, objectSprites, objects, tileSprites, tiles
    });
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
      objectSprites: JSON.stringify(objectSprites),
      tileSprites: JSON.stringify(tileSprites),
      objects: JSON.stringify(objects),
      tiles: JSON.stringify(tiles),
      uid: auth.currentUser.uid,
      title: title
    };
    // update project
    if (id) {
      const projectRef = doc(db, 'projects-two', id);
      updateDoc(projectRef, project);
    // create project
    } else {
      const projectsRef = collection(db, 'projects-two');
      await addDoc(projectsRef, project);
    }
  }

  // updates id of current object with given value
  function updateObjectId(newId) {
    // get current object
    // splice new object into gameobjects
    const { id, ...heldObject } = objects[objects.length - 1];
    const newGameObjects = objects.slice();
    const newGameObject = { id: newId, ...heldObject };
    newGameObjects.splice(objects.length - 1, 1, newGameObject);
    setObjects(newGameObjects);
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
          objects={objects}
          {...props}
        /> :
        <GameEditor
          mapPixels={mapPixels}
          colors={colors}
          objectSprites={objectSprites}
          currObject={currObject}
          tileSprites={tileSprites}
          currTile={currTile}
          objects={objects}
          setObjects={setObjects}
          tiles={tiles}
          setTiles={setTiles}
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
            if (currUser === false) signIn(setupUser);
            if (currUser === null) setupUser();
            else if (currUser) {
              setTitle(props.title ?? '');
              setSaving(true);
            }
          }}
          icon="save"
        />
        {
          (!playing && !!objects.length) &&
          <>
            <IconButton
              onClick={deleteGameObject}
              icon="clear"
            />
            <input
              className="textinput"
              placeholder="Object ID"
              value={objects[objects.length - 1].id}
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
