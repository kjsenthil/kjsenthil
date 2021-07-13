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
    accountValues: [
      { label: 'ISA', value: 700000 },
      { label: 'GIA', value: 500000 },
      { label: 'SIPP', value: 242000 },
    ],
    goalValue: 1975000,
    shortfallValue: 553000,
    shortfallUnderperformValue: 689000,
    iconAlt: 'some alt text',
    iconSrc: '/goal-graphic.png',
    tooltipText: 'Some tooltip text',
    title: 'Retirement',
  };

  test('component renders with expected goal data', () => {
    renderWithTheme(<GoalProgressCard {...defaultCardProps} />);
    const expectedTexts = [
      'Retirement',
      'Some tooltip text',
      'ISA + GIA + SIPP',
      '£1,442,000',
      '£553,000',
      '£689,000',
      '/ £1,975,000',
    ];
    expectedTexts.forEach((expectedString) =>
      expect(screen.getByText(expectedString, { exact: false })).toBeVisible()
    );

    expect(screen.getByAltText('some alt text')).toBeVisible();
  });

  test('component renders with a single account type', () => {
    const singleAccountProps: GoalProgressCardProps = {
      ...defaultCardProps,
      accountValues: [{ label: 'ISA', value: 700000 }],
    };
    renderWithTheme(<GoalProgressCard {...singleAccountProps} />);
    expect(screen.getByText('ISA')).toBeVisible();
  });
});
