import { AccountData, ClientAccountTypes } from '../../types';
import {
  BreakdownAllocationResponse,
  ClientResponse,
  ContributionResponse,
  InvestmentSummaryResponse,
  MonthlySavingsResponse,
  ClientAccountItem,
  Breakdown,
  BasicInvestmentSummary,
} from '../types';

export const mockBasicInvestmentSummary: BasicInvestmentSummary = {
  totalCash: 183322.11000000002,
  totalGainLoss: 122249.170119,
  totalGainLossPercentage: 55.04,
  totalInvested: 635376.130119,
};

export const mockAccountsBreakdown: Breakdown[] = [
  {
    id: '12345',
    accountType: 'accounts',
    accountTotalContribution: 3000,
    accountName: 'Investment Account ',
    accountCash: 100,
    accountTotalHoldings: 100,
    accountReturn: 0,
    accountReturnPercentage: 0,
  },
  {
    id: '23456',
    accountType: 'accounts',
    accountTotalContribution: 4000,
    accountName: 'ISA ',
    accountCash: 139678.85,
    accountTotalHoldings: 545908.9554399999,
    accountReturn: 116295.09544,
    accountReturnPercentage: 40.11,
  },
  {
    id: '34567',
    accountType: 'linked-accounts',
    accountTotalContribution: 5000,
    accountName: 'SIPP ',
    accountTotalHoldings: 89367.174679,
    accountCash: 43543.26,
    accountReturn: 5954.074679,
    accountReturnPercentage: 14.93,
  },
];

export const mockAccountsBreakdownData = {
  accountBreakdown: mockAccountsBreakdown,
  accountsSummary: mockBasicInvestmentSummary,
};

export const mockContributions: ContributionResponse = {
  data: {
    type: 'contributions',
    id: '43751',
    attributes: {
      totalContributions: 40,
      contributions: [
        { date: '2013-03-05T00:00:00', netContributionsToDate: 2000.0 },
        {
          date: '2013-03-21T00:00:00',
          netContributionsToDate: 3000.0,
        },
      ],
    },
  },
};

export const mockClientResponse: ClientResponse = {
  data: {
    type: 'contact',
    id: '283732',
    attributes: {
      contactId: 283732,
      clientNumber: '12837326',
      titleId: 13,
      title: 'Miss',
      firstName: 'FirstName',
      lastName: 'LastName',
      contactStatus: 'Hybrid',
      lastLoginDateTime: '2021-05-14T15:15:00',
      username: null,
      currentPassword: null,
      newPassword: null,
      dateOfBirth: '1973-02-25T00:00:00',
      clientTypeId: 1,
      clientType: 'Individual',
    },
    links: {
      self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/contact/283732',
    },
    relationships: {},
  },
  included: [
    {
      type: ClientAccountTypes.accounts,
      id: '20500',
      attributes: {
        accountId: 20500,
        accountName: 'ISA ',
        accountNumber: 'BI205006',
        accountStatus: 'Open',
        accountStatusId: 2,
        bestInvestAccount: 'ISA',
        capacityType: 'Execution Only',
        capacityTypeId: 3,
        ddMandateId: 244,
        hasIncomeAccount: false,
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/accounts/20500',
      },
      relationships: null,
    },
    {
      type: ClientAccountTypes.accounts,
      id: '20871',
      attributes: {
        accountId: 20871,
        accountName: 'SIPP ',
        accountNumber: 'BI208716',
        accountStatus: 'Open',
        accountStatusId: 2,
        bestInvestAccount: 'SIPP',
        capacityType: 'Execution Only',
        capacityTypeId: 3,
        ddMandateId: null,
        hasIncomeAccount: false,
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/accounts/20871',
      },
      relationships: null,
    },
  ],
};

export const mockMonthlySavingsResponse: MonthlySavingsResponse = {
  data: [
    {
      type: 'monthly-savings',
      id: '2121301',
      attributes: {
        monthlySavingId: 2121301,
        accountId: 20499,
        assetId: 3558,
        sedol: null,
        assetName: 'CASH',
        amount: 100,
        reInvest: true,
        isStandingOrder: false,
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/monthly-savings/2121301',
      },
      relationships: null,
    },
  ],
  included: null,
};

export const mockAccounts: ClientAccountItem[] = [
  {
    id: '12345',
    name: 'Investment Account ',
    type: 'accounts',
  },
  {
    id: '23456',
    name: 'ISA ',
    type: 'accounts',
  },
  {
    id: '34567',
    name: 'SIPP ',
    type: 'linked-accounts',
  },
];

export const mockInvestAccounts: AccountData[] = [
  {
    id: '12345',
    accountName: 'Investment Account ',
    accountCash: 100,
    accountTotalHoldings: 100,
    accountReturn: 0,
    accountReturnPercentage: 0,
  },
  {
    id: '23456',
    accountName: 'ISA ',
    accountCash: 139678.85,
    accountTotalHoldings: 545908.9554399999,
    accountReturn: 116295.09544,
    accountReturnPercentage: 40.11,
  },
  {
    id: '34567',
    accountName: 'SIPP ',
    accountTotalHoldings: 89367.174679,
    accountCash: 43543.26,
    accountReturn: 5954.074679,
    accountReturnPercentage: 14.93,
  },
];

export const mockInvestSummaryResponse: InvestmentSummaryResponse = {
  data: [
    {
      type: 'investment-summary',
      id: '12345',
      attributes: {
        funds: 0,
        shares: 0,
        cash: 100,
        cost: 0,
        gainLoss: 0,
        gainLossPercent: 0,
        lastUpdate: null,
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/investment-summary/12345',
      },
      relationships: null,
    },
    {
      type: 'investment-summary',
      id: '23456',
      attributes: {
        funds: 102122.61544,
        shares: 304107.49,
        cash: 139678.85,
        cost: 289935.01,
        gainLoss: 116295.09544,
        gainLossPercent: 40.11,
        lastUpdate: '2021-04-13T00:00:00',
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/investment-summary/23456',
      },
      relationships: null,
    },
    {
      type: 'investment-summary',
      id: '34567',
      attributes: {
        funds: 22764.184679,
        shares: 23059.73,
        cash: 43543.26,
        cost: 39869.84,
        gainLoss: 5954.074679,
        gainLossPercent: 14.93,
        lastUpdate: '2021-04-13T00:00:00',
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/investment-summary/34567',
      },
      relationships: null,
    },
  ],
  included: null,
};

export const mockBreakdownAllocation: BreakdownAllocationResponse = {
  data: {
    type: 'breakdown-allocation',
    id: '12345',
    attributes: {
      breakdown: [
        {
          name: 'Equity',
          percentage: 48,
        },
        {
          name: 'Quality Bonds',
          percentage: 1,
        },
        {
          name: 'High Yield Bonds',
          percentage: 0,
        },
        {
          name: 'Property',
          percentage: 0,
        },
        {
          name: 'Commodities',
          percentage: 0,
        },
        {
          name: 'Hedge',
          percentage: 0,
        },
        {
          name: 'Fund Cash',
          percentage: 2,
        },
        {
          name: 'Uninvested Cash',
          percentage: 49,
        },
      ],
    },
    links: {
      self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/breakdown-allocation/12345',
    },
    relationships: null,
  },
};
