import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import store from '../../../store';
import axiosSetUp from '../../../services/api/setup';

axiosSetUp();

const persistor = persistStore(store);

interface StoreProviderProps {
  children: React.ReactNode;
  shouldPersist: boolean;
}

const StoreProvider = ({ children, shouldPersist }: StoreProviderProps) => (
  <Provider store={store}>
    {shouldPersist ? (
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    ) : (
      children
    )}
  </Provider>
);

export default StoreProvider;
