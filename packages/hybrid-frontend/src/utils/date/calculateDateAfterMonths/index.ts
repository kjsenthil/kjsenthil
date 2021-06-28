import dayjs from 'dayjs';

const calculateDateAfterMonths = (
  date: dayjs.ConfigType,
  months: number,
  startOfMonth: boolean = false
): Date => {
  let dateInMonths = dayjs(date).add(months, 'month');

  if (startOfMonth) {
    dateInMonths = dateInMonths.startOf('month');
  }

  return dateInMonths.toDate();
};
export default calculateDateAfterMonths;
