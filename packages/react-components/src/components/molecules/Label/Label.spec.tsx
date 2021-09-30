import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import Label from './Label';

describe('Label', () => {
  it('Renders label with correct text', () => {
    renderWithTheme(<Label color="primary" text="HELLO" />);
    expect(screen.getByText('HELLO')).toBeVisible();
  });
});
