import { useSelector } from 'react-redux';
import { RootState } from '../../store';

type SliceName = keyof RootState;

const useStateIsAvailable = (sliceNames: SliceName | SliceName[]): boolean => {
  const state = useSelector((s: RootState) => s);

  const sliceNamesArray = Array.isArray(sliceNames) ? sliceNames : [sliceNames];

  return sliceNamesArray.every((sliceName) => {
    const slice = state[sliceName];
    return slice.status === 'success';
  });
};

export default useStateIsAvailable;
