interface RequestPayload {
  timeToAge100: number,
  preGoalRiskModel: string,
  portfolioValue: number,
  desiredMonthlyDrawdown: number,
  drawdownStartDate: string,
  drawdownEndDate: string,
  upfrontContribution: number,
  preGoalExpectedReturn: number,
  preGoalVolatility: number,
  feesPercentage: number,
  postGoalRiskModel: string,
  goalLumpSum: number,
  lumpSumDate: string,
  statePensionAmount: number,
  postGoalExpectedReturn: number,
  postGoalVolatility: number,
  desiredValueAtEndOfDrawdown: number,
  includeStatePension: boolean
}

interface ValidationError {
  property: string;
  message: string;
  code: string;
}

interface ResponsePayload {
  targetGoalAmount: number,
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