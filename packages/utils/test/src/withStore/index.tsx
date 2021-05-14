import React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

const withStore = (component: React.ReactElement, store: Store): React.ReactElement => (
  <Provider store={store}>{component}</Provider>
);

export default withStore;
