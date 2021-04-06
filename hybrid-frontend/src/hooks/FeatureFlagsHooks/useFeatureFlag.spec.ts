import { useStaticQuery } from 'gatsby';
import { useFeatureFlag, FeatureFlag } from '.';
import { FeatureFlags } from '../../constants';

const mockFeatureFlags: Array<FeatureFlag> = [
  {
    name: FeatureFlags.FEATURE_A,
    isEnabled: true,
  },
  {
    name: FeatureFlags.FEATURE_B,
    isEnabled: false,
  },
];

const mockUseStaticQuery = useStaticQuery as jest.Mock;

describe('useFeatureFlag', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('useFeatureFlag return feature values as intended', () => {
    mockUseStaticQuery.mockReturnValue({
      allFlagsJson: {
        nodes: mockFeatureFlags,
      },
    });

    const featureA = useFeatureFlag(FeatureFlags.FEATURE_A);
    const featureB = useFeatureFlag(FeatureFlags.FEATURE_B);

    expect(featureA).toBe(true);
    expect(featureB).toBe(false);
  });

  test('useFeatureFlag returns false and logs warning if a feature flag is not found', () => {
    mockUseStaticQuery.mockReturnValue({
      allFlagsJson: {
        nodes: [],
      },
    });

    const consoleWarn = jest.spyOn(console, 'warn').mockImplementation(() => {});

    const featureA = useFeatureFlag(FeatureFlags.FEATURE_A);

    expect(featureA).toBe(false);
    expect(consoleWarn).toHaveBeenCalledTimes(1);

    consoleWarn.mockRestore();
  });

  test('useFeatureFlag returns false and logs error message if useStaticQuery returns falsy', () => {
    mockUseStaticQuery.mockImplementationOnce(() => undefined).mockImplementationOnce(() => null);

    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

    const feature1 = useFeatureFlag(FeatureFlags.FEATURE_A);
    const feature2 = useFeatureFlag(FeatureFlags.FEATURE_A);
    expect(consoleError).toHaveBeenCalledTimes(2);

    expect(feature1).toBe(false);
    expect(feature2).toBe(false);

    consoleError.mockRestore();
  });
});
