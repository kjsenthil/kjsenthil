import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from './src/components/templates';
import GlobalProvider from './src/context/GlobalContextProvider';
import store from './src/store';

// Wraps every page in a component
export const wrapPageElement = ({ element }) => (
  <Provider store={store}>
    <Layout>{element}</Layout>
  </Provider>
);

// Wrap root element
export const wrapRootElement = GlobalProvider;
