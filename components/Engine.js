import Objects from '../components/Objects';
import Loading from '../components/Loading';

import dynamic from 'next/dynamic';

const CodeEditor = dynamic(import('../components/CodeEditor'), {
  loading: function Load() { return <Loading /> }, ssr: false
});

import styles from '../styles/components/Engine.module.css';

export default function Engine() {
  return (
    <div>
      <CodeEditor />
      <Objects />
    </div>
  );
}
