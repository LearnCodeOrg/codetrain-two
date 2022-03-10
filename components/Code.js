import Loading from './Loading';

import dynamic from 'next/dynamic';

const CodeEditor = dynamic(import('../components/CodeEditor'), {
  loading: function Load() { return <Loading /> }, ssr: false
});

export default function Code(props) {
  return <CodeEditor {...props} />;
}
