import { TimeSeriesDatum } from '../data';

export default function getTimeSeriesMinMax<TS extends TimeSeriesDatum>(timeSeriesData: TS[]) {
  if (timeSeriesData.length === 0) {
    return {
      minDate: new Date(0),
      maxDate: new Date(0),
      minValue: 0,
      maxValue: 0,
    };
  }

  let minDate = timeSeriesData[0].date;
  let maxDate = timeSeriesData[0].date;
  let minValue = timeSeriesData[0].value;
  let maxValue = timeSeriesData[0].value;

  timeSeriesData.forEach(({ date, value }) => {
    if (date > maxDate) maxDate = date;
    if (date < minDate) minDate = date;
    if (value > maxValue) maxValue = value;
    if (value < minValue) minValue = value;
  });

  return {
    minDate,
    maxDate,
    minValue,
    maxValue,
  };
}
