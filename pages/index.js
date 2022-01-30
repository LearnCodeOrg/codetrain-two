import Logo from '../components/Logo';
import Header from '../components/Header';

import { getAuth, signOut } from 'firebase/auth';
import signInWithGoogle from '../util/signInWithGoogle';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  const auth = getAuth();

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.page}>
        <div className={styles.center}>
          <div className={styles.title}>
            <Logo />
            <h1>Codetrain</h1>
          </div>
          {
            auth.currentUser ?
            <button
              className="textbutton"
              onClick={() => signOut(auth)}
            >
              Sign Out
            </button> :
            <button
              className="textbutton"
              onClick={signInWithGoogle}
            >
              Sign In
            </button>
          }
        </div>
      </div>
    </div>
  );
}
