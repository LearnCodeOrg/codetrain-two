import styles from '../styles/pages/Snippets.module.css';

export default function Snippets() {
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
  }

  return (
    <div>
    </div>
  );
}
