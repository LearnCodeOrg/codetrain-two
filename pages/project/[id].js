import { useRouter } from 'next/router';
import styles from '../../styles/pages/Project.module.css';

export default function Project() {

  // get project id
  const router = useRouter();
  const { id } = router.query;

  // get project data on start
  useEffect(() => {
    if (id) getProjectData();
  }, [id]);

  return (
    <div>
    </div>
  );
}
