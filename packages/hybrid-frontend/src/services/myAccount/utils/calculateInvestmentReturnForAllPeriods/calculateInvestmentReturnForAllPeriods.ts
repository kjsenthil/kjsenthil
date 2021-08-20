import { InvestmentAccount, PerformanceDataPeriod, PeriodReturn } from '@tswdts/react-components';
import calculateInvestmentReturn from '../calculateInvestmentReturn';
import { NetContributionValueWithDate, PerformanceValueWithDate } from '../../../performance';
import {
  filterAndMapContributionData,
  filterAndMapPerformanceData,
} from '../../../performance/utils';

const calculateInvestmentReturnForAllPeriods = (
  performanceData: Array<PerformanceValueWithDate>,
  contributionData: Array<NetContributionValueWithDate>
): InvestmentAccount['periodReturn'] =>
  Object.values(PerformanceDataPeriod).reduce((periodReturn, period) => {
    const periodFilteredPerformanceData = filterAndMapPerformanceData(performanceData, period);
    const periodFilteredContributionData = filterAndMapContributionData(contributionData, period);

    periodReturn[period] = calculateInvestmentReturn(
      periodFilteredPerformanceData,
      periodFilteredContributionData
    );

    return periodReturn;
  }, {} as PeriodReturn);

export default calculateInvestmentReturnForAllPeriods;
