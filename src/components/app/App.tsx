import { useEffect, useRef } from 'react';
import {
  getMatches,
  isErrorSelector,
  isLoadingSelector
} from '../../slices/matchesSlice';
import { AppDispatch } from '../../services/store';
import { useDispatch, useSelector } from 'react-redux';
import { ContentSection } from '../content-section';
import { ErrorPage } from '../error-page';
import styles from './app.module.css';
import { Preloader } from '../preloader';
import { AppHeader } from '../app-header';
import clsx from 'clsx';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoad = useSelector(isLoadingSelector);
  const isError = useSelector(isErrorSelector);
  const ref = useRef(false);

  useEffect(() => {
    if (ref.current) dispatch(getMatches());
    ref.current = true;
  }, []);

  return (
    <>
      <div className={clsx(styles.main)}>
        <AppHeader />
        {isLoad ? <Preloader /> : isError ? <ErrorPage /> : <ContentSection />}
      </div>
    </>
  );
};

export default App;
