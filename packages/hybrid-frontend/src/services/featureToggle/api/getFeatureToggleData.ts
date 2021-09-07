import mockFlagsData from '../../../data/dev/features/flags.json';
import { FeatureToggleResponse } from '../types';

// Reading from placholder JSON until we have the actual API
const getFeatureToggleData = (): Promise<FeatureToggleResponse> =>
  Promise.resolve({ featureFlags: mockFlagsData });

export default getFeatureToggleData;
