import React from 'react';
import { Layout } from './src/components/templates';
import GlobalProvider from './src/context/GlobalContextProvider';

// Wraps every page in a component
export const wrapPageElement = ({ element }) => <Layout>{element}</Layout>;

// Wrap root element
export const wrapRootElement = GlobalProvider;
