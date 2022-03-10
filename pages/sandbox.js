import Code from '../components/Code';

import { useState } from 'react';

import styles from '../styles/pages/Sandbox.module.css';

export default function Sandbox() {
  const [code, setCode] = useState('');

  return (
    <div>
      <Code
        value={code}
        onChange={val => setCode(val)}
      />
    </div>
  );
}
