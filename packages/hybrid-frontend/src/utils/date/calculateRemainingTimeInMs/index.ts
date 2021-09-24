import dayjs from 'dayjs';

const calculateRemainingTimeInMs = (datetime: dayjs.ConfigType): number =>
  dayjs(datetime).diff(dayjs(), 'milliseconds');

export default calculateRemainingTimeInMs;
