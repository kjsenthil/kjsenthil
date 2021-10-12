import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import CoachWhatCanACoachDoForYou, { tiles } from './CoachWhatCanACoachDoForYou';

describe('CoachWhatCanACoachDoForYou', () => {
  test('Renders the right fields', async () => {
    renderWithTheme(<CoachWhatCanACoachDoForYou />);

    expect(screen.getByText('What can a coach do for you?')).toBeInTheDocument();
    tiles.forEach((tile) => {
      expect(screen.getByText(tile.title)).toBeVisible();
      if (tile.postTextLink) {
        expect(screen.getByText(tile.postTextLink.text)).toBeVisible();
      } else {
        expect(screen.getByText(tile.text)).toBeVisible();
      }
    });
  });
});
