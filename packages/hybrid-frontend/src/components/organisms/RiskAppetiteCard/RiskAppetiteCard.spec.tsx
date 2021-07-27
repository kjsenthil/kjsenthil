import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import RiskAppetiteCard, { RiskAppetiteCardProps } from './RiskAppetiteCard';

describe('RiskAppetiteCard', () => {
  const defaultProps: RiskAppetiteCardProps = {
    riskLevel: 6,
    onChange: jest.fn(),
    max: 7,
    min: 1,
    step: 1,
    value: 4,
    startLabel: 'Low risk/reward',
    endLabel: 'High risk/reward',
    hereValue: 3,
    showMarks: true,
  };

  describe('Handles render', () => {
    beforeEach(async () => {
      renderWithTheme(<RiskAppetiteCard {...defaultProps} />);
    });

    test('component renders with correct risk level', () => {
      expect(screen.getByText('Increase to 6 to get 100% on track')).toBeInTheDocument();
    });
  });
});
