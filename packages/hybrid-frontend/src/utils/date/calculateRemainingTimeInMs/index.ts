import dayjs from 'dayjs';

const calculateRemainingTimeInMs = (datetime: Date): number =>
  dayjs(datetime).diff(dayjs(), 'milliseconds');

export default calculateRemainingTimeInMs;
