import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

import styles from '../styles/components/Main.module.css';

function MainAuthed(props) {
  const { Component, pageProps } = props;

  return (
    <Component
      currUser={currUser}
      {...pageProps}
    />
  );
}

export default function Main(props) {
  const { Component, pageProps } = props;

  const auth = getAuth();

  const [authed, setAuthed] = useState(undefined);

  // listen for user auth
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(() => {
      setAuthed(!!auth.currentUser);
    });
    return () => authListener();
  }, []);

  return (
    authed ?
    <MainAuthed {...pageProps} /> :
    <Component
      currUser={authed}
      {...pageProps}
    />
  );
}
