import MainAuthed from './MainAuthed';

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';

import styles from '../styles/components/Main.module.css';

export default function Main(props) {
  const { Component, pageProps, setupUser } = props;

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
    <MainAuthed
      setupUser={setupUser}
      {...props}
    /> :
    <Component
      setupUser={setupUser}
      currUser={authed}
      {...pageProps}
    />
  );
}
