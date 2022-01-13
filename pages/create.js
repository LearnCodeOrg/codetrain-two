import Header from '../components/Header';
import Objects from '../components/Objects';
import Loading from '../components/Loading';

import dynamic from 'next/dynamic';

import styles from '../styles/pages/Create.module.css';

const CodeEditor = dynamic(import('../components/CodeEditor'), {
  loading: function Load() { return <Loading /> }, ssr: false
});

export default function Create() {
  return (
    <div>
      <Header />
      <CodeEditor />
      <Objects />
    </div>
  );
}
