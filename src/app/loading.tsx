import styles from './loading.module.scss';

export default function RootLoading() {
  return (
    <div className={styles.loader}>
      <div className={styles.spinner} />
    </div>
  );
}
