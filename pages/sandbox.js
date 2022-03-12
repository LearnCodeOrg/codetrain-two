import IconButton from '../components/IconButton';
import Header from '../components/Header';
import Code from '../components/Code';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MatButton from '../components/MatButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useState } from 'react';

import styles from '../styles/pages/Sandbox.module.css';

export default function Sandbox(props) {
  const [docsHidden, setDocsHidden] = useState(false);

  const [code, setCode] = useState('');
  const [logs, setLogs] = useState([]);

  const [title, setTitle] = useState('');
  const [saving, setSaving] = useState(false);

  // compiles user code
  function compile() {
    setLogs([]);
    const codeLogs = new Function(`
      const logs = [];
      function log(text) {
        logs.push({ type: 'text', text: text });
      }
      function logImage(url) {
        logs.push({ type: 'image', url: url });
      }
      function prompt(text) {
        const out = window.prompt(text);
        log(\`> \${text} > \${out}\`);
        return out;
      }
      function alert(text) {
        window.alert(text);
        log(\`> \${text}\`);
      }
      ;${code};
      return logs;
    `)();
    setLogs(codeLogs);
  }

  // saves snippet
  function save() {
    setTitle('');
    setSaving(true);
  }

  // clears logs
  function clear() {
    setLogs([]);
  }

  return (
    <div>
      <Header {...props} />
      <Dialog open={saving} onClose={() => setSaving(false)}>
        <DialogContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              saveSnippet();
            }}
          >
            Save Snippet
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
      <div className={
        docsHidden ? `${styles.docs} ${styles.hidden}` : styles.docs
      }>
        <div className={styles.button}>
          {
            docsHidden ?
            <MatButton
              onClick={() => setDocsHidden(false)}
              Icon={ArrowCircleRightIcon}
            /> :
            <MatButton
              onClick={() => setDocsHidden(true)}
              Icon={ArrowCircleLeftIcon}
            />
          }
        </div>
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
          <IconButton
            onClick={save}
            icon="save"
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
