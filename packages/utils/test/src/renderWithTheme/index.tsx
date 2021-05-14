import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import withTheme from '../withTheme';

const renderWithTheme = (component: React.ReactElement): { result: RenderResult } => ({
  result: render(withTheme(component)),
});

export default renderWithTheme;
