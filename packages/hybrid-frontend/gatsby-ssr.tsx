import React from 'react';
import { Layout } from './src/components/templates';
import { TEALIUM_ENVIRONMENT } from './src/constants';
import { StoreProvider } from './src/components/particles';

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
  <StoreProvider shouldPersist={false}>
    <Layout>{element}</Layout>
  </StoreProvider>
);
