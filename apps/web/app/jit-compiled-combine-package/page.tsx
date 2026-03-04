import { sum } from '@my-workspace/utils-jit-compiled-combine';
import styles from '../page.module.css';

export default function Page() {
  const result = sum(10, 11);
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Just-in-Time and Compiled Package Combination</h1>
        <p>
          In this monorepo setup, the{' '}
          <code>@my-workspace/utils-jit-compiled-combine</code> package uses conditional
          exports to serve different entry points depending on the environment. In
          development mode, the consumer app compiles the package just-in-time directly
          from its TypeScript source (<code>src/index.ts</code>) — no build step required.
          When building for production, the package is pre-compiled to JavaScript and the
          consumer app uses the compiled output (<code>dist/index.js</code>) instead.
        </p>
        <p>
          This is enabled by the <code>{'customConditions: ["development"]'}</code>{' '}
          setting in the consumer app{"'"}s <code>tsconfig.json</code>, which tells the
          TypeScript resolver to prefer the <code>{'"development"'}</code> export
          condition during dev mode.
        </p>
        <p>
          <strong>sum(10, 11)</strong> = {result}
        </p>
      </main>
    </div>
  );
}
