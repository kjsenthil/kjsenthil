import getFeatureToggleData from './getFeatureToggleData';
import featureFlags from '../../../data/dev/features/flags.json';

describe('getFeatureToggleData', () => {
  it(`returns an object with mock data`, async () => {
    const response = await getFeatureToggleData();

    expect(response).toStrictEqual({ featureFlags });
  });
});
