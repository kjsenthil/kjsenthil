import dayjs from 'dayjs';

const calculateDateAfterYears = (date: dayjs.ConfigType, years: number): Date =>
  dayjs(date).add(years, 'years').toDate();

export default calculateDateAfterYears;
