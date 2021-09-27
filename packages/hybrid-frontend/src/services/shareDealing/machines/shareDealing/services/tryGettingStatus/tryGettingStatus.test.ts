import FakeTimers from '@sinonjs/fake-timers';
import tryGettingStatus, { DEFAULT_DELAY_IN_MS, DEFAULT_NUM_OF_ATTEMPTS } from './tryGettingStatus';
import { ApiResourceStatus } from '../../../../api/types';
import { GenericResponseData } from '../../../../../api/types';

const clock = FakeTimers.install();
const getStatus = jest.fn();

describe('tryGettingStatus', () => {
  afterAll(() => {
    clock.uninstall();
  });

  const pendingResponse: GenericResponseData<{ apiResourceStatus: ApiResourceStatus }> = {
    data: { attributes: { apiResourceStatus: 'Pending' } },
  };

  const completedResponse: GenericResponseData<{ apiResourceStatus: ApiResourceStatus }> = {
    data: { attributes: { apiResourceStatus: 'Completed' } },
  };

  it('returns response without repitition when apiResourceStatus is not Pending', async () => {
    getStatus.mockResolvedValue(completedResponse);

    expect(await tryGettingStatus(getStatus)).toStrictEqual(completedResponse);
    expect(getStatus).toHaveBeenCalledTimes(1);
  });

  it('returns response with repitition until apiResourceStatus is not Pending', async () => {
    const actualAttempts = DEFAULT_NUM_OF_ATTEMPTS - 4;
    for (let i = 0; i < actualAttempts; i++) {
      getStatus.mockResolvedValueOnce(pendingResponse);
    }
    getStatus.mockResolvedValueOnce(completedResponse);

    const response = tryGettingStatus(getStatus);
    await clock.tickAsync(DEFAULT_DELAY_IN_MS * actualAttempts);

    expect(await response).toStrictEqual(completedResponse);
  });

  it('returns response with the max repititions even when apiResourceStatus is Pending', async () => {
    getStatus.mockResolvedValue(pendingResponse);

    const response = tryGettingStatus(getStatus);
    await clock.tickAsync(DEFAULT_DELAY_IN_MS * DEFAULT_NUM_OF_ATTEMPTS);

    expect(await response).toStrictEqual(pendingResponse);
  });
});
