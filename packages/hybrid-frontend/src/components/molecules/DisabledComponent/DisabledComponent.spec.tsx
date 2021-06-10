import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import DisabledComponent from './DisabledComponent';

describe('disabledComponent', () => {
  test('Disabled Button', () => {
    renderWithTheme(
      <DisabledComponent open title="comming soon">
        <a href="">Disabled link</a>
      </DisabledComponent>
    );
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText('Disabled link')).toBeInTheDocument();
  });
});
