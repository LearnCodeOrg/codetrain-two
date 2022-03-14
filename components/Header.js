import Logo from './Logo';
import Link from 'next/link';
import Tooltip from './Tooltip';
import HelpIcon from '@mui/icons-material/Help';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { getAuth, signOut } from 'firebase/auth';
import signIn from '../util/signIn';

import styles from '../styles/components/Header.module.css';

export default function Header(props) {
  const { currUser, setupUser } = props;

  const auth = getAuth();

  return (
    <div className={styles.container}>
      <Logo />
      <h1>Codetrain</h1>
      <span className="flexfill" />
      <Link href="/">
        <a className={styles.link}>Home</a>
      </Link>
      <Link href="/create">
        <a className={styles.link}>Create</a>
      </Link>
      <Link href="/projects">
        <a className={styles.link}>Projects</a>
      </Link>
      <Link href="/docs">
        <a className={styles.link}>Docs</a>
      </Link>
      <Link href="/sandbox">
        <a className={styles.link}>Sandbox</a>
      </Link>
      {
        currUser === null &&
        <Tooltip title="Setup">
          <button onClick={setupUser}>
            <HelpIcon fontSize="large" />
          </button>
        </Tooltip>
      }
      {
        (currUser || currUser === null) ?
        <Tooltip title="Sign Out">
          <button onClick={() => signOut(auth)}>
            <ArrowCircleRightIcon fontSize="large" />
          </button>
        </Tooltip> :
        <Tooltip title="Sign In">
          <button onClick={() => signIn(setupUser)}>
            <AccountCircleIcon fontSize="large" />
          </button>
        </Tooltip>
      }
    </div>
  );
}
