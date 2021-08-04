interface RequestPayload {
  timeHorizonToProject: number,
  feesPercentage?: number,
  upfrontContribution?: number,
  monthlyContribution: number,
  currentNetContribution: number,
  currentPortfolioValue: number,
  includeGoal: boolean,
  drawdownType?: DrawdownType,
  drawdownOneOff?: {
    targetAmount: number,
    targetDate: Date	
  },
  drawdownMonthly?: {
    amount: number,
	  startDate: Date,
	  endDate: Date
  },
  drawdownAnnually?: {
    amount: number,
	  startDate: Date,
	  endDate: Date
  },
  drawdownRetirement?: {
    regularDrawdown: number,
	  startDate: Date,
	  endDate: Date,
	  lumpSum?: {
      amount?: number,
	    date?: Date,
    },
    remainingAmount?: number,
	  statePensionAmount?: number,
  },
  preGoal: {
     expectedReturnPercentage: number,
     volatilityPercentage: number,
     ZScoreLowerBound: number,
     ZScoreUpperBound: number,
  }
  postGoal?: {
     expectedReturnPercentage: number,
     volatilityPercentage: number,
     ZScoreLowerBound: number,
     ZScoreUpperBound: number
  }
}

interface ValidationError {
  property: string;
  message: string;
  code: string;
}

interface ResponsePayload {
  projectionData: ProjectionMonth[],
  contributionData: ContributionMonth[],
  goal: {
    onTrack: {
      percentage: number,
      monthlyContributionsToReach?: number,
      upfrontContributionsToReach?: number,
      targetProjectionData?: TargetProjectionMonth[]
    },
    desiredDiscountedOutflow: number,
    affordableUnDiscountedOutflowAverage: number,
    shortfallSurplusAverage: number,
    affordableUndiscountedOutflowUnderperform: number,
    shortfallSurplusUnderperform: number,
    drawdownOneOff: {
      affordable: number,
      affordableUnderperform: number
    },
    drawdownMonthly: {
      affordable: number,
      affordableUnderperform: number
    },
    drawdownAnnual: {
      affordable: number,
      affordableUnderperform: number
    },
    drawdownRetirement: {
      affordable: {
      lumpSum: number,
       remainingAmount: number,
       drawdown: number,
       totalDrawdown: number
      },
      underperform: {
       lumpSum: number,
       remainingAmount: number,
       drawdown: number,
       totalDrawdown: number
      }
    }
  }
}

export interface ExpectedReturns {
  monthlyNetExpectedReturn: number;
  monthlyVolatility: number;
}

export interface Drawdown {
  possibleDrawdown: number;
  projectedGoalAgeTotal: number;
  remainingAmountAtGoalAge: number;
}

export interface Stats {
  desiredOutflow: number;
  affordableDrawdown: number;
  affordableLumpSum: number;
  affordableRemainingAmount: number;
  affordableOutflow: number;
  surplusOrShortfall: number;
  valueAtRetirement: number;
  totalAffordableDrawdown: number;
  onTrackPercentage: number;
  projectedGoalAgeTotal: number;
  possibleDrawdown: number;
}

class ProjectionMonth {
  constructor(public monthNo: number, public lower: number, public average: number, public upper: number) {
    this.lower = lower < 0 ? 0 : lower;
    this.upper = upper < 0 ? 0 : upper;
    this.average = average < 0 ? 0 : average;
  }
}

class ContributionMonth {
  constructor(public monthNo: number, public value: number) {
  }
}

class TargetProjectionMonth {
  constructor(public monthNo: number, public value: number) {
  }
}

enum DrawdownType {
  OneOff = "One-off", 
  Monthly = "Monthly",
  Annual = "Annual",
  Retirement = "Retirement"
}

export type { RequestPayload, ResponsePayload, ValidationError }
export { ContributionMonth, DrawdownType, ProjectionMonth, TargetProjectionMonth }