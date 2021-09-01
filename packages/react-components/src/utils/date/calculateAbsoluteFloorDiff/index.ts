import dayjs, { ConfigType, QUnitType, OpUnitType } from 'dayjs';

const calculateAbsoluteFloorDiff = (
  date1: ConfigType,
  date2: ConfigType,
  unit: QUnitType | OpUnitType
) => Math.floor(Math.abs(dayjs(date1).diff(date2, unit, true)));

export default calculateAbsoluteFloorDiff;
