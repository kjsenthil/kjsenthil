import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from './src/components/templates';
import GlobalProvider from './src/context/GlobalContextProvider';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from './src/store';
import axiosSetUp from './src/services/api/setup';

axiosSetUp();
const persistor = persistStore(store);
// Wraps every page in a component
export const wrapPageElement = ({ element }) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Layout>{element}</Layout>
    </PersistGate>
  </Provider>
);

// Wrap root element
export const wrapRootElement = GlobalProvider;
