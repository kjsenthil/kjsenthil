import React from 'react';
import { ProvisionalLayout } from './src/components/templates';
import { TEALIUM_ENVIRONMENT } from './src/constants';
import { StoreProvider } from './src/components/particles';

export const onRenderBody = ({ setPreBodyComponents }) => {
  setPreBodyComponents([
    <>
    <noscript>Sorry, your browser has JavaScript disabled. Please enable it to use the site.</noscript>
    <script
      async
      src={`//tags.tiqcdn.com/utag/tilneygroup/digital-hybrid-project/${TEALIUM_ENVIRONMENT}/utag.js`}
    />
    </>,
  ]);
};

// Wraps every page in a component
// Needs to be specified similar as gatbsy-browser.tsx  to resolve layout issue in deployed enviroments
export const wrapPageElement = ({ element }) => (
  <StoreProvider shouldPersist={false}>
    <ProvisionalLayout>{element}</ProvisionalLayout>
  </StoreProvider>
);
