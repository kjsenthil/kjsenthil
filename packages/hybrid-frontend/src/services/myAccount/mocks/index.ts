import {
  InvestmentAccount,
  InvestmentAccountData,
  InvestmentAccountLifetimeReturnAndPercentage,
  PerformanceDataPeriod,
  PeriodReturn,
} from '@tswdts/react-components';
import { ClientAccountTypes } from '../../types';
import {
  InvestmentAccountDetailsResponse,
  BreakdownAllocationResponse,
  ClientResponse,
  NetContributionResponse,
  InvestmentSummaryResponse,
  MonthlySavingsResponse,
  ClientAccountItem,
  BasicInvestmentSummary,
  IsaContributionResponse,
  AccountState,
  BankAccountDetailsResponse,
} from '../types';

export const mockBasicInvestmentSummary: BasicInvestmentSummary = {
  totalGainLoss: 4582.13,
  totalGainLossPercentage: 93.56,
  totalInvested: 9489.37,
};

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

const accountLifetimeReturn: InvestmentAccountLifetimeReturnAndPercentage = {
  value: 543.26,
  percent: 54,
};

export const mockInvestmentAccounts: InvestmentAccount[] = [
  {
    id: '12345',
    accountType: 'accounts',
    accountTotalNetContribution: 3000,
    accountName: 'Investment Account',
    accountCash: 100,
    accountTotalHoldings: 100,
    accountReturn: 0,
    accountReturnPercentage: 0,
    accountInvestments: 0,
    accountLifetimeReturn,
    periodReturn,
  },
  {
    id: '23456',
    accountType: 'accounts',
    accountTotalNetContribution: 4000,
    accountName: 'Stocks & Shares ISA',
    accountCash: 139678.85,
    accountTotalHoldings: 545908.9554399999,
    accountReturn: 116295.09544,
    accountReturnPercentage: 40.11,
    accountInvestments: 139678.85,
    accountLifetimeReturn,
    periodReturn,
  },
  {
    id: '34567',
    accountType: 'linked-accounts',
    accountTotalNetContribution: 5000,
    accountName: 'Self-invested Personal Pension',
    accountTotalHoldings: 89367.174679,
    accountCash: 43543.26,
    accountReturn: 5954.074679,
    accountReturnPercentage: 14.93,
    accountInvestments: 43543.26,
    accountLifetimeReturn,
    periodReturn,
  },
];

export const mockNetContributions: NetContributionResponse = {
  data: {
    type: 'net-contributions',
    id: '43751',
    attributes: {
      totalContributions: 40,
      netContributions: [
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
    {
      type: ClientAccountTypes.accounts,
      id: '20499',
      attributes: {
        accountId: 20499,
        accountName: 'Investment Account ',
        accountNumber: 'BI204993',
        accountStatus: 'Open',
        accountStatusId: 2,
        bestInvestAccount: 'GIA',
        capacityType: 'Execution Only',
        capacityTypeId: 3,
        ddMandateId: 244,
        hasIncomeAccount: false,
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/accounts/20499',
      },
      relationships: null,
    },
    {
      type: ClientAccountTypes.addresses,
      id: '325871',
      attributes: {
        contactId: 2232036,
        addressId: 325871,
        addressLine1: '37 Church Road',
        addressLine2: 'Watford',
        addressLine3: '',
        addressLine4: '',
        addressLine5: '',
        town: 'Hertfordshire',
        county: '',
        postCode: 'WD17 4PY',
        countryId: 80,
        countryCode: 'GB',
        country: 'United Kingdom',
        addressTypeId: 1,
        addressType: 'Office',
        principal: true,
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/addresses/325871',
      },
      relationships: null,
    },
    {
      type: ClientAccountTypes.emails,
      id: '321507',
      attributes: {
        contactId: 2232036,
        emailId: 321507,
        emailAddress: 'dg_web@bestinvest.co.uk',
        emailTypeId: 1,
        emailType: 'Home',
        principal: true,
        defaultEmail: false,
        updateBy: '',
      },
      links: {
        self: 'https://myaccountsapi.demo2.bestinvest.co.uk/api/emails/321507',
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

export const mockBasicInvestmentAccounts: ClientAccountItem[] = [
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

export const mockInvestmentAccountsData: InvestmentAccountData[] = [
  {
    id: '12345',
    accountName: 'Investment Account ',
    accountCash: 100,
    accountTotalHoldings: 100,
    accountReturn: 0,
    accountReturnPercentage: 0,
    accountInvestments: 0,
  },
  {
    id: '23456',
    accountName: 'ISA ',
    accountCash: 139678.85,
    accountTotalHoldings: 545908.9554399999,
    accountReturn: 116295.09544,
    accountReturnPercentage: 40.11,
    accountInvestments: 139678.85,
  },
  {
    id: '34567',
    accountName: 'SIPP ',
    accountTotalHoldings: 89367.174679,
    accountCash: 43543.26,
    accountReturn: 5954.074679,
    accountReturnPercentage: 14.93,
    accountInvestments: 43543.26,
  },
];

export const mockInvestmentSummaryResponse: InvestmentSummaryResponse = {
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

export const mockIsaContribution: IsaContributionResponse = {
  data: {
    type: 'isa-contributions',
    id: '',
    attributes: {
      allowance: 20000,
      contributions: 1000,
    },
  },
};

export const mockInvestmentAccountDetails: InvestmentAccountDetailsResponse = {
  data: {
    type: 'accounts',
    id: '20500',
    attributes: {
      accountId: 20500,
      accountName: 'ISA',
      accountNumber: 'BI205006',
      accountStatus: 'Open',
      accountStatusId: 2,
      bestInvestAccount: 'ISA',
      capacityType: 'Execution Only',
      capacityTypeId: 3,
      dDMandateId: 68826,
      hasIncomeAccount: false,
    },
    links: {
      self: 'https://localhost:44313/api/accounts/20500',
    },
  },
  included: [
    {
      type: 'cash-position',
      id: '20500',
      attributes: {
        cashOnAccount: 3006.86,
        cashAvailableToInvest: 2288.86,
        cashAvailableToInvestInEquity: 0.0,
        cashAvailableToWithdraw: 1240.36,
        cashOnAccountIncome: 0.0,
      },
    },
    {
      type: 'asset-info',
      id: 'GB00BH4HKS39',
      attributes: {
        assetId: 16184,
        assetName: 'VODAFONE GROUP',
        isin: 'GB00BH4HKS39',
        sedol: 'BH4HKS3',
        epic: 'VOD',
        price: 1.4832,
        priceDateTime: '2021-08-26T13:33:34.309',
      },
    },
  ],
};

export const mockAccountState: AccountState = {
  account: {
    id: '20500',
    accountType: 'isa',
    accountNumber: 'BI20500',
    accountTotalNetContribution: 10000,
    accountLifetimeReturn: {
      value: 10000,
      percent: 20,
    },
    periodReturn,
    accountName: '',
    accountCash: 5000,
    accountReturn: 1500,
    accountReturnPercentage: 20,
    accountTotalHoldings: 5500,
  },
  status: 'idle',
};

export const mockBankAccountDetailsResponse: BankAccountDetailsResponse = {
  data: {
    type: 'bank-details',
    id: '20500',
    attributes: {
      bankAccountName: 'Mr John Doe',
      bankAccountNumber: '12345678',
      bankSortCode: '123456',
      withdrawMoneyAllowed: true,
      contactId: 123456,
    },
  },
};
