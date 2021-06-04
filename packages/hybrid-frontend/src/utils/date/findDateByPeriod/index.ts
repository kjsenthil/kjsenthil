import { UnitType } from 'dayjs';
import calculateAbsoluteFloorDiff from '../calculateAbsoluteFloorDiff';

type DateType = Date | number | string;

const findDateByPeriod = (dates: Array<DateType>, period: string): DateType | null => {
  const periodMatch = period.match(/(^\d+)([dmy])$/);

  if (!periodMatch) {
    return null;
  }

  const periodUnits: Record<'d' | 'm' | 'y', UnitType> = { d: 'day', m: 'month', y: 'year' };

  const [, periodValue, periodUnit] = periodMatch;

  const sortedDates = dates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const lastDate = sortedDates[0];

  let currDate: DateType | null = null;
  let nextDate: DateType | null = null;

  if (sortedDates.length === 1) {
    return lastDate;
  }

  for (let i = 1; i < sortedDates.length; i++) {
    currDate = sortedDates[i];
    nextDate = sortedDates[i + 1];

    const diffBetweenCurrAndLast = calculateAbsoluteFloorDiff(
      lastDate,
      currDate,
      periodUnits[periodUnit]
    );

    const diffBetweenCurrAndNext = calculateAbsoluteFloorDiff(
      currDate,
      nextDate,
      periodUnits[periodUnit]
    );

    const diffBetweenLastAndNext = diffBetweenCurrAndLast + diffBetweenCurrAndNext;
    const nextIsTooFar =
      diffBetweenCurrAndNext > diffBetweenCurrAndLast &&
      diffBetweenLastAndNext > Number(periodValue);

    if (diffBetweenLastAndNext === Number(periodValue) && !nextIsTooFar && nextDate) {
      return nextDate;
    }

    if (
      (diffBetweenCurrAndLast > diffBetweenCurrAndNext &&
        diffBetweenLastAndNext === Number(periodValue)) ||
      diffBetweenCurrAndLast >= Number(periodValue) ||
      nextIsTooFar
    ) {
      return currDate;
    }
  }

  return currDate;
};

export default findDateByPeriod;
