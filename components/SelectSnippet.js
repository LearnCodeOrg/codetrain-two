import styles from '../styles/components/SelectSnippet.module.css';
import { getFirestore, collection, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
export default function SelectSnippet(props) {
  const db = getFirestore();

  const snippetsRef = collection(db, 'snippets');
  const snippetsQuery = query(snippetsRef, where('uid', '==', currUser.id));
  const [snippets] = useCollectionData(snippetsQuery, { idField: 'id' });

  // return if loading snippets
  if (!snippets) return <p>Loading...</p>;
  if (!snippets.length) return (
    <>
      <p>No snippets yet</p>
    </>
  );

  return (
    <div>
    </div>
  );
}
