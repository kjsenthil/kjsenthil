// TODO: probably should replace this with industry standard react-query or swr
//  libraries

import * as React from 'react';
import { CommonState } from '../../services/types';

export interface UseServerSideDataConfig {
  maxRetries: number;
  enabled: boolean;
  additionalDependencies: unknown[];
}

const DEFAULT_CONFIG: UseServerSideDataConfig = {
  maxRetries: 3,
  enabled: true,
  additionalDependencies: [],
};

export interface UseServerSideDataReturn {
  maxRetriesHit: boolean;
  resetRetryCount: () => void;
}

/**
 * This hook executes Redux dispatch functions on render and with these
 * conditions:
 * - The dispatch's thunk state is not loading or success
 * - The dispatch's maximum retry count has not been reached
 *
 * @param {function} fetcher - A function that executes a Redux dispatch()
 * function
 * @param {CommonState['status]} thunkState - The thunk's state, straight from
 * Redux
 * @param {Partial<UseServerSideDataConfig>} config - Configure this hook's
 * behaviour
 *
 * @returns {UseServerSideDataReturn} - A boolean indicating whether the retry
 * limit has been hit, and a function to reset the retry count.
 */
export default function useDispatchThunkOnRender(
  fetcher: () => void,
  thunkState: CommonState['status'], // This should be
  config: Partial<UseServerSideDataConfig> = DEFAULT_CONFIG
) {
  const { maxRetries, enabled, additionalDependencies }: UseServerSideDataConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  const [retryCount, setRetryCount] = React.useState(0);

  const resetRetryCount = () => {
    setRetryCount(0);
  };

  React.useEffect(() => {
    if (thunkState === 'success') {
      resetRetryCount();
    }
  }, [thunkState]);

  React.useEffect(() => {
    if (
      enabled &&
      thunkState !== 'loading' &&
      thunkState !== 'success' &&
      retryCount < maxRetries
    ) {
      setRetryCount((prev) => prev + 1);
      fetcher();
    }
  }, [enabled, thunkState, maxRetries, ...additionalDependencies]);

  return { maxRetriesHit: retryCount === maxRetries, resetRetryCount };
}
