import { Dayjs } from 'dayjs';
import { PerformanceDataPeriod } from '../../services';

type DatesGenerator = (startDate: Date) => Date[];
type DatesGeneratorFactory = (howMany: number) => DatesGenerator;

export function getLastDayOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export const getDayArrayBackwardsFactory: DatesGeneratorFactory = (howMany) => (startDate) => {
  const startDateYear = startDate.getFullYear();
  const startDateMonth = startDate.getMonth();
  const startDateDate = startDate.getDate();

  const firstHourOfNextDay = new Date(startDateYear, startDateMonth, startDateDate + 1);

  const result: Date[] = [firstHourOfNextDay];
  for (let i = 1; i < howMany + 1; i++) {
    result.push(new Date(startDateYear, startDateMonth, startDateDate - i + 1));
  }

  return result;
};

export const getWeekArrayBackwardsFactory: DatesGeneratorFactory = (howMany) => (startDate) => {
  const startDateYear = startDate.getFullYear();
  const startDateMonth = startDate.getMonth();
  const startDateDate = startDate.getDate();

  const result: Date[] = [startDate];
  for (let i = 1; i < howMany + 1; i++) {
    result.push(new Date(startDateYear, startDateMonth, startDateDate - 7 * i));
  }

  return result;
};

export const getMonthArrayBackwardsFactory: DatesGeneratorFactory = (howMany) => (startDate) => {
  const startDateYear = startDate.getFullYear();
  const startDateMonth = startDate.getMonth();

  const firstDateOfNextMonth = new Date(startDateYear, startDateMonth + 1, 1);

  const result: Date[] = [firstDateOfNextMonth];
  for (let i = 0; i < howMany; i++) {
    result.push(new Date(startDateYear, startDateMonth - i, 1));
  }

  return result;
};

export const getYearArrayBackwardsFactory: DatesGeneratorFactory = (howMany) => (startDate) => {
  const startDateYear = startDate.getFullYear();

  const firstDateOfNextYear = new Date(startDateYear + 1, 0, 1);

  const result: Date[] = [firstDateOfNextYear];
  for (let i = 0; i < howMany; i++) {
    result.push(new Date(startDateYear - i, 0, 1));
  }
  return result;
};

export const xScaleConfig: Record<
  PerformanceDataPeriod,
  { datesGenerator: DatesGenerator; columnsCount: number; formatter: (d: Dayjs) => string }
> = {
  [PerformanceDataPeriod['1W']]: {
    formatter: (d: Dayjs) => d.format('D MMM'),
    columnsCount: 7,
    datesGenerator: getDayArrayBackwardsFactory(7),
  },
  [PerformanceDataPeriod['1M']]: {
    formatter: (d: Dayjs) => d.format('D MMM'),
    columnsCount: 4,
    datesGenerator: getWeekArrayBackwardsFactory(4),
  },
  [PerformanceDataPeriod['3M']]: {
    formatter: (d: Dayjs) => d.format('MMM'),
    columnsCount: 3,
    datesGenerator: getMonthArrayBackwardsFactory(3),
  },
  [PerformanceDataPeriod['6M']]: {
    formatter: (d: Dayjs) => d.format('MMM'),
    columnsCount: 6,
    datesGenerator: getMonthArrayBackwardsFactory(6),
  },
  [PerformanceDataPeriod['1Y']]: {
    formatter: (d: Dayjs) => d.format('MMM'),
    columnsCount: 12,
    datesGenerator: getMonthArrayBackwardsFactory(12),
  },
  [PerformanceDataPeriod['5Y']]: {
    formatter: (d: Dayjs) => d.format('YYYY'),
    columnsCount: 5,
    datesGenerator: getYearArrayBackwardsFactory(5),
  },
};
