import dayjs, { UnitType, ConfigType } from 'dayjs';

const calculateAbsoluteFloorDiff = (date1: ConfigType, date2: ConfigType, unit: UnitType) =>
  Math.floor(Math.abs(dayjs(date1).diff(date2, unit, true)));

export default calculateAbsoluteFloorDiff;
