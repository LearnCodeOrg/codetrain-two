import { getAuth, signOut } from 'firebase/auth';
import signInWithGoogle from '../util/signInWithGoogle';

import styles from '../styles/pages/Index.module.css';

export default function Index() {
  const auth = getAuth();

  return (
    <div>
      {
        auth.currentUser ?
        <button onClick={() => signOut(auth)}>
          Sign Out
        </button> :
        <button onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      }
    </div>
  );
}
