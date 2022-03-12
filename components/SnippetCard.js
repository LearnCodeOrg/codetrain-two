import Link from 'next/link';

import styles from '../styles/components/SnippetCard.module.css';

export default function SnippetCard(props) {
  const { snippet } = props;

  return (
    <div className={styles.container}>
      <Link href={`/snippet/${snippet.id}`}>
        <a>
          <p>{snippet.title}</p>
        </a>
      </Link>
    </div>
  );
}
