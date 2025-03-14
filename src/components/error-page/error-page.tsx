import { useSelector } from '../../services/store';
import { FC } from 'react';
import { errorSelector } from '../../slices/matchesSlice';
import styles from './error-page.module.css';
import clsx from 'clsx';

export const ErrorPage: FC = () => {
  const errorText = useSelector(errorSelector);

  return (
    <>
      <main className={clsx(styles.error_page)}>
        <p>При загрузке данных сервер вернул ошибку:</p>
        <span className={clsx(styles.error_text)}>{errorText}.</span>
        <p>
          Рекомендуем повторить попытку позднее. Приносим извинения за
          неудобства.
        </p>
      </main>
    </>
  );
};
