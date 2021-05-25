import dayjs from 'dayjs';

const calculateAgeToday = (dateOfBirth: Date): number => dayjs().diff(dayjs(dateOfBirth), 'year');

export default calculateAgeToday;
