import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import ProvisionalLayout from './ProvisionalLayout';

describe('ProvisionalLayout', () => {
  test('Renders with child elements', async () => {
    renderWithTheme(
      <ProvisionalLayout>
        <div data-testid="some-child-element" />
      </ProvisionalLayout>
    );
    expect(await screen.findByTestId('some-child-element')).toBeInTheDocument();
  });
});
