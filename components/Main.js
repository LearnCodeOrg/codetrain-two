import { getAuth } from 'firebase/auth';

import styles from '../styles/components/Main.module.css';

export default function Main(props) {
  const { Component, pageProps } = props;

  const auth = getAuth();

  // listen for user auth
  useEffect(() => {
    const authListener = auth.onAuthStateChanged(() => {
      setAuthed(!!auth.currentUser);
    });
    return () => authListener();
  }, []);

  return (
    <Component {...pageProps} />
  );
}
