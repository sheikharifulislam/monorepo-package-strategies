import { sum } from '@my-workspace/utils-compiled';
import styles from '../page.module.css';

export default function Page() {
  const result = sum(10, 11);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Compiled Package</h1>
        <p>
          In this monorepo setup, the <code>@my-workspace/utils-compiled</code> package is
          pre-compiled to JavaScript before the consumer app runs. Because the package
          ships its compiled output (<code>dist/index.js</code>), the consumer app does
          not need to transpile the package source code itself.
        </p>
        <p>
          <strong>sum(10, 11)</strong> = {result}
        </p>
      </main>
    </div>
  );
}
