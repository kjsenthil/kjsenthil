import valueDefinedFactory from './valueDefinedFactory';
import { ProjectionsChartProjectionDatum } from '../../../../../services/projections';

const zeroValueYear = 2030;
const mockData: ProjectionsChartProjectionDatum[] = [
  {
    netContributionsToDate: 10000,
    valueGood: 20000,
    valueBad: 5000,
    value: 12000,
    date: new Date(2029, 0, 1),
  },
  {
    netContributionsToDate: 11000,
    valueGood: 21000,
    valueBad: 6000,
    value: 13000,
    date: new Date(2030, 0, 1),
  },
  {
    netContributionsToDate: 11000,
    valueGood: 21000,
    valueBad: 6000,
    value: 13000,
    date: new Date(2031, 0, 1),
  },
];

describe('valueDefinedFactory', () => {
  it('works as expected', () => {
    const valueDefinedFn = valueDefinedFactory(zeroValueYear);

    expect(valueDefinedFn(mockData[0])).toBeTrue();
    expect(valueDefinedFn(mockData[1])).toBeTrue();
    expect(valueDefinedFn(mockData[2])).toBeFalse();
  });
});
