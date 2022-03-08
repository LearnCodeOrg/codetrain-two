import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/Main.module.css';

function MainAuthed(props) {
  const { Component, pageProps } = props;

  const auth = getAuth();
  const db = getFirestore();

  const uid = auth.currentUser.uid;
  const userRef = doc(db, 'users', uid);
  const [userDoc] = useDocument(userRef);

  const currUser = !userDoc ? undefined :
  !userDoc.exists ? null : userDoc.data();

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
