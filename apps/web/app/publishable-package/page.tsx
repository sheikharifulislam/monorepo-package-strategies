import { sum } from '@my-workspace/utils-publishable';
import styles from '../page.module.css';

export default function Page() {
  const result = sum(10, 11);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Publishable Package</h1>
        <p>
          In this monorepo setup, the <code>@my-workspace/utils-publishable</code> package
          is pre-compiled to JavaScript before the consumer app runs. Because the package
          ships its compiled output (<code>dist/index.js</code>), the consumer app does
          not need to transpile the package source code itself. publishable package and
          compiled package are almost same, for the publishable package just need some
          extra configuration to make it publishable to package registry like npm.
        </p>
        <p>
          <strong>sum(10, 11)</strong> = {result}
        </p>
      </main>
    </div>
  );
}
