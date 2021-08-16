import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Tabs from './Tabs.styles';
import Tab from '../Tab/Tab';

describe('Tabs', () => {
  it('renders', () => {
    renderWithTheme(
      <Tabs>
        <Tab label="Some label 1" />
        <Tab label="Some label 2" />
      </Tabs>
    );

    expect(screen.getByText('Some label 1')).toBeInTheDocument();
    expect(screen.getByText('Some label 2')).toBeInTheDocument();
  });
});
