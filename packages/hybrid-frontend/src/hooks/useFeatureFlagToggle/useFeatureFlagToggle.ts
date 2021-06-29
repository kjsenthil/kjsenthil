import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FeatureFlagItem } from '../../services/featureToggle';
import { fetchFeatureToggleData } from '../../services/featureToggle/thunks';
import { RootState } from '../../store';

export default function useFeatureFlagToggle(flagName?: string): FeatureFlagItem | undefined {
  const dispatch = useDispatch();

  const { featureFlags } = useSelector((state: RootState) => ({
    featureFlags: state.featureToggle?.data?.featureFlags,
  }));

  useEffect(() => {
    if (!featureFlags) {
      dispatch(fetchFeatureToggleData());
    }
  }, [featureFlags]);

  const matchedFlag = featureFlags?.find((flagItem: FeatureFlagItem) => flagItem.name === flagName);

  return matchedFlag;
}
