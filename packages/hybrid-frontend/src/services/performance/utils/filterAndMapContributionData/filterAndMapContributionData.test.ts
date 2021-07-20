import filterAndMapPerformanceData from './filterAndMapContributionData';
import performanceData from '../../mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';

describe('filterAndMapContributionData', () => {
  it('returns peformance data based on given period', () => {
    expect(
      filterAndMapPerformanceData(performanceData.included[0].attributes.netContributions, '2d')
    ).toStrictEqual([
      {
        date: new Date('2016-05-17T00:00:00Z'),
        value: 5036.58,
      },
      {
        date: new Date('2016-05-18T00:00:00Z'),
        value: 5036.58,
      },
      {
        date: new Date('2016-05-19T00:00:00Z'),
        value: 5036.58,
      },
    ]);
  });
});
