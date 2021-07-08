import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type SliceName = keyof RootState;

const useStateIsLoading = (sliceNames: SliceName | SliceName[]): boolean => {
  const state = useSelector((s: RootState) => s);

  const sliceNamesArray = Array.isArray(sliceNames) ? sliceNames : [sliceNames];

  const hasLoadingStatuses = sliceNamesArray.some((sliceName) => {
    const slice = state[sliceName];
    return slice.status === 'loading';
  });

  return hasLoadingStatuses;
};

export default useStateIsLoading;
