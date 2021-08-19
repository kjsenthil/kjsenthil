import { PerformanceDataPeriod } from '@tsw/react-components';
import performance from '../../../performance/mocks/mock-get-performance-accounts-aggregated-success-response-simple.json';
import calculateInvestmentReturnForAllPeriods from './calculateInvestmentReturnForAllPeriods';
import calculateInvestmentReturn from '../calculateInvestmentReturn';
import { filterAndMapContributionData, filterAndMapPerformanceData } from '../../../performance';

jest.mock('@tsw/react-components', () => ({
  ...jest.requireActual('@tsw/react-components'),
  PerformanceDataPeriod: {
    '1W': '7d',
    '1M': '1m',
  },
}));

jest.mock('../calculateInvestmentReturn', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('../../../performance/utils', () => ({
  filterAndMapContributionData: jest.fn(),
  filterAndMapPerformanceData: jest.fn(),
}));

const mockFilterAndMapPerformanceData = filterAndMapPerformanceData as jest.Mock;
const mockFilterAndMapContributionData = filterAndMapContributionData as jest.Mock;

const mockCalculateInvestmentReturn = calculateInvestmentReturn as jest.Mock;

const sortedPerformanceData1 = [
  { value: 50, date: new Date(2017, 1, 1) },
  { value: 1000, date: new Date(2018, 1, 1) },
];

const sortedPerformanceData2 = [
  { value: 2000, date: new Date(2019, 1, 1) },
  { value: 3000, date: new Date(2020, 1, 1) },
];

const sortedContributionData1 = [
  { value: 200, date: new Date(2017, 1, 1) },
  { value: 200, date: new Date(2018, 1, 1) },
];

const sortedContributionData2 = [
  { value: 200, date: new Date(2019, 1, 1) },
  { value: 200, date: new Date(2020, 1, 1) },
];

describe('calculateInvestmentReturnForAllPeriods', () => {
  it('returns an object with total performance return for all periods', () => {
    const performanceData = performance.data.attributes.values;
    const contributionData = performance.included[0].attributes.netContributions;

    const result = {
      '7d': {
        percent: -0.0002591702548401232,
        value: -2.459999999999127,
      },
      '1m': {
        percent: -0.0002591702548401232,
        value: -2.459999999999127,
      },
    };

    mockFilterAndMapPerformanceData.mockReturnValueOnce(sortedPerformanceData1);
    mockFilterAndMapPerformanceData.mockReturnValueOnce(sortedPerformanceData2);

    mockFilterAndMapContributionData.mockReturnValueOnce(sortedContributionData1);
    mockFilterAndMapContributionData.mockReturnValueOnce(sortedContributionData2);

    mockCalculateInvestmentReturn.mockReturnValueOnce(result['7d']);
    mockCalculateInvestmentReturn.mockReturnValueOnce(result['1m']);

    expect(calculateInvestmentReturnForAllPeriods(performanceData, contributionData)).toStrictEqual(
      result
    );

    expect(mockFilterAndMapContributionData).toHaveBeenCalledTimes(2);
    expect(mockFilterAndMapPerformanceData).toHaveBeenCalledTimes(2);

    Object.values(PerformanceDataPeriod).forEach((period) => {
      expect(mockFilterAndMapPerformanceData).toHaveBeenCalledWith(performanceData, period);
      expect(mockFilterAndMapContributionData).toHaveBeenCalledWith(contributionData, period);
    });

    expect(mockCalculateInvestmentReturn).toHaveBeenCalledWith(
      sortedPerformanceData1,
      sortedContributionData1
    );

    expect(mockCalculateInvestmentReturn).toHaveBeenCalledWith(
      sortedPerformanceData2,
      sortedContributionData2
    );
  });
});
