import contributionsDefined from './contributionsDefined';
import { ProjectionsChartProjectionDatum } from '../../../../../services/projections';

const mockData: ProjectionsChartProjectionDatum[] = [
  {
    netContributionsToDate: 10000,
    upperBound: 20000,
    lowerBound: 5000,
    value: 12000,
    date: new Date(2029, 0, 1),
  },
  {
    netContributionsToDate: 0,
    upperBound: 21000,
    lowerBound: 6000,
    value: 13000,
    date: new Date(2030, 0, 1),
  },
  {
    netContributionsToDate: -1000,
    upperBound: 21000,
    lowerBound: 6000,
    value: 13000,
    date: new Date(2031, 0, 1),
  },
];

describe('valueDefinedFactory', () => {
  it('works as expected', () => {
    expect(contributionsDefined(mockData[0])).toBeTrue();
    expect(contributionsDefined(mockData[1])).toBeFalse();
    expect(contributionsDefined(mockData[2])).toBeFalse();
  });
});
