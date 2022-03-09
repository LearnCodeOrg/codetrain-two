import Main from '../components/Main';
import Head from 'next/head';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useState } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../util/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

import '../styles/globals.css';

// initialize firebase
if (!getApps().length) initializeApp(firebaseConfig);

export default function App(props) {
  // listen for auth
  const auth = getAuth()
  useAuthState(auth);

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Head>
        <title>Codetrain</title>
        <meta name="description" content="A retro game engine in the browser." />
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
      </Head>
      <Main {...props} />
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogContent>
        </DialogContent>
      </Dialog>
    </>
  );
}
