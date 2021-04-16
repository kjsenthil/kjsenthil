import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import MyAccountLayout from './MyAccountLayout';

describe('MyAccountLayout', () => {
  test('Renders with child elements', async () => {
    renderWithTheme(
      <MyAccountLayout>
        <div data-testid="some-child-element" />
      </MyAccountLayout>
    );
    expect(await screen.findByTestId('some-child-element')).toBeInTheDocument();
  });
});
