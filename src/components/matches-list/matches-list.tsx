import { FC } from 'react';
import { TMatchesListProps } from '../../utils/types';
import { Match } from '../match';
import styles from './matches-list.module.css';

export const MatchesList: FC<TMatchesListProps> = ({ matches }) => (
  <ul className={`${styles.matches_list}`}>
    {matches.map((item) => (
      <Match match={item} key={Math.random()} />
    ))}
  </ul>
);
