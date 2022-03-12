import IconButton from '../components/IconButton';
import Header from '../components/Header';
import Code from '../components/Code';

import { useState } from 'react';

import styles from '../styles/pages/Sandbox.module.css';

export default function Sandbox(props) {
  const [docsHidden, setDocsHidden] = useState(false);

  const [code, setCode] = useState('');
  const [logs, setLogs] = useState([]);

  // compiles user code
  function compile() {
    setLogs([]);
    const codeLogs = new Function(`
      const logs = [];
      ;${code};
      return logs;
    `)();
    setLogs(codeLogs);
  }

  // clears logs
  function clear() {
    setLogs([]);
  }

  return (
    <div>
      <Header {...props} />
      <div className={
        docsHidden ? `${styles.docs} ${styles.hidden}` : styles.docs
      }>
        {
          docsHidden ?
          <button
            className={styles.arrow}
            onClick={() => setDocsHidden(false)}
          >
            <ArrowCircleRightIcon fontSize="large" />
          </button> :
          <button
            className={styles.arrow}
            onClick={() => setDocsHidden(true)}
          >
            <ArrowCircleLeftIcon fontSize="large" />
          </button>
        }
        <div className={styles.docscontent}>
          <h2>Docs</h2>
          <p>log(text): logs given text</p>
          <p>logImage(url): logs given image</p>
          <p>prompt(text): opens prompt and returns input</p>
          <p>alert(text): opens alert</p>
        </div>
      </div>
      <div>
        <Code
          value={code}
          onChange={val => setCode(val)}
        />
        <div className={styles.toolbar}>
          <IconButton
            onClick={compile}
            icon="play"
          />
        </div>
      </div>
      <div>
        <p>Console</p>
        <button onClick={clear}>
          Clear
        </button>
          {
            logs.map((log, i) =>
              <div key={i}>
                {
                  log.type === 'text' ?
                  <p>{log.text}</p> :
                  log.type === 'image' ?
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={log.url} alt={log.url} /> :
                  null
                }
              </div>
            )
          }
      </div>
    </div>
  );
}
