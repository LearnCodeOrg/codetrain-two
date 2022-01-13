const mapPixels = 256;

export default function getGameSrc() {
  return (
`<html>
  <body onload="__start__()">
    <canvas
      id="$$canvas"
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
    function __start() {

    }
  </script>
</html>
`
  );
}
