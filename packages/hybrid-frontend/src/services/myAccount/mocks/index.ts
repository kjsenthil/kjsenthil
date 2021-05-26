import {
  AccountData,
  BreakDownAllocationResponse,
  ClientResponse,
  InvestmentSummaryResponse,
  MonthlySavingsResponse,
  MyAccountItem,
} from '../types';

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
      type: 'accounts',
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
      type: 'accounts',
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

export const mockAccounts: MyAccountItem[] = [
  {
    id: '12345',
    name: 'Investment Account ',
  },
  {
    id: '23456',
    name: 'ISA ',
  },
  {
    id: '34567',
    name: 'SIPP ',
  },
];

export const mockInvestAccounts: AccountData[] = [
  {
    id: '12345',
    accountName: 'Investment Account ',
    accountValue: 100,
  },
  {
    id: '23456',
    accountName: 'ISA ',
    accountValue: 545908.9554399999,
  },
  {
    id: '34567',
    accountName: 'SIPP ',
    accountValue: 89367.174679,
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

export const mockBreakdownAllocation: BreakDownAllocationResponse = {
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
