import * as React from 'react';
import { renderWithTheme, screen } from '@tsw/test-util';
import GoalProgressCard, { GoalProgressCardProps } from './GoalProgressCard';

jest.mock('../../atoms/Tooltip', () => ({
  __esModule: true,
  default: ({ children, title }) => (
    <>
      <div>{title}</div>
      <div>{children}</div>
    </>
  ),
}));

describe('GoalProgressCard', () => {
  const defaultCardProps: GoalProgressCardProps = {
    onTrackPercentage: 0.72,
    affordableValues: [700000, 500000, 242555],
    goalValue: 1975000,
    shortfallValue: 553000,
    shortfallUnderperformValue: 689000,
    iconAlt: 'some alt text',
    iconSrc: '/goal-graphic.png',
    tooltipText: 'Some tooltip text',
    title: 'Retirement',
    investmentAccounts: ['ISA', 'GIA', 'SIPP'],
    navigateToEditGoalPage: () => {},
  };

  test('component renders with expected goal data', () => {
    renderWithTheme(<GoalProgressCard {...defaultCardProps} />);
    const expectedTexts = [
      'Retirement',
      'Some tooltip text',
      'ISA + GIA + SIPP',
      '£1,443,000',
      '£553,000',
      '£689,000',
      '/ £1,975,000',
      '72%',
    ];
    expectedTexts.forEach((expectedString) =>
      expect(screen.getByText(expectedString, { exact: false })).toBeVisible()
    );

    expect(screen.getByAltText('some alt text')).toBeVisible();
  });
});
