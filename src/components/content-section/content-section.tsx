import { useSelector } from '../../services/store';
import { FC } from 'react';
import { matchesSelector } from '../../slices/matchesSlice';
import { MatchesList } from '../matches-list';

export const ContentSection: FC = () => {
  const matches = useSelector(matchesSelector);

  return (
    <main>
      <MatchesList matches={matches} />
    </main>
  );
};
