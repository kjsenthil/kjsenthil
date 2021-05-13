import React from 'react';
import { Layout } from './src/components/templates';
import GlobalProvider from './src/context/GlobalContextProvider';
import { StoreProvider } from './src/components/particles';

// Wraps every page in a component
export const wrapPageElement = ({ element }) => (
  <StoreProvider shouldPersist={true}>
    <Layout>{element}</Layout>
  </StoreProvider>
);

// Wrap root element
export const wrapRootElement = GlobalProvider;
