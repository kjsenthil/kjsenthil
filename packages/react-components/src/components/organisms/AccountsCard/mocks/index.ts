const periodReturn = {
  '7d': {
    value: 100,
    percent: 10,
  },
  '1m': {
    value: 100,
    percent: 10,
  },
  '3m': {
    value: 100,
    percent: 10,
  },
  '6m': {
    value: 100,
    percent: 10,
  },
  '1y': {
    value: 100,
    percent: 10,
  },
  '5y': {
    value: 100,
    percent: 10,
  },
};

const mockInvestmentAccountsCardData = [
  {
    id: '20499',
    accountType: 'accounts',
    accountName: 'Stocks and Shares ISA',
    accountTotalHoldings: 38382.29,
    accountTotalNetContribution: 31994.9,
    accountCash: 0.03,
    accountReturn: 6837.39,
    accountReturnPercentage: 1.761,
    accountInvestments: 123.23,
    accountLifetimeReturn: {
      value: 345.45,
      percent: 340,
    },
    periodReturn: {
      ...periodReturn,
      '5y': {
        value: 6837.39,
        percent: 1.761,
      },
    },
  },
];

export default mockInvestmentAccountsCardData;
