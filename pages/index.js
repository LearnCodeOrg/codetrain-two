import Logo from '../components/Logo';
import Header from '../components/Header';
import GitHubIcon from '@mui/icons-material/GitHub';

import { getAuth, signOut } from 'firebase/auth';
import signIn from '../util/signIn';

import styles from '../styles/pages/Index.module.css';

export default function Index(props) {
  const { setupUser } = props;

  const auth = getAuth();

  return (
    <div className={styles.container}>
      <Header {...props} />
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
              onClick={() => signIn(setupUser)}
            >
              Sign In
            </button>
          }
        </div>
      </div>
      <div className={styles.footer}>
        <p>
          &copy;{' '}
          <a href="https://codeconvoy.org">CodeConvoy</a>
          {' ' + new Date().getFullYear()}
        </p>
      </div>
      <a
        className={styles.badge}
        href="https://github.com/codeconvoy/codetrain-two"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon fontSize="large" />
      </a>
    </div>
  );
}
