import React from 'react';
import { ProvisionalLayout } from './src/components/templates';
import { StoreProvider } from './src/components/particles';

// Wraps every page in a component
export const wrapPageElement = ({ element }) => (
  <StoreProvider shouldPersist={true}>
    <ProvisionalLayout>{element}</ProvisionalLayout>
  </StoreProvider>
);
