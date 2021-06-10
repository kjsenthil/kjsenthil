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
    accountTypes: ['ISA', 'GIA', 'SIPP'],
    currentValue: 2340,
    goalValue: 3205,
    underperformValue: 1450,
    iconAlt: 'some alt text',
    iconSrc: '/goal-graphic.png',
    tooltipText: 'Some tooltip text',
    title: 'Retire',
  };

  test('component renders with expected goal data', () => {
    renderWithTheme(<GoalProgressCard {...defaultCardProps} />);
    const expectedStrings = [
      'Retire',
      'Some tooltip text',
      'ISA + GIA + SIPP',
      '£1,450',
      '/ £3,205',
    ];
    expectedStrings.forEach((expectedString) =>
      expect(screen.getByText(expectedString)).toBeVisible()
    );
    expect(screen.getAllByText('£2,340')).toHaveLength(2);
    expect(screen.getByAltText('some alt text')).toBeVisible();
  });

  test('component renders with a single account type', () => {
    const singleAccountProps = {
      ...defaultCardProps,
      accountTypes: ['ISA'],
    };
    renderWithTheme(<GoalProgressCard {...singleAccountProps} />);
    expect(screen.getByText('ISA')).toBeVisible();
  });
});
