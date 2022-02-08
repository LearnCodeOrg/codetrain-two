import Objects from '../components/Objects';
import Draw from '../components/Draw';
import Colors from '../components/Colors';
import GameView from '../components/GameView';
import Loading from '../components/Loading';

import { useState } from 'react';
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

  // updates code with given value
  function updateCode(val) {
    const newCodes = codes.slice();
    newCodes[currObject] = val;
    setCodes(newCodes);
  }

  // called when game editor throws error
  function onError(e) {
    console.log(e);
  }

  return (
    <div className={styles.container}>
      <CodeEditor
        value={codes[currObject]}
        onChange={val => updateCode(val)}
      />
      <div>
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
        />
      </div>
    </div>
  );
}
