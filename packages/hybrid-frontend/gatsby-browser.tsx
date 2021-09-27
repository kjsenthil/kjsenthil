import React from 'react';
import { ProvisionalLayout } from './src/components/templates';

import { StoreProvider } from './src/components/particles';
import { AI_CONNECTION_STRING } from './src/config';
import {
  setUpTelemetry,
  telemetryReactPlugin,
  TelemetryErrorBoundary,
  TelemetryContext,
} from '@tsw/telemetry';
import ErrorPage from './src/pages/404';

export const onInitialClientRender = () => {
  setUpTelemetry(AI_CONNECTION_STRING);
};

// Wraps every page in a component
export const wrapPageElement = ({ element }) => (
  <TelemetryContext.Provider value={telemetryReactPlugin}>
    <TelemetryErrorBoundary appInsights={telemetryReactPlugin} onError={ErrorPage}>
      <StoreProvider shouldPersist={true}>
        <ProvisionalLayout>{element}</ProvisionalLayout>
      </StoreProvider>
    </TelemetryErrorBoundary>
  </TelemetryContext.Provider>
);
