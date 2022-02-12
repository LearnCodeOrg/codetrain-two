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
  </style>
  <script>
    class GameObject {
      start() {}
      update() {}
    }
    const $$ = {
      ctx: __canvas__.getContext('2d'),
      spriteSquares: ${spriteSquares},
      squarePixels: ${squarePixels},
      colors: ${JSON.stringify(colors)},
      codes: ${JSON.stringify(codes)},
      objects: ${JSON.stringify(objects)},
      gameObjects: ${JSON.stringify(gameObjects)},
      onError: ${onError},
      getCodeFunction: (gameObject, index) => {
        return eval($$.codes[gameObject.object]);
      },
      throwError: e => {
        $$.onError(e);
      }
    };
    function __start__() {
      // draws given object at given position
      function drawObject(object, squareX, squareY) {
        // for each squaree
        for (let x = 0; x < $$.spriteSquares; x++) {
          for (let y = 0; y < $$.spriteSquares; y++) {
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
      function gameLoop(time) {
        try {
          $$.spriteCodes.forEach(code => code.update());
        } catch (e) {
          $$.throwError(e);
        }
        // draw canvas
        draw();
        requestAnimationFrame(gameLoop);
      }
      try {
        $$.spriteCodes = $$.gameObjects.map((gameObject, index) =>
          $$.getCodeFunction(gameObject, index)
        );
        $$.spriteCodes.forEach(code => code.start());
        requestAnimationFrame(gameLoop);
      } catch (e) {
        $$.throwError(e);
      }
    }
  </script>
</html>
`
  );
}
