import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import { Store } from 'redux';
import withStore from '../withStore';

const renderWithStore = (
  component: React.ReactElement,
  store: Store
): { store: Store; result: RenderResult } => {
  const wrappedComponent = withStore(component, store);

  return { store, result: render(wrappedComponent) };
};

export default renderWithStore;
