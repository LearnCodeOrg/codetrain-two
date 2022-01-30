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
          <h1>
            <Logo />
            <span>Codetrain</span>
          </h1>
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
