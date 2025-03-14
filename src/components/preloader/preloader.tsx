import styles from './preloader.module.css';

export const Preloader = () => (
  <div className={styles.preloader}>
    <div className={styles.preloader_circle} />
    <p>Идёт загрузка данных. Пожалуйста, подождите...</p>
  </div>
);
