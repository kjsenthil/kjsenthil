import React from 'react';
import Layout from './src/components/Layout';
import GlobalProvider from './src/context/GlobalContextProvider';

// Wraps every page in a component
// Needs to be specified similar as gatbsy-browser.tsx  to resolve layout issue in deployed enviroments
export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>;

// Wrap root element
export const wrapRootElement = GlobalProvider;
