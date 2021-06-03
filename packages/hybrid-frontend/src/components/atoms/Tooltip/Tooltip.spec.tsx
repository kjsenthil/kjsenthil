import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  test('renders a tooltip with child element', () => {
    const childText = 'Some child content';
    renderWithTheme(
      <Tooltip title="Some tooltip title" open>
        <div>{childText}</div>
      </Tooltip>
    );
    expect(screen.getByText(childText)).toBeVisible();
    expect(screen.getByRole('tooltip')).toBeVisible();
  });
});
