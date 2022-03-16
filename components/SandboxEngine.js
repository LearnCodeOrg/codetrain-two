import IconButton from '../components/IconButton';
import Code from '../components/Code';
import MatButton from '../components/MatButton';
import CodeLine from '../components/CodeLine';
import SelectSnippet from '../components/SelectSnippet';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import {
  getFirestore, doc, updateDoc, collection, addDoc, deleteDoc
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import highlightJs from '../util/highlightJs';

import styles from '../styles/components/SandboxEngine.module.css';

export default function SandboxEngine(props) {
  const { currUser } = props;

  const db = getFirestore();

  const [error, setError] = useState(null);

  const [docsHidden, setDocsHidden] = useState(false);

  const [code, setCode] = useState(props.code ?? '');

  const [title, setTitle] = useState(props.title ?? '');
  const [saving, setSaving] = useState(false);

  const [currSnippet, setCurrSnippet] = useState(null);

  // highlight js on start
  useEffect(() => {
    highlightJs();
  }, []);

  // compiles user code
  function compile() {
    // reset console
    clear();
    function log(text) {
      document.getElementById('output').innerHTML += `${text}\n`;
    }
    function logImage(url) {
      document.getElementById('output').innerHTML += `<img src=${url} alt=${url} />\n`;
    }
    function prompt(text) {
      const out = window.prompt(text);
      log(`> ${text} > ${out}`);
      return out;
    }
    function alert(text) {
      window.alert(text);
      log(`> ${text}`);
    }
    let src = code.split('\n');
    let evalWithClosure = (statements, rest) => {
      if (!statements.length && !rest.length) return;
      statements.push(rest.shift());
      try {
        eval(`void (evalWithClosure = ${evalWithClosure.toString()}); ${statements.join('\n')}`);
        statements = [];
      } catch (e) {
        if (rest.length === 0) throw e;
      }
      setTimeout(() => evalWithClosure(statements, rest), 0);
    };
    try {
      evalWithClosure([], src);
    } catch (e) {
      setError(e.message);
    }
  }

  // saves snippet
  function save() {
    setTitle(currSnippet?.title ?? '');
    setSaving(true);
  }

  // clears logs
  function clear() {
    document.getElementById('output').innerHTML = '';
    setError(null);
  }

  // saves snippet to firebase
  async function saveSnippet() {
    // get snippet object
    setSaving(false);
    const snippet = {
      code: code,
      uid: currUser.id,
      title: title
    };
    // update snippet
    const id = currSnippet?.id;
    if (id) {
      const snippetRef = doc(db, 'snippets', id);
      updateDoc(snippetRef, snippet);
    // create snippet
    } else {
      const snippetsRef = collection(db, 'snippets');
      const snippetDoc = await addDoc(snippetsRef, snippet);
      setCurrSnippet({ id: snippetDoc.id, ...snippet });
    }
  }

  // loads given snippet
  function loadSnippet(snippet) {
    setCurrSnippet(snippet);
    setCode(snippet?.code ?? '');
    clear();
  }

  // deletes snippet in firebase
  async function deleteSnippet() {
    if (!window.confirm('Delete snippet?')) return;
    const snippetRef = doc(db, 'snippets', currSnippet.id);
    await deleteDoc(snippetRef);
    loadSnippet(null);
  }

  return (
    <div>
      <Dialog open={saving} onClose={() => setSaving(false)}>
        <DialogContent>
          <form
            className={styles.saveform}
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
      <div className={styles.content}>
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
          <CodeLine>`log(text)` logs text</CodeLine>
          <CodeLine>`logImage(url)` logs images</CodeLine>
          <CodeLine>`prompt(text)` opens prompt and returns input</CodeLine>
          <CodeLine>`alert(text)` opens alert</CodeLine>
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
          {
            currUser === undefined ?
            <span>Loading...</span> :
            currUser === false ?
            <span
              className={styles.clickable}
              onClick={() => signIn(setupUser)}
            >
              Sign in to save
            </span> :
            currUser === null ?
            <span
              className={styles.clickable}
              onClick={setupUser}
            >
              Setup user
            </span> :
            <SelectSnippet
              currSnippet={currSnippet}
              loadSnippet={loadSnippet}
              {...props}
            />
          }
          {
            currSnippet &&
            <IconButton
              onClick={deleteSnippet}
              icon="clear"
            />
          }
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <div className={styles.console}>
        <div className={styles.head}>
          <span>Console</span>
          <button
            className="textbutton"
            onClick={clear}
          >
            Clear
          </button>
        </div>
        <div className={styles.logs}>
          <pre
            className={styles.output}
            id="output"
          >
          </pre>
        </div>
      </div>
      </div>
    </div>
  );
}
