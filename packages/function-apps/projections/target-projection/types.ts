interface RequestPayload {
  timeToAge100: number,
  portfolioValue: number,
  desiredMonthlyDrawdown: number,
  drawdownStartDate: string,
  drawdownEndDate: string,
  upfrontContribution: number,
  preGoalExpectedReturn: number,
  feesPercentage: number,
  goalLumpSum: number,
  lumpSumDate: string,
  statePensionAmount: number,
  postGoalExpectedReturn: number,
  desiredValueAtEndOfDrawdown: number,
  monthlyContributions: number,
  includeStatePension: boolean
}

interface ValidationError {
  property: string;
  message: string;
  code: string;
}

interface ResponsePayload {
  upfrontContributionRequiredToFundDrawdown: number,
  monthlyContributionsRequiredToFundDrawdown: number,
  projections: ProjectionMonth[],
}

class ProjectionMonth {
  month: number;
  projectedValue: number;
  constructor(month: number, projectedValue: number) {
    this.month = month;
    this.projectedValue = projectedValue
  }
}

export type { RequestPayload, ResponsePayload, ValidationError }
export { ProjectionMonth }