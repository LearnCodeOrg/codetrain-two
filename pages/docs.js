import Header from '../components/Header';

import { useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/monokai.css';

import styles from '../styles/pages/Docs.module.css';

function Code(props) {
  return (
    <pre className={styles.code}>
      <code className="language-javascript">
        {props.children}
      </code>
    </pre>
  );
}

function Line(props) {
  return (
    <p className={styles.line}>
      {
        props.children.split('`').map((text, i) =>
          <span key={i}>
            {i % 2 ? <code className="language-javascript">{text}</code> : <>{text}</>}
          </span>
        )
      }
    </p>
  );
}

export default function Docs() {
  // initialize highlightjs on start
  useEffect(() => {
    // highlight blocks
    hljs.registerLanguage('javascript', javascript);
    hljs.highlightAll();
    // highlight lines
    document.querySelectorAll(`.${styles.line} > span > code`).forEach(el =>
      hljs.highlightElement(el)
    );
  }, []);

  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h1>Docs</h1>
        <p>These docs provide an overview of the Codetrain engine functionality.</p>
        <h2>Game Loop</h2>
        <Line>The `GameObject` class has two built-in functions, `start` and `update`. The `constructor` function can also be used.</Line>
        <Line>`constructor(index)` runs before the object is constructed. `super(index)` must be called.</Line>
        <Line>`start()` runs after all objects are constructed.</Line>
        <Line>`update()` runs once a frame after all objects are constructed.</Line>
        <Code>
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
        </Code>
        <h2>Output</h2>
        <Line>Text can be added and removed with `addText` and `removeText`.</Line>
        <Line>`addText(text, x, y, options?)` creates and returns text at `x`, `y` in pixels.</Line>
        <Line>`options` is an optional object containing `size`, `color`, and `id` fields.</Line>
        <Line>`removeText(id)` removes text with given `id`.</Line>
        <Code>
{`// create score text
addText('Score: 0', 0, 0, 'score');

// update score text
addText('Score: 1', 0, 0, 'score');

// remove score text
removeText('score');`}
        </Code>
        <h2>Input</h2>
        <Line>Keyboard input can be taken with `isKeyDown` and `isKey`.</Line>
        <Line>`isKeyDown(key)` returns whether given `key` is down.</Line>
        <Line>`isKey(key)` returns whether given `key` was pressed in the last frame.</Line>
        <Code>
{`update() {
  // triggers when q pressed down
  if (isKey('q')) console.log('Q pressed');

  // triggers while q pressed down
  if (isKeyDown('q')) console.log('Q down');
}`}
        </Code>
        <h2>Movement</h2>
        <Line>Objects can be moved with `move`, `moveTiles`, and `movePixels`.</Line>
        <Line>`move(dir)` moves object one tile up, down, left, or right.</Line>
        <Line>`moveTiles(x, y)` moves object by `x`, `y` in tiles.</Line>
        <Line>`movePixels(x, y)` moves object by `x`, `y` in pixels.</Line>
        <Code>
{`// tiled object movement
function update() {
  if (isKey('w')) move('up');
  if (isKey('a')) move('left');
  if (isKey('s')) move('down');
  if (isKey('d')) move('right');
}

// smooth object movement
function update() {
  if (isKeyDown('w')) movePixels(0, -1);
  if (isKeyDown('a')) movePixels(-1, 0);
  if (isKeyDown('s')) movePixels(0, 1);
  if (isKeyDown('d')) movePixels(1, 0);
}`}
        </Code>
        <h2>Audio</h2>
        <Line>Sounds can be added and played with `addSound` and `playSound`.</Line>
        <Line>`addSound(name, url)` registers sound with source `url` and given `name`.</Line>
        <Line>`playSound(name)` plays sound with given `name`.</Line>
        <Code>
{`// add powerup sound
addSound('powerup', 'https://codetrain.org/sounds/powerup.mp3');

// play powerup sound
playSound('powerup');`}
        </Code>
      </div>
    </div>
  );
}
