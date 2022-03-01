import Header from '../../components/Header';
import Engine from '../../components/Engine';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import styles from '../../styles/pages/Project.module.css';

export default function Project() {
  const [data, setData] = useState(undefined);

  const db = getFirestore();

  // get project id
  const router = useRouter();
  const { id } = router.query;

  // gets project data from firebase
  async function getProjectData() {
    setData(undefined);
    const projectRef = doc(db, 'projects-two', id);
    const projectDoc = await getDoc(projectRef);
    setData(projectDoc.exists ? { id, ...projectDoc.data() } : null);
  }

  // get project data on start
  useEffect(() => {
    if (id) getProjectData();
  }, [id]);

  // return if loading
  if (data === undefined) return <p>Loading...</p>;
  if (!data) return <p>Project not found</p>;

  return (
    <div>
      <Header />
      <Engine {...data} />
    </div>
  );
}
