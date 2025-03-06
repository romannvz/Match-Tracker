import { FC } from 'react';
import {
  getMatches,
  isLoadingSelector,
  isErrorSelector
} from '../../slices/matchesSlice';
import { AppDispatch, useSelector } from '../../services/store';
import { useDispatch } from 'react-redux';
import styles from './app-header.module.css';
import MT from '../../images/match-tracker.svg';
import alert from '../../images/alert-triangle.svg';
import refresh from '../../images/refresh.svg';
import clsx from 'clsx';

export const AppHeader: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isError = useSelector(isErrorSelector);
  const isLoading = useSelector(isLoadingSelector);

  return (
    <>
      <header className={clsx(styles.section)}>
        <img src={MT} />
        <div className={clsx(styles.panel)}>
          <div
            className={clsx(styles.panel__error, {
              [styles.panel__error_active]: isError
            })}
          >
            <img src={alert} />
            <span className={clsx(styles.error_text)}>
              Ошибка: не удалось загрузить информацию
            </span>
          </div>
          <button
            disabled={isLoading}
            className={clsx(styles.panel__button, styles.text)}
            onClick={() => dispatch(getMatches())}
          >
            Обновить
            <img src={refresh} />
          </button>
        </div>
      </header>
    </>
  );
};
