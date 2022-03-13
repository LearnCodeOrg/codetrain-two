import { useRouter } from 'next/router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import styles from '../../styles/pages/Snippet.module.css';

export default function Snippet(props) {
  const [data, setData] = useState(undefined);

  const db = getFirestore();

  // get snippet id
  const router = useRouter();
  const { id } = router.query;

  // gets snippet data from firebase
  async function getSnippetData() {
    setData(undefined);
    const snippetRef = doc(db, 'snippets', id);
    const snippetDoc = await getDoc(snippetRef);
    setData(snippetDoc.exists ? { id, ...snippetDoc.data() } : null);
  }

  // get project data on start
  useEffect(() => {
    if (id) getSnippetData();
  }, [id]);

  return (
    <div>
    </div>
  );
}
