import Header from '../components/Header';
import CodeLine from '../components/CodeLine';

import { useEffect } from 'react';
import highlightJs from '../util/highlightJs';

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

export default function Docs(props) {
  // highlight js on start
  useEffect(() => {
    highlightJs();
  }, []);

  return (
    <div>
      <Header {...props} />
      <div className={styles.content}>
        <h1>Docs</h1>
        <p>These docs provide an overview of the Codetrain engine functionality.</p>
        <h2>Game Loop</h2>
        <CodeLine>The `GameObject` class has two built-in functions, `start` and `update`. The `constructor` function can also be used.</CodeLine>
        <CodeLine>`constructor(index)` runs before the object is constructed. `super(index)` must be called.</CodeLine>
        <CodeLine>`start()` runs after all objects are constructed.</CodeLine>
        <CodeLine>`update()` runs once a frame after all objects are constructed.</CodeLine>
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
        <CodeLine>Text can be added and removed with `addText` and `removeText`.</CodeLine>
        <CodeLine>`addText(text, x, y, options?)` creates and returns text at `x`, `y` in pixels.</CodeLine>
        <CodeLine>`options` is an optional object containing `size`, `color`, and `id` fields.</CodeLine>
        <CodeLine>`removeText(id)` removes text with given `id`.</CodeLine>
        <Code>
{`// create score text
addText('Score: 0', 0, 0, 'score');

// update score text
addText('Score: 1', 0, 0, 'score');

// remove score text
removeText('score');`}
        </Code>
        <h2>Input</h2>
        <CodeLine>Keyboard input can be taken with `isKeyDown` and `isKey`.</CodeLine>
        <CodeLine>`isKeyDown(key)` returns whether given `key` is down.</CodeLine>
        <CodeLine>`isKey(key)` returns whether given `key` was pressed in the last frame.</CodeLine>
        <Code>
{`update() {
  // triggers when q pressed down
  if (isKey('q')) console.log('Q pressed');

  // triggers while q pressed down
  if (isKeyDown('q')) console.log('Q down');
}`}
        </Code>
        <h2>Movement</h2>
        <CodeLine>Objects can be moved with `move`, `moveTiles`, and `movePixels`.</CodeLine>
        <CodeLine>`move(dir)` moves object one tile up, down, left, or right.</CodeLine>
        <CodeLine>`moveTiles(x, y)` moves object by `x`, `y` in tiles.</CodeLine>
        <CodeLine>`movePixels(x, y)` moves object by `x`, `y` in pixels.</CodeLine>
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
        <CodeLine>Sounds can be added and played with `addSound` and `playSound`.</CodeLine>
        <CodeLine>`addSound(name, url)` registers sound with source `url` and given `name`.</CodeLine>
        <CodeLine>`playSound(name)` plays sound with given `name`.</CodeLine>
        <Code>
{`// add powerup sound
addSound('powerup', 'https://codetrain.org/sounds/powerup.mp3');

// play powerup sound
playSound('powerup');`}
        </Code>
        <h1>Objects</h1>
        <CodeLine>Objects can be retrieved with `getObject`.</CodeLine>
        <CodeLine>`getObject(id)` returns the first reference of an object with given `id`.</CodeLine>
        <CodeLine>Objects can be created and deleted with `createObject` and `deleteObject`.</CodeLine>
        <Code>
{`// get object with ID 'player'
const player = getObject('player');

// move player right
player.move('right');`}
        </Code>
        <CodeLine>`createObject(object, x, y)` creates `object` at `x`, `y`.</CodeLine>
        <CodeLine>`deleteObject(id)` deletes object with given `id`.</CodeLine>
        <Code>
{`// create player
const player = createObject('player', 0, 0);

// delete player
deleteObject(player.id);`}
        </Code>
        <h1>Tiles</h1>
        <CodeLine>Tiles can be retrieved with `getTile` and `GameObject.getTile`.</CodeLine>
        <CodeLine>`getTile(x, y)` returns tile at `x`, `y`.</CodeLine>
        <CodeLine>`GameObject.getTile()` returns tile at current position.</CodeLine>
        <Code>
        <CodeLine>Tiles can be modified with `setTile` and `GameObject.setTile`.</CodeLine>
        <CodeLine>`setTile(x, y, tile)` sets tile at `x`, `y` to `tile`.</CodeLine>
        <CodeLine>`GameObject.setTile(tile)` sets tile at current position to `tile`.</CodeLine>
      </div>
    </div>
  );
}
