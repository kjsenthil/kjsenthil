import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import GoalInputCard, { GoalInputCardProps } from './GoalInputCard';

describe('GoalInputCard', () => {
  const defaultProps: GoalInputCardProps = {
    type: 'monthly',
    onTrack: 334,
    onTrackPercentage: 0.52,
    value: 123,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  const inputDataTestId = `goal-input-${defaultProps.type}`;

  describe('Handles render and onChange events', () => {
    beforeEach(async () => {
      renderWithTheme(<GoalInputCard {...defaultProps} />);
    });

    test('Renders the right fields', async () => {
      expect(await screen.findByText('Additional monthly contribution')).toBeInTheDocument();
      expect(await screen.findByTestId(inputDataTestId)).toBeInTheDocument();
      expect(screen.queryByText('Add cash or transfer in today')).toBeNull();
    });
  });
});
