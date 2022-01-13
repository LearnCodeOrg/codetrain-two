import { useEffect, useRef, useState } from 'react';

export default function GameFrame() {
  const screenRef = useRef();

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
