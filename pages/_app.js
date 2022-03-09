import Main from '../components/Main';
import Head from 'next/head';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import { useState } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../util/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';
import createUser from '../util/createUser';

import '../styles/globals.css';

// initialize firebase
if (!getApps().length) initializeApp(firebaseConfig);

export default function App(props) {
  // listen for auth
  const auth = getAuth()
  useAuthState(auth);

  const [modalOpen, setModalOpen] = useState(false);
  const [username, setUsername] = useState('');

  // sets up user
  function setupUser() {
    setUsername('');
    setModalOpen(true);
  }

  return (
    <>
      <Head>
        <title>Codetrain</title>
        <meta name="description" content="A retro game engine in the browser." />
        <link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
      </Head>
      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <DialogContent>
          <form
            onSubmit={e => {
              e.preventDefault();
              createUser(username);
              setModalOpen(false);
            }}
          >
            Setup User
            <input
              className="textinput"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="username"
              required
            />
            <button className="textbutton">
              Create
            </button>
          </form>
        </DialogContent>
      </Dialog>
      <Main
        setupUser={setupUser}
        {...props}
      />
    </>
  );
}
