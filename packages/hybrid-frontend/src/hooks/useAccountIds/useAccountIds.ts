import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { ClientAccountTypes } from '../../services/types';

export default function useAccountIds(): string[] | undefined {
  const {
    client: { included },
  } = useSelector<RootState, RootState>((state) => state);

  if (!included) return undefined;

  const filteredAccounts = included.filter(
    ({ type }) => type === ClientAccountTypes.accounts || type === ClientAccountTypes.linkedAccounts
  );

  return filteredAccounts.map(({ id }) => id);
}
