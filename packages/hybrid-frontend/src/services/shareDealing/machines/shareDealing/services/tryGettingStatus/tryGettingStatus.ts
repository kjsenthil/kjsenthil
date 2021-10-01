import delay from 'delay';
import { GenericResponseData } from '../../../../../api/types';
import { ApiResourceStatus } from '../../../../api/types';

export const DEFAULT_NUM_OF_ATTEMPTS = 10;
export const DEFAULT_DELAY_IN_MS = 1000;

const tryGettingStatus = async <
  T extends GenericResponseData<{ apiResourceStatus: ApiResourceStatus }>
>(
  getStatus: () => Promise<T>,
  options: { attemptNum?: number; numOfAttempts: number; delayInMs: number } = {
    attemptNum: 1,
    numOfAttempts: DEFAULT_NUM_OF_ATTEMPTS,
    delayInMs: DEFAULT_DELAY_IN_MS,
  }
): Promise<T> => {
  const attemptNum = options.attemptNum || 1;
  const response = await getStatus();
  if (
    response.data.attributes.apiResourceStatus === 'Pending' &&
    attemptNum < options.numOfAttempts
  ) {
    await delay(options.delayInMs);
    return tryGettingStatus(getStatus, {
      ...options,
      attemptNum: attemptNum + 1,
    });
  }

  return response;
};

export default tryGettingStatus;
