import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

export default function useGoals() {
  const { data } = useSelector((state: RootState) => state.goals);

  return data;
}
