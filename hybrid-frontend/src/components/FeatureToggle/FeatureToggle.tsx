/**
 * A wrapper component that determines whether a component should be rendered or not based on
 * feature flags information.
 */
/* eslint-disable no-console */
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useFeatureFlag } from '../../hooks/FeatureFlagsHooks';

export interface FeatureToggleProps {
  name: string;
  fallback: React.ReactNode;
  children?: React.ReactNode;
}

const FeatureToggleWithoutErrorHandling: React.FC<FeatureToggleProps> = ({
  name,
  fallback = null,
  children,
}) => {
  const feature = useFeatureFlag(name);

  // TODO:
  // Check user is beta

  if (!feature) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

const FeatureToggle: React.FC<FeatureToggleProps> = ({ children, name, fallback }) => (
  <ErrorBoundary
    fallbackRender={({ error }) => {
      console.error(`An error occurred when retrieving feature flag with name "${name}"`);
      console.error(error);

      return <>{fallback}</>;
    }}
  >
    <FeatureToggleWithoutErrorHandling name={name} fallback={fallback}>
      {children}
    </FeatureToggleWithoutErrorHandling>
  </ErrorBoundary>
);

export default FeatureToggle;
