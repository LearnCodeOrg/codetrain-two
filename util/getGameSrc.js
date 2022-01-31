const mapPixels = 256;

export default function getGameSrc(props) {
  const { codes, gameObjects } = props;

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
    const $$ = {
      ctx: __canvas__.getContext('2d'),
      codes: ${JSON.stringify(codes)},
      gameObjects = ${JSON.stringify(gameObjects)},
      throwError: e => {
        console.log(e);
      }
    };
    function __start__() {
      function gameLoop(time) {
        try {
          $$.spriteCodes.forEach(code => code.update());
        } catch (e) {
          throwError(e);
        }
        requestAnimationFrame(gameLoop);
      }
      try {
        requestAnimationFrame(gameLoop);
      } catch (e) {
        throwError(e);
      }
    }
  </script>
</html>
`
  );
}
