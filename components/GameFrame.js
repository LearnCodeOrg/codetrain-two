import ReplayIcon from '@mui/icons-material/Replay';

import { useEffect, useRef, useState } from 'react';
import getGameSrc from '../util/getGameSrc';

const mapPixels = 256;

export default function GameFrame() {
  const screenRef = useRef();

  // focuses on screen
  function focus() {
    screenRef.current.focus();
  }

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
    </div>
  );
}
