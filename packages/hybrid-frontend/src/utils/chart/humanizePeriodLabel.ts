const PERIOD_REGEX = /^(\d+)([dmy])$/;

/**
 * Given a data period (per the PerformanceDataPeriod enum), return a label for
 * the performance simplified chart (e.g. 1m -> 1 MONTH AGO).
 */
export default function humanizePeriodLabel(
  period: string,
  render: (humanizedPeriod: string, periodValue?: number) => string = (humanizedPeriod) =>
    humanizedPeriod,
  shouldSkipOne: boolean = false
): string {
  const periodUnits = { d: 'day', m: 'month', y: 'year' };

  const regexRes = period.match(PERIOD_REGEX);

  if (regexRes && regexRes.length >= 3) {
    const [, periodValue, periodUnitShort] = regexRes;

    const pluralSuffix = Number(periodValue) > 1 ? 's' : '';
    const periodUnit = periodUnits[periodUnitShort];

    const unit = `${periodUnit}${pluralSuffix}`;
    if (shouldSkipOne && Number(periodValue) === 1) {
      return render(unit, Number(periodValue));
    }
    return render(`${periodValue} ${unit}`, Number(periodValue));
  }

  return render(period);
}
