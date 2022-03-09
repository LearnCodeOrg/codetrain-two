import { getAuth } from 'firebase/auth';
import { getFirestore, doc } from 'firebase/firestore';
import { useDocument } from 'react-firebase-hooks/firestore';

import styles from '../styles/components/MainAuthed.module.css';

export default function MainAuthed(props) {
  const { Component, pageProps, setupUser } = props;

  const auth = getAuth();
  const db = getFirestore();

  const uid = auth.currentUser?.uid;
  const userRef = doc(db, 'users', uid);
  const [userDoc] = useDocument(userRef);

  const currUser = !userDoc ? undefined :
  !userDoc.exists() ? null : userDoc.data();

  return (
    <Component
      setupUser={setupUser}
      currUser={currUser}
      {...pageProps}
    />
  );
}
