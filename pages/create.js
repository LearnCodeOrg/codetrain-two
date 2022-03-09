import Header from '../components/Header';
import Engine from '../components/Engine';

import styles from '../styles/pages/Create.module.css';

export default function Create(props) {
  return (
    <div>
      <Header {...props} />
      <Engine {...props} />
    </div>
  );
}
