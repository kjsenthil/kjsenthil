import React from 'react';
import { Store } from 'redux';
import { render, RenderResult } from '@testing-library/react';
import withStore from '../withStore';
import withTheme from '../withTheme';

const renderWithProviders = (
  component: React.ReactElement,
  store: Store
): { store: Store; result: RenderResult } => {
  const wrappedComponent = withStore(withTheme(component), store);

  return { store, result: render(wrappedComponent) };
};

export default renderWithProviders;
