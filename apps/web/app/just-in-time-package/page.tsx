import { sum } from '@my-workspace/utils-jit';
import styles from '../page.module.css';

export default function Page() {
  const result = sum(10, 11);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Just-in-Time Package</h1>
        <p>
          In this monorepo setup, the <code>@my-workspace/utils-jit</code> package is
          consumed directly from its TypeScript source — no build step required. The
          consumer app compiles the shared package just-in-time alongside its own code.
        </p>
        <p>
          <strong>sum(10, 11)</strong> = {result}
        </p>
      </main>
    </div>
  );
}
