import Objects from '../components/Objects';
import Draw from '../components/Draw';
import Colors from '../components/Colors';
import GameView from '../components/GameView';
import Loading from '../components/Loading';

import { useEffect, useState } from 'react';
import {
  defaultCodes, defaultColors, defaultObjects
} from '../util/data';
import dynamic from 'next/dynamic';

import styles from '../styles/components/Engine.module.css';

const CodeEditor = dynamic(import('../components/CodeEditor'), {
  loading: function Load() { return <Loading /> }, ssr: false
});

export default function Engine() {
  const [currObject, setCurrObject] = useState(0);
  const [currColor, setCurrColor] = useState(0);
  const [codes, setCodes] = useState(defaultCodes);
  const [colors, setColors] = useState(defaultColors);
  const [objects, setObjects] = useState(defaultObjects);
  const [marker, setMarker] = useState(undefined);

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
          objects={objects}
          colors={colors}
          currObject={currObject}
          setCurrObject={setCurrObject}
        />
        <Colors
          colors={colors}
          setColors={setColors}
          currColor={currColor}
          setCurrColor={setCurrColor}
        />
        <Draw
          objects={objects}
          setObjects={setObjects}
          colors={colors}
          currColor={currColor}
          currObject={currObject}
        />
      </div>
      <div>
        <GameView
          codes={codes}
          onError={onError}
          colors={colors}
          objects={objects}
          currObject={currObject}
        />
      </div>
    </div>
  );
}
