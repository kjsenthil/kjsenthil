import React from 'react';
import { ProvisionalLayout } from './src/components/templates';
import { StoreProvider } from './src/components/particles';
import { AI_CONNECTION_STRING } from './src/config';
import { setUpTelemetry, telemetryReactPlugin, TelemetryContext } from '@tsw/telemetry'

export const onInitialClientRender = () => {
  setUpTelemetry(AI_CONNECTION_STRING);
};

// Wraps every page in a component
export const wrapPageElement = ({ element }) => (
  <TelemetryContext.Provider value={telemetryReactPlugin}>
    <StoreProvider shouldPersist={true}>
      <ProvisionalLayout>{element}</ProvisionalLayout>
    </StoreProvider>
  </TelemetryContext.Provider>
);
