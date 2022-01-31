import Objects from '../components/Objects';
import Loading from '../components/Loading';

import { useState } from 'react';
import { defaultCodes } from '../util/defaultData';
import dynamic from 'next/dynamic';

import styles from '../styles/components/Engine.module.css';

const CodeEditor = dynamic(import('../components/CodeEditor'), {
  loading: function Load() { return <Loading /> }, ssr: false
});

export default function Engine() {
  const [currObject, setCurrObject] = useState(0);
  const [codes, setCodes] = useState(defaultCodes);

  // updates code with given value
  function updateCode(val) {
    const newCodes = codes.slice();
    newCodes[currObject] = val;
    setCodes(newCodes);
  }

  return (
    <div>
      <CodeEditor
        value={codes[currObject]}
        onChange={val => updateCode(val)}
      />
      <Objects
        currObject={currObject}
        setCurrObject={setCurrObject}
      />
    </div>
  );
}
