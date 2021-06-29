import { useStaticQuery } from 'gatsby';
import useGraphQLFeatureFlag from '.';
import { FeatureFlagNames } from '../../constants';
import { FeatureFlagItem } from '../../services/featureToggle';

const mockFeatureFlags: Array<FeatureFlagItem> = [
  {
    name: FeatureFlagNames.FEATURE_A,
    isEnabled: true,
  },
  {
    name: FeatureFlagNames.FEATURE_B,
    isEnabled: false,
  },
];

const mockUseStaticQuery = useStaticQuery as jest.Mock;

describe('useGraphQLFeatureFlag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('useGraphQLFeatureFlag return feature values as intended', () => {
    mockUseStaticQuery.mockReturnValue({
      allFlagsJson: {
        nodes: mockFeatureFlags,
      },
    });

    const featureA = useGraphQLFeatureFlag(FeatureFlagNames.FEATURE_A);
    const featureB = useGraphQLFeatureFlag(FeatureFlagNames.FEATURE_B);

    expect(featureA).toBe(true);
    expect(featureB).toBe(false);
  });

  test('useGraphQLFeatureFlag returns false and logs warning if a feature flag is not found', () => {
    mockUseStaticQuery.mockReturnValue({
      allFlagsJson: {
        nodes: [],
      },
    });

    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const featureA = useGraphQLFeatureFlag(FeatureFlagNames.FEATURE_A);

    expect(featureA).toBe(false);
    expect(consoleWarn).toHaveBeenCalledTimes(1);

    consoleWarn.mockRestore();
  });

  test('useGraphQLFeatureFlag returns false and logs error message if useStaticQuery returns falsy', () => {
    mockUseStaticQuery.mockImplementationOnce(() => undefined).mockImplementationOnce(() => null);

    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const feature1 = useGraphQLFeatureFlag(FeatureFlagNames.FEATURE_A);
    const feature2 = useGraphQLFeatureFlag(FeatureFlagNames.FEATURE_A);
    expect(consoleError).toHaveBeenCalledTimes(2);

    expect(feature1).toBe(false);
    expect(feature2).toBe(false);

    consoleError.mockRestore();
  });
});
