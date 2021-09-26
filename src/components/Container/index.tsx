import { ReactNode } from 'react';
import styles from './container.module.scss';

interface ContainerProps {
  children: ReactNode;
}
export function Container({ children }: ContainerProps): JSX.Element {
  return <div className={styles.container}>{children}</div>;
}
