import { FC, memo } from 'react';
import { TMatch } from '../../utils/types';
import styles from './match.module.css';
import logo from '../../images/illustrations-role.svg';
import clsx from 'clsx';

type MatchProps = {
  match: TMatch;
};

export const Match: FC<MatchProps> = memo(({ match }) => (
  <>
    <li className={clsx(styles.matches_list_item)}>
      <div className={clsx(styles.team_block)}>
        <img src={logo} />
        <span className={clsx(styles.team_name, styles.text)}>
          {match.homeTeam.name}
        </span>
      </div>
      <div className={clsx(styles.tab)}>
        <span className={clsx(styles.text, styles.scores)}>
          {match.homeScore} : {match.awayScore}
        </span>
        <div
          className={clsx(
            styles.card_status,
            styles[`card_status_${match.status.toLowerCase()}` || '']
          )}
        >
          <span className={clsx(styles.text, styles.match_status)}>
            {match.status}
          </span>
        </div>
      </div>
      <div className={clsx(styles.team_block)}>
        <span className={clsx(styles.team_name, styles.text)}>
          {match.awayTeam.name}
        </span>
        <img src={logo} />
      </div>
    </li>
  </>
));
