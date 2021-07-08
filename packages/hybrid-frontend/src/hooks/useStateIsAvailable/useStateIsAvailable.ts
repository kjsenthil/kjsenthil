import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type SliceName = keyof RootState;

const useStateIsAvailable = (sliceNames: SliceName | SliceName[]): boolean => {
  const state = useSelector((s: RootState) => s);

  const sliceNamesArray = Array.isArray(sliceNames) ? sliceNames : [sliceNames];

  const allStatusesSuccessful = sliceNamesArray.every((sliceName) => {
    const slice = state[sliceName];
    return slice.status === 'success';
  });

  return allStatusesSuccessful;
};

export default useStateIsAvailable;
