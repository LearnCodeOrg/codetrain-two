import Header from '../components/Header';
import SandboxEngine from '../components/SandboxEngine';

import styles from '../styles/pages/Sandbox.module.css';

export default function Sandbox(props) {
  return (
    <div>
      <Header {...props} />
      <SandboxEngine {...props} />
    </div>
  );
}
