import { mapSprites, spriteSquares } from './units';

const mapPixels = 256;
const spritePixels = Math.round(mapPixels / mapSprites);
const squarePixels = Math.round(spritePixels / spriteSquares);

export default function getGameSrc(props) {
  const { colors, codes, objects, gameObjects, onError } = props;

  return (
`<html>
  <body onload="__start__()">
    <canvas
      id="__canvas__"
      width=${mapPixels}
      height=${mapPixels}
    />
  </body>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: #fff;
    }
    .error {
      margin: 10px;
      position: absolute;
      top: 0;
      color: red;
      font-size: 12px;
      font-family:
        'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', monospace;
    }
  </style>
  <script>
    class GameObject {
      constructor(index) {
        this.index = index;
      }
      start() {}
      update() {}
      move(dir) {
        if (dir === 'up') $$.gameObjects[this.index].y -= $$.spriteSquares;
        else if (dir === 'down') $$.gameObjects[this.index].y += $$.spriteSquares;
        else if (dir === 'left') $$.gameObjects[this.index].x -= $$.spriteSquares;
        else if (dir === 'right') $$.gameObjects[this.index].x += $$.spriteSquares;
      }
      moveTiles(x, y) {
        $$.gameObjects[this.index].x += x * $$.spriteSquares;
        $$.gameObjects[this.index].y += y * $$.spriteSquares;
      }
      movePixels(x, y) {
        $$.gameObjects[this.index].x += x;
        $$.gameObjects[this.index].y += y;
      }
    }
    const $$ = {
      ctx: __canvas__.getContext('2d'),
      spriteSquares: ${spriteSquares},
      squarePixels: ${squarePixels},
      colors: ${JSON.stringify(colors)},
      codes: ${JSON.stringify(codes)},
      objects: ${JSON.stringify(objects)},
      gameObjects: ${JSON.stringify(gameObjects)},
      objectCodes: [],
      onError: (error, i) => {
        // get error line and column
        const errorLine = error.stack.split('\\n')[1];
        const anonymousIndex = errorLine.indexOf('<anonymous>') + 11;
        const position = errorLine.slice(anonymousIndex + 1, -1).split(':');
        const lineNumber = parseInt(position[0]) - 2;
        const colNumber = parseInt(position[1]);
        // create error text
        const p = document.createElement('p');
        p.className = 'error';
        p.innerText = \`Object \${i} (line \${lineNumber} col \${colNumber}):\\n\${error.stack.split("\\n")[0]}\\n\`;
        document.body.appendChild(p);
      },
      lastPressedKeys: {},
      pressedKeys: {},
      getCodeFunction: (gameObject, index) => {
        return new (new Function($$.codes[gameObject.object])())(index);
      }
    };
    // listen for key down
    window.addEventListener('keydown', e => {
      const keyName = e.key.toLowerCase();
      $$.pressedKeys[keyName] = true;
    });
    // listen for key up
    window.addEventListener('keyup', e => {
      const keyName = e.key.toLowerCase();
      $$.pressedKeys[keyName] = false;
    });
    // returns whether given key down
    function isKeyDown(key) {
      // handle invalid key
      if (typeof key !== 'string' || !key.length) {
        throw new TypeError(\`Invalid key \${key}\`);
      }
      // handle key name
      const keyName = key.toLowerCase();
      return $$.pressedKeys[keyName];
    }
    // returns whether given key pressed
    function isKey(key) {
      // handle invalid key
      if (typeof key !== 'string' || !key.length) {
        throw new TypeError(\`Invalid key \${key}\`);
      }
      // handle key name
      const keyName = key.toLowerCase();
      return $$.pressedKeys[keyName] && !$$.lastPressedKeys[keyName];
    }
    function __start__() {
      // draws given object at given position
      function drawObject(object, squareX, squareY) {
        // for each square
        for (let x = 0; x < $$.spriteSquares; x++) {
          for (let y = 0; y < $$.spriteSquares; y++) {
            // set fill color
            const squareIndex = y * $$.spriteSquares + x;
            const colorIndex = object[squareIndex];
            if (colorIndex === -1) continue;
            const color = $$.colors[colorIndex];
            $$.ctx.fillStyle = color;
            // get pixel position
            let pixelX = (squareX * $$.squarePixels) + (x * $$.squarePixels);
            let pixelY = (squareY * $$.squarePixels) + (y * $$.squarePixels);
            // fill square
            $$.ctx.fillRect(pixelX, pixelY, $$.squarePixels, $$.squarePixels);
          }
        }
      }
      // draws canvas
      function draw() {
        // for each object
        for (const gameObject of $$.gameObjects) {
          // draw object
          const { x, y } = gameObject;
          const object = $$.objects[gameObject.object];
          drawObject(object, x, y);
        }
      }
      // runs game loop
      function gameLoop(time) {
        // run update
        for (let i = 0; i < $$.objectCodes.length; i++) {
          const code = $$.objectCodes[i];
          try {
            code.update();
          } catch (e) {
            // throw error with object
            const object = $$.gameObjects[i].object;
            $$.onError(e, object);
            return;
          }
        }
        // draw canvas
        draw();
        // update keys
        $$.lastPressedKeys = Object.assign({}, $$.pressedKeys);
        // continue loop
        requestAnimationFrame(gameLoop);
      }
      // construct code functions
      for (let i = 0; i < $$.gameObjects.length; i++) {
        const gameObject = $$.gameObjects[i];
        try {
          const code = $$.getCodeFunction(gameObject, i);
          $$.objectCodes.push(code);
        } catch(e) {
          // throw error with object
          const object = gameObject.object;
          $$.onError(e, object);
          return;
        }
      }
      // run start functions
      for (let i = 0; i < $$.objectCodes.length; i++) {
        const code = $$.objectCodes[i];
        try {
          code.start();
        } catch(e) {
          // throw error with object
          const object = $$.gameObjects[i].object;
          $$.onError(e, object);
          return;
        }
      }
      // start loop
      requestAnimationFrame(gameLoop);
    }
  </script>
</html>
`
  );
}
