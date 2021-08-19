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

  it('returns unit only when the period value is 1 and option shouldSkipOne is true', () => {
    const render = (humanizedPeriod: string) => `LAST ${humanizedPeriod.toUpperCase()}`;
    expect(humanizePeriodLabel('1y', render, true)).toStrictEqual('LAST YEAR');
  });

  it('does not return unit only when the period value > 1 and option shouldSkipOne is true', () => {
    const render = (humanizedPeriod: string) => `LAST ${humanizedPeriod.toUpperCase()}`;
    expect(humanizePeriodLabel('2y', render, true)).toStrictEqual('LAST 2 YEARS');
  });
});
