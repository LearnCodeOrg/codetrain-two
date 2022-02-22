import Header from '../components/Header';

import { getAuth } from 'firebase/auth';
import styles from '../styles/pages/Projects.module.css';

export default function Projects() {
  const auth = getAuth();

  function ProjectsListener() {
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
