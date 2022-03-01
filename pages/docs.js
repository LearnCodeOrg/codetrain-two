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
        <pre>
          <code>
{`update() {
  // triggers when q pressed down
  if (isKey('q')) console.log('Q pressed');

  // triggers while q pressed down
  if (isKeyDown('q')) console.log('Q down');
}`}
          </code>
        </pre>
        <h2>Movement</h2>
        <p>Objects can be moved with move(), moveTiles(), and movePixels().</p>
        <p>move(dir) moves object one tile up, down, left, or right.</p>
        <p>moveTiles(x, y) moves object by x, y in tiles.</p>
        <p>movePixels(x, y) moves object by x, y in pixels.</p>
        <pre>
          <code>
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
          </code>
        </pre>
        <h2>Audio</h2>
        <p>Sounds can be added and played with addSound and playSound.</p>
        <p>addSound(name, url) registers sound with source url and given name.</p>
        <p>playSound(name) plays sound with given name.</p>
        <pre>
          <code>
{`// add powerup sound
addSound('powerup', 'https://codetrain.org/sounds/powerup.mp3');

// play powerup sound
playSound('powerup');`}
          </code>
        </pre>
      </div>
    </div>
  );
}
