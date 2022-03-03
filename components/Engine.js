import Objects from '../components/Objects';
import Tiles from '../components/Tiles';
import Draw from '../components/Draw';
import Colors from '../components/Colors';
import GameView from '../components/GameView';
import Loading from '../components/Loading';

import { useEffect, useState } from 'react';
import {
  defaultCodes, defaultColors,
  defaultObjectSprites, defaultTileSprites,
  defaultObjects, defaultTiles
} from '../util/data';
import dynamic from 'next/dynamic';

import styles from '../styles/components/Engine.module.css';

const CodeEditor = dynamic(import('../components/CodeEditor'), {
  loading: function Load() { return <Loading /> }, ssr: false
});

export default function Engine(props) {
  const [currObject, setCurrObject] = useState(0);
  const [currTile, setCurrTile] = useState(-1);
  const [currColor, setCurrColor] = useState(0);

  const [marker, setMarker] = useState(undefined);

  const [codes, setCodes] = useState(
    props.codes ? JSON.parse(props.codes) : defaultCodes
  );
  const [colors, setColors] = useState(
    props.colors ? JSON.parse(props.colors) : defaultColors
  );
  const [objectSprites, setObjectSprites] = useState(
    props.objectSprites ? JSON.parse(props.objectSprites) : defaultObjectSprites
  );
  const [tileSprites, setTileSprites] = useState(
    props.tileSprites ? JSON.parse(props.tileSprites) : defaultTileSprites
  );
  const [objects, setObjects] = useState(
    props.objects ? JSON.parse(props.objects) : defaultObjects
  );
  const [tiles, setTiles] = useState(
    props.tiles ? JSON.parse(props.tiles) : defaultTiles
  )

  // clear object on tile change
  useEffect(() => {
    if (currTile !== -1 && currObject !== -1) setCurrObject(-1);
  }, [currTile]);

  // clear tile on object change
  useEffect(() => {
    if (currObject !== -1 && currTile !== -1) setCurrTile(-1);
  }, [currObject]);

  // updates code with given value
  function updateCode(val) {
    // clear marker if current object
    if (marker && marker.object === currObject) setMarker(undefined);
    // update codes
    const newCodes = codes.slice();
    newCodes[currObject] = val;
    setCodes(newCodes);
  }

  // called when game editor throws error
  function onError(e, i, row, col) {
    setCurrObject(i);
    // set marker if row and col
    if (row && col) setMarker({ row, col, object: i });
  }

  // set error function as global
  useEffect(() => {
    window.onError = onError;
  }, []);

  return (
    <div className={styles.container}>
      <CodeEditor
        value={codes[currObject]}
        onChange={val => updateCode(val)}
        marker={marker}
        currObject={currObject}
      />
      <div className={styles.draw}>
        <Objects
          objectSprites={objectSprites}
          colors={colors}
          currObject={currObject}
          setCurrObject={setCurrObject}
        />
        <Tiles
          tileSprites={tileSprites}
          colors={colors}
          currTile={currTile}
          setCurrTile={setCurrTile}
        />
        <Colors
          colors={colors}
          setColors={setColors}
          currColor={currColor}
          setCurrColor={setCurrColor}
        />
        <Draw
          colors={colors}
          objectSprites={objectSprites}
          setObjectSprites={setObjectSprites}
          tileSprites={tileSprites}
          setTileSprites={setTileSprites}
          currColor={currColor}
          currObject={currObject}
          currTile={currTile}
        />
      </div>
      <div>
        <GameView
          codes={codes}
          onError={onError}
          colors={colors}
          objectSprites={objectSprites} currObject={currObject}
          tileSprites={tileSprites} currTile={currTile}
          objects={objects} setObjects={setObjects}
          tiles={tiles} setTiles={setTiles}
          id={props.id}
          title={props.title}
        />
      </div>
    </div>
  );
}
