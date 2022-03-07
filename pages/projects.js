import ProjectCard from '../components/ProjectCard';
import Header from '../components/Header';
import Link from 'next/link';

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

    // return if loading projects
    if (!projects) return <p>Loading...</p>;
    if (!projects.length) return (
      <>
        <p>No projects yet</p>
        <Link href="/create">
          <a>Create a project</a>
        </Link>
      </>
    );

    return (
      <div className={styles.projects}>
        {
          projects.map(project =>
            <ProjectCard
              project={project}
              key={project.id}
            />
          )
        }
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className={styles.content}>
        {
          auth.currentUser ?
          <ProjectsListener /> :
          <p>Sign in to view projects</p>
        }
      </div>
    </div>
  );
}
