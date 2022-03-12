import styles from '../styles/components/CodeLine.module.css';

export default function CodeLine(props) {
  return (
    <p className={styles.line}>
      {
        props.children.split('`').map((text, i) =>
          <span key={i}>
            {
              i % 2 ?
              <code className="language-javascript">{text}</code> :
              <>{text}</>
            }
          </span>
        )
      }
    </p>
  );
}
