import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type SliceName = keyof RootState;

const useStateIsAvailable = (sliceNames: SliceName[]): boolean => {
  const state = useSelector((s: RootState) => s);

  const hasUnsuccessfullStatuses = sliceNames.some((sliceName) => {
    const slice = state[sliceName];
    return slice.status !== 'success';
  });

  return !hasUnsuccessfullStatuses;
};

export default useStateIsAvailable;
