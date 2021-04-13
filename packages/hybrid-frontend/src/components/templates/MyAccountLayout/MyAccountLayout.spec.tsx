import React from 'react';
import { render, screen } from '@testing-library/react';
import MyAccountLayout from './MyAccountLayout';

describe('MyAccountLayout', () => {
  test('Renders with child elements', async () => {
    render(
      <MyAccountLayout>
        <div data-testid="some-child-element" />
      </MyAccountLayout>
    );
    expect(await screen.findByTestId('some-child-element')).toBeInTheDocument();
  });
});
