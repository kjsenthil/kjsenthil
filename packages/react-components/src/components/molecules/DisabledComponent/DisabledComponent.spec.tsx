import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import DisabledComponent from './DisabledComponent';

describe('DisabledComponent', () => {
  test('Disabled Button', () => {
    const titleTooltip = 'Coming soon';

    renderWithTheme(
      <DisabledComponent open title={titleTooltip}>
        <a href="">Disabled link</a>
      </DisabledComponent>
    );

    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByText(titleTooltip)).toBeInTheDocument();
    expect(screen.getByText('Disabled link')).toBeInTheDocument();
  });
});
