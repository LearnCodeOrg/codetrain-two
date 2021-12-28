import Head from 'next/head';

import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { firebaseConfig } from '../util/firebaseConfig';
import { useAuthState } from 'react-firebase-hooks/auth';

import '../styles/globals.css';

// initialize firebase
if (!getApps().length) initializeApp(firebaseConfig);

export default function App(props) {
  const { Component, pageProps } = props;

  // listen for auth
  const auth = getAuth()
  useAuthState(auth);

  return (
    <>
      <Head>
        <title>Codetrain</title>
        <meta name="description" content="A retro game engine in the browser." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
