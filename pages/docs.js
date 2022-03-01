import Header from '../components/Header';

import styles from '../styles/pages/Docs.module.css';

export default function Docs() {
  return (
    <div>
      <Header />
      <div className={styles.content}>
        <h1>Docs</h1>
        <p>These docs provide an overview of the Codetrain engine functionality.</p>
        <h2>Game Loop</h2>
        <p>The GameObject class has two built-in functions, start() and update(). The constructor() function can also be used.</p>
        <p>constructor() runs before the object is constructed.</p>
        <p>start() runs after all objects are constructed.</p>
        <p>update() runs once a frame after all objects are constructed.</p>
        <pre>
          <code>
{`return class GameObject0 extends GameObject {
  constructor(index) {
    super(index);
    // runs before objects constructed
  }
  start() {
    // runs after all objects constructed
  }
  update() {
    // runs once every frame
  }
}`}
          </code>
        </pre>
      </div>
    </div>
  );
}
