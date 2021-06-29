/**
 * A wrapper component that determines whether a component should be rendered or not based on
 * feature flags information.
 */
/* eslint-disable no-console */
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useFeatureFlagToggle } from '../../../hooks';

export interface FeatureToggleProps {
  flagName: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const FeatureToggleWithoutErrorHandling = ({
  flagName,
  fallback = null,
  children,
}: FeatureToggleProps) => {
  const featureFlag = useFeatureFlagToggle(flagName);

  if (featureFlag && !featureFlag.isEnabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

const FeatureToggle = ({ children, flagName, fallback }: FeatureToggleProps) => (
  <ErrorBoundary
    fallbackRender={({ error }) => {
      console.error(`An error occurred when retrieving feature flag with name "${flagName}"`);
      console.error(error);

      return <>{fallback}</>;
    }}
  >
    <FeatureToggleWithoutErrorHandling flagName={flagName} fallback={fallback}>
      {children}
    </FeatureToggleWithoutErrorHandling>
  </ErrorBoundary>
);

export default FeatureToggle;
