import Link from 'next/link';

import styles from './preview-button.module.scss';

export function PreviewButton(): JSX.Element {
  return (
    <aside className={styles.preview}>
      <Link href="/api/exit-preview">
        <a>Sair do modo Preview</a>
      </Link>
    </aside>
  );
}
