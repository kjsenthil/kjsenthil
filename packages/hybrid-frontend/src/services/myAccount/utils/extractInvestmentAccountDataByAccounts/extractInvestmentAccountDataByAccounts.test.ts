import { PerformanceDataPeriod, PeriodReturn } from '@tswdts/react-components';
import extractInvestmentAccountDataByAccounts from '.';
import getEquityAndCashAllocation from '../../api/getEquityAndCashAllocation';
import getMonthlySavingsAmount from '../../api/getMonthlySavingsAmount';

jest.mock('../../api/getEquityAndCashAllocation');
jest.mock('../../api/getMonthlySavingsAmount');

const periodReturn: PeriodReturn = {
  [PerformanceDataPeriod['1W']]: {
    value: 100,
    percent: 10,
  },
  [PerformanceDataPeriod['1M']]: {
    value: 100,
    percent: 10,
  },
  [PerformanceDataPeriod['3M']]: {
    value: 100,
    percent: 10,
  },
  [PerformanceDataPeriod['6M']]: {
    value: 100,
    percent: 10,
  },
  [PerformanceDataPeriod['1Y']]: {
    value: 100,
    percent: 10,
  },
  [PerformanceDataPeriod['5Y']]: {
    value: 100,
    percent: 10,
  },
};

describe('extractInvestmentAccountDataByAccounts', () => {
  it('returns investment account data by accounts ', async () => {
    (getEquityAndCashAllocation as jest.Mock).mockResolvedValue({
      equityPercentage: 100,
      cashPercentage: 50,
    });

    (getMonthlySavingsAmount as jest.Mock).mockResolvedValueOnce(0);

    const mockInvestmentClientAccounts = [
      { id: '21977', name: 'ISA ', type: 'accounts' },
      { id: '21978', name: 'Investment Account ', type: 'accounts' },
    ];

    const mockInvestmentAccounts = [
      {
        id: '21977',
        accountName: 'ISA ',
        accountType: 'accounts',
        accountTotalNetContribution: 0,
        periodReturn,
        accountTotalHoldings: 0,
        accountCash: 0,
        accountReturn: 0,
        accountReturnPercentage: 0,
        monthlyInvestment: 100,
      },
      {
        id: '21978',
        accountName: 'Investment Account ',
        accountType: 'accounts',
        accountTotalNetContribution: 0,
        periodReturn,
        accountTotalHoldings: 0,
        accountCash: 0,
        accountReturn: 0,
        accountReturnPercentage: 0,
        monthlyInvestment: 150,
      },
    ];

    const mockResponse = [
      {
        accountCash: 0,
        accountName: 'ISA ',
        accountReturn: 4582.132456,
        accountReturnPercentage: 93.56,
        accountTotalHoldings: 9479.442456,
        equityPercentage: 100,
        cashPercentage: 50,
        id: '21977',
        monthlyInvestment: 100,
      },
      {
        accountCash: 9.93,
        accountName: 'Investment Account ',
        accountReturn: 0,
        accountReturnPercentage: 0,
        accountTotalHoldings: 9.93,
        equityPercentage: 100,
        cashPercentage: 50,
        id: '21978',
        monthlyInvestment: 150,
      },
    ];

    const mockInvestmentSummaryData = [
      {
        type: 'investment-summary' as 'investment-summary',
        id: '21977',
        attributes: {
          funds: 9479.442456,
          shares: 0,
          cash: 0,
          cost: 4897.31,
          gainLoss: 4582.132456,
          gainLossPercent: 93.56,
          lastUpdate: '2021-04-13T00:00:00',
        },
        links: {
          self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/investment-summary/21977',
        },
        relationships: null,
      },
      {
        type: 'investment-summary' as 'investment-summary',
        id: '21978',
        attributes: {
          funds: 0,
          shares: 0,
          cash: 9.93,
          cost: 0,
          gainLoss: 0,
          gainLossPercent: 0,
          lastUpdate: null,
        },
        links: {
          self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/investment-summary/21978',
        },
        relationships: null,
      },
    ];

    const accountsResults = await extractInvestmentAccountDataByAccounts(
      mockInvestmentSummaryData,
      mockInvestmentClientAccounts,
      mockInvestmentAccounts
    );
    expect(accountsResults).toStrictEqual(mockResponse);
  });
});
