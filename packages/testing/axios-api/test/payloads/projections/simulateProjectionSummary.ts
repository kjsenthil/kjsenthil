export default {
  timeHorizonToProject: 900,
  monthlyContribution: 624,
  currentPortfolioValue: 766,
  upfrontContribution: 0,
  currentNetContribution: 1000,
  includeGoal: true,
  preGoal: {
    expectedReturnPercentage: 4.3,
    volatilityPercentage: 16.37,
    ZScoreLowerBound: -1.350641417,
    ZScoreUpperBound: 1.26511912,
  },
  feesPercentage: 0.4,
  postGoal: {
    expectedReturnPercentage: 2.98,
    volatilityPercentage: 9.27,
    ZScoreLowerBound: -1.297734628,
    ZScoreUpperBound: 1.284789644,
  },
  drawdownType: 'Retirement',
  drawdownRetirement: {
    startDate: '2055-04-10',
    endDate: '2076-04-10',
    regularDrawdown: 7500,
    remainingAmount: 100000,
    lumpSum: {
      amount: 100000,
      date: '2055-04-10',
    },
  },
};
