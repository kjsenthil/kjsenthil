import React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';

import SliderLabelled, { SliderLabelledProps } from './SliderLabelled';

describe('SliderLabelled', () => {
  const defaultProps: SliderLabelledProps = {
    max: 7,
    min: 1,
    step: 1,
    name: 'slider-labelled',
    value: 4,
    onChange: jest.fn(),
    startLabel: 'Low risk/reward',
    endLabel: 'High risk/reward',
    hereValue: 3,
    showMarks: true,
  };

  describe('Handles render event', () => {
    beforeEach(async () => {
      renderWithTheme(<SliderLabelled {...defaultProps} />);
    });

    test('Renders the slider', async () => {
      expect(await screen.findByRole('slider')).toBeInTheDocument();
      expect(screen.queryByText('Low risk/reward')).toBeInTheDocument();
      expect(screen.queryByText('You are here')).toBeInTheDocument();
    });
  });
});
