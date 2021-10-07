import dayjs, { OpUnitType, QUnitType } from 'dayjs';

const periodDifference = (date: dayjs.ConfigType, period: string): number | null => {
  const periodMatch = period.match(/(^\d+)([dmyw])$/);

  if (!periodMatch) {
    return null;
  }

  const periodUnits: Record<'d' | 'm' | 'y' | 'w', QUnitType | OpUnitType> = {
    d: 'day',
    m: 'month',
    y: 'year',
    w: 'week',
  };

  const [, periodValue, periodUnit] = periodMatch;

  const periodStart = dayjs().subtract(Number(periodValue), periodUnits[periodUnit]).toDate();

  return dayjs(periodStart).diff(date);
};

export default periodDifference;
