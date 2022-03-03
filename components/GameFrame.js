import { useEffect, useRef, useState } from 'react';
import getGameSrc from '../util/getGameSrc';

import styles from '../styles/components/GameFrame.module.css';

export default function GameFrame(props) {
  const { refresh, setRefresh, mapPixels } = props;

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

  // clear source on refresh
  useEffect(() => {
    if (refresh) {
      setRefresh(false);
      setSource(null);
    }
  }, [refresh]);

  // focus frame on start
  useEffect(() => {
    focus();
  }, []);

  return (
    <iframe
      className={styles.frame}
      ref={screenRef}
      title="game"
      sandbox="allow-scripts"
      srcDoc={source}
      width={mapPixels}
      height={mapPixels}
      frameBorder="0"
    />
  );
}
