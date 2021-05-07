import dayjs from 'dayjs';

const monthDifference = (date1: dayjs.ConfigType, date2: dayjs.ConfigType): number => {
  const date1Instance = dayjs(date1);
  const date2Instance = dayjs(date2);
  return date1Instance.diff(date2Instance, 'month');
};

export default monthDifference;
