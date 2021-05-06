import React from 'react';
import { Provider } from 'react-redux';
import { Layout } from './src/components/templates';
import GlobalProvider from './src/context/GlobalContextProvider';
import { TEALIUM_ENVIRONMENT } from './src/constants';
import store from './src/store';

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <script
      async
      src={`//tags.tiqcdn.com/utag/tilneygroup/digital-hybrid-project/${TEALIUM_ENVIRONMENT}/utag.js`}
    />,
  ]);
};

// Wraps every page in a component
// Needs to be specified similar as gatbsy-browser.tsx  to resolve layout issue in deployed enviroments
export const wrapPageElement = ({ element }) => (
  <Provider store={store}>
    <Layout>{element}</Layout>
  </Provider>
);

// Wrap root element
export const wrapRootElement = GlobalProvider;
