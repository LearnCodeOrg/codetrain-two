import Header from '../components/Header';

import { getAuth } from 'firebase/auth';
import { getFirestore, collection, query, where } from 'firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import styles from '../styles/pages/Projects.module.css';

export default function Projects() {
  const auth = getAuth();
  const db = getFirestore();

  function ProjectsListener() {
    const uid = auth.currentUser.uid;
    const projectsRef = collection(db, 'projects-two');
    const projectsQuery = query(projectsRef, where('uid', '==', uid));
    const [projects] = useCollectionData(projectsQuery, { idField: 'id' });
  }

  return (
    <div>
      <Header />
      {
        auth.currentUser ?
        <ProjectsListener /> :
        <p>Sign in to view projects</p>
      }
    </div>
  );
}
