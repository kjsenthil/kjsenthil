import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Tab from './Tab';

describe('Tab', () => {
  it('renders', () => {
    renderWithTheme(<Tab label="Some label" />);

    expect(screen.getByText('Some label')).toBeInTheDocument();
  });
});
