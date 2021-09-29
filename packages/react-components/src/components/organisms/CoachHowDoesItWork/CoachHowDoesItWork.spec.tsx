import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import CoachHowDoesItWork from './CoachHowDoesItWork';

describe('CoachHowDoesItWork', () => {
  test('Renders the right fields', async () => {
    renderWithTheme(<CoachHowDoesItWork />);

    expect(
      await screen.findByText('These will help your coach to understand your objectives.')
    ).toBeInTheDocument();
  });
});
