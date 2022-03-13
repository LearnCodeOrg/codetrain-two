import SnippetCard from '../components/SnippetCard';
import Header from '../components/Header';
import Link from 'next/link';

import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/pages/Snippets.module.css';

export default function Snippets(props) {
  const { currUser } = props;

  const auth = getAuth();
  const db = getFirestore();

  function SnippetsListener() {
    const uid = auth.currentUser.uid;
    const snippetsRef = collection(db, 'snippets');
    const snippetsQuery = query(snippetsRef, where('uid', '==', uid));
    const [snippets] = useCollectionData(snippetsQuery, { idField: 'id' });

    // return if loading snippets
    if (!snippets) return <p>Loading...</p>;
    if (!snippets.length) return (
      <>
        <p>No snippets yet</p>
        <Link href="/create">
          <a>Create a snippet</a>
        </Link>
      </>
    );

    return (
      <div className={styles.snippets}>
        {
          snippets.map(snippet =>
            <SnippetCard
              snippet={snippet}
              key={snippet.id}
            />
          )
        }
      </div>
    );
  }

  return (
    <div>
      <Header {...props} />
      <div className={styles.content}>
        {
          currUser === undefined ?
          <p>Loading...</p> :
          (currUser || currUser === null) ?
          <SnippetsListener /> :
          <p>Sign in to view snippets</p>
        }
      </div>
    </div>
  );
}
