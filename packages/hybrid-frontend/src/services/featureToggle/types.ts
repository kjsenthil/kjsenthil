import { CommonState } from '../types';

export interface FeatureToggleState extends CommonState<FeatureToggleResponse> {}
export interface FeatureToggleResponse {
  featureFlags: FeatureFlagItem[];
}

export interface FeatureFlagItem {
  name: string;
  isEnabled: boolean;
}
