import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <Link href="/just-in-time-package">
            <h3>Visit Just-in-Time Package Page</h3>
          </Link>
          |
          <Link href="/compiled-package">
            <h3>Visit Compiled Package Page</h3>
          </Link>
          |
          <Link href="/publishable-package">
            <h3>Visit Publishable Package Page</h3>
          </Link>
          |
        </div>
      </main>
    </div>
  );
}
