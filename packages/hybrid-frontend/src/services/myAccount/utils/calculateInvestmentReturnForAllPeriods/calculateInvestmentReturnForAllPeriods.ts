import { InvestmentAccount } from '../..';
import {
  PerformanceDataPeriod,
  NetContributionValueWithDate,
  PerformanceValueWithDate,
  filterAndMapPerformanceData,
  filterAndMapContributionData,
} from '../../../performance';
import { PeriodReturn } from '../../types';
import calculateInvestmentReturn from '../calculateInvestmentReturn';

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
