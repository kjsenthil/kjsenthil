import { TimeSeriesDatum } from '../data';
import getTimeSeriesMinMax from './getTimeSeriesMinMax';

const mockData: TimeSeriesDatum[] = [
  {
    date: new Date(2020, 0, 1),
    value: 20000,
  },
  {
    date: new Date(2020, 0, 2),
    value: 10000,
  },
];

describe('getTimeSeriesMinMax', () => {
  it('works as expected when an empty dataset is provided', () => {
    expect(getTimeSeriesMinMax([])).toEqual({
      minDate: new Date(0),
      maxDate: new Date(0),
      minValue: 0,
      maxValue: 0,
    });
  });

  it('works as expected when there is data', () => {
    expect(getTimeSeriesMinMax(mockData)).toEqual({
      minDate: mockData[0].date,
      maxDate: mockData[1].date,
      minValue: mockData[1].value,
      maxValue: mockData[0].value,
    });
  });
});
