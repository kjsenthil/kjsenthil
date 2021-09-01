import { PinLoginItem } from '../../types';
import { randomIntegersInRange } from '../../../utils';

const randomPinIndices = (): PinLoginItem[] => {
  const randomIndices = randomIntegersInRange(1, 6, 3);
  return randomIndices.map<PinLoginItem>((index) => ({
    position: index,
    value: undefined,
  }));
};

export default randomPinIndices;
