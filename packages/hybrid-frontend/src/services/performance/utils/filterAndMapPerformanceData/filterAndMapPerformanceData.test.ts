import filterAndMapPerformanceData from './filterAndMapPerformanceData';
import performanceData from '../../mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';

describe('filterAndMapPerformanceData', () => {
  it('returns peformance data based on given period', () => {
    expect(filterAndMapPerformanceData(performanceData.data.attributes.values, '2d')).toStrictEqual(
      [
        {
          date: new Date('2016-05-17T00:00:00Z'),
          value: 5323.12,
        },
        {
          date: new Date('2016-05-18T00:00:00Z'),
          value: 5323.12,
        },
        {
          date: new Date('2016-05-19T00:00:00Z'),
          value: 5323.12,
        },
      ]
    );
  });
});
