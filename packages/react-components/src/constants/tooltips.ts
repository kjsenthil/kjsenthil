export const StaticTooltips = {
  investments: 'The total current value of your investments.',
  totalValue: 'The total value of your investments and cash.',
  lifetimeReturn:
    'This shows how well your investments have performed since you first held them with Bestinvest. It includes returns from both growth and income, minus any fees.',
  linkedAccount:
    'These are accounts where someone else has given you view-only access. You can find out more about linked account in our FAQs.',
  annualisedReturn:
    'This shows the average return per year on each pound over the period it has been invested. So for example, a figure of 5% would mean that on average, every pound you have invested has grown by 5p per year. This is also known as the "money-weighted rate of return".',
  netContribution: 'Your total contributions minus any withdrawals you may have made.',
  retirementLength:
    'By the time you retire, the average UK life expectancy is predicted to be around 87 years of age. Most people retire at 65, giving an overall retirement of 22 years.',
  inflationRate:
    'This assumes an inflation rate of 2% per year between now and the date you start to take your money out.',
  pensionOptions:
    'You can find more information on options for taking your pension on the Government website here: https://www.gov.uk/personal-pensions-your-rights/how-you-can-take-pension',
  projectionProportion:
    "This is a projection of what proportion of your target you are on track to reach. If you aren't on track to reach your target then we'll tell you about your shortfall here.",
  projectionMonthly:
    "This is a projection of the monthly amount you'd be able to withdraw over the course of the retirement period you specified.",
  marketsUnderperform:
    "Using in-house data, we make forecast assumptions for the portfolio we map your investments against. We calculate the most likely return, and less likely outcomes. The chance of having less than this is 10% - one time in ten we'd expect a poorer outcome",
};

export const DataPeriodTooltip = (dataPeriod: string): string =>
  `The profit or loss you in the last ${dataPeriod.toLowerCase()}, minus any fees.`;
