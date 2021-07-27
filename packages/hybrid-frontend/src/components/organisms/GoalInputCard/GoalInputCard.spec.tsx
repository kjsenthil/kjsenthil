import * as React from 'react';
import { fireEvent, renderWithTheme, screen } from '@tsw/test-util';
import GoalInputCard, { GoalInputCardProps } from './GoalInputCard';

describe('GoalInputCard', () => {
  const defaultProps: GoalInputCardProps = {
    type: 'monthly',
    onTrack: 334,
    value: 123,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  const inputDataTestId = `goal-input-${defaultProps.type}`;
  let inputField: HTMLInputElement;

  describe('Handles render and onChange events', () => {
    beforeEach(async () => {
      renderWithTheme(<GoalInputCard {...defaultProps} />);
      inputField = (await screen.findByTestId(inputDataTestId)) as HTMLInputElement;
    });

    test('Renders the right fields', async () => {
      expect(await screen.findByText('Additional monthly contribution')).toBeInTheDocument();
      expect(await screen.findByTestId(inputDataTestId)).toBeInTheDocument();
      expect(screen.queryByText('Add cash or transfer in today')).toBeNull();
    });

    test('Calls onChange when input changes', () => {
      fireEvent.change(inputField, { target: { value: '321' } });
      expect(defaultProps.onChange).toBeCalledTimes(1);
    });
  });
});
