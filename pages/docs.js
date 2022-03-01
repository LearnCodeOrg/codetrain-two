import Header from '../components/Header';

import styles from '../styles/pages/Docs.module.css';

export default function Docs() {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h1>Docs</h1>
        <p>These docs provide an overview of the Codetrain engine functionality.</p>
        <h2>Game Loop</h2>
        <p>The GameObject class has two built-in functions, start() and update(). The constructor() function can also be used.</p>
        <p>constructor() runs before the object is constructed.</p>
        <p>start() runs after all objects are constructed.</p>
        <p>update() runs once a frame after all objects are constructed.</p>
        <pre>
          <code>
{`return class GameObject0 extends GameObject {
  constructor(index) {
    super(index);
    // runs before objects constructed
  }
  start() {
    // runs after all objects constructed
  }
  update() {
    // runs once every frame
  }
}`}
          </code>
        </pre>
        <h2>Output</h2>
        <p>Text can be added and removed with addText() and removeText().</p>
        <p>addText(text, x, y, options?) creates and returns text at x, y in pixels.</p>
        <p>options is an optional object containing size, color, and id fields.</p>
        <p>removeText(id) removes text with given id.</p>
        <pre>
          <code>
{`// create score text
addText('Score: 0', 0, 0, 'score');

// update score text
addText('Score: 1', 0, 0, 'score');

// remove score text
removeText('score');`}
          </code>
        </pre>
        <h2>Input</h2>
        <p>Keyboard input can be taken with isKeyDown() and isKey().</p>
        <p>isKeyDown(key) returns whether given key is down.</p>
        <p>isKey(key) returns whether given key was pressed in the last frame.</p>
      </div>
    </div>
  );
}
