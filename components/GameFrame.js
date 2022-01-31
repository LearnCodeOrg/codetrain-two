import { useEffect, useRef, useState } from 'react';
import getGameSrc from '../util/getGameSrc';

const mapPixels = 256;

export default function GameFrame(props) {
  const screenRef = useRef();

  // get game source
  const gameSrc = getGameSrc(props);
  const [source, setSource] = useState(gameSrc);

  // focuses on screen
  function focus() {
    screenRef.current.focus();
  }

  // reset source when cleared
  useEffect(() => {
    if (source === null) {
      setSource(gameSrc);
      focus();
    }
  }, [source]);

  // focus frame on start
  useEffect(() => {
    focus();
  }, []);

  return (
    <div>
      <iframe
        ref={screenRef}
        title="game"
        sandbox="allow-scripts"
        srcDoc={source}
        width={mapPixels}
        height={mapPixels}
        frameBorder="0"
      />
      <div>
        <button onClick={() => setSource(null)}>
          Replay
        </button>
      </div>
    </div>
  );
}
