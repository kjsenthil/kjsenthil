import humanizePeriodLabel from './humanizePeriodLabel';

describe('humanizePeriodLabel', () => {
  const testMapping = [
    ['all', 'BEGINNING'],
    ['1m', '1 MONTH AGO'],
    ['3m', '3 MONTHS AGO'],
    ['6m', '6 MONTHS AGO'],
    ['1y', '1 YEAR AGO'],
  ];

  test.each(testMapping)('works as intended when period is %p', (period, expectedText) => {
    const render = (humanizedPeriod: string) =>
      humanizedPeriod === 'all' ? 'BEGINNING' : `${humanizedPeriod.toUpperCase()} AGO`;
    expect(humanizePeriodLabel(period, render)).toStrictEqual(expectedText);
  });
});
