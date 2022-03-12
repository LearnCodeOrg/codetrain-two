import IconButton from '../components/IconButton';
import Header from '../components/Header';
import Code from '../components/Code';

import { useState } from 'react';

import styles from '../styles/pages/Sandbox.module.css';

export default function Sandbox(props) {
  const [code, setCode] = useState('');

  // compiles user code
  function compile() {
    eval(code);
  }

  return (
    <div>
      <Header {...props} />
      <Code
        value={code}
        onChange={val => setCode(val)}
      />
      <IconButton
        onClick={compile}
        icon="play"
      >
        Compile
      </IconButton>
      <div className={styles.docs}>
        <div className={styles.docscontent}>
          <h2>Docs</h2>
          <p>log(text): logs given text</p>
          <p>logImage(url): logs given image</p>
          <p>prompt(text): opens prompt and returns input</p>
          <p>alert(text): opens alert</p>
        </div>
      </div>
    </div>
  );
}
