import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export default function useAccountIds(): string[] | undefined {
  const {
    client: { included },
  } = useSelector<RootState, RootState>((state) => state);

  if (!included) return undefined;

  return included.map(({ id }) => id);
}
