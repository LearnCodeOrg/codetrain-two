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
      <p>Functions: prompt(), log(), alert()</p>
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
    </div>
  );
}
