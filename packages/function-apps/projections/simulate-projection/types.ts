interface RequestPayload {
  timeHorizonToProject: number;
  feesPercentage?: number;
  upfrontContribution?: number;
  monthlyContribution: number;
  currentNetContribution: number;
  currentPortfolioValue: number;
  includeGoal: boolean;
  drawdownType?: DrawdownType;
  drawdownOneOff?: {
    targetAmount: number;
    targetDate: string;
  };
  drawdownMonthly?: {
    amount: number;
    startDate: string;
    endDate: string;
  };
  drawdownAnnually?: {
    amount: number;
    startDate: string;
    endDate: string;
  };
  drawdownRetirement?: {
    regularDrawdown: number;
    startDate: string;
    endDate: string;
    lumpSum?: {
      amount?: number;
      date?: string;
    };
    remainingAmount?: number;
    statePensionAmount?: number;
  };
  preGoal: {
    expectedReturnPercentage: number;
    volatilityPercentage: number;
    ZScoreLowerBound: number;
    ZScoreUpperBound: number;
  };
  postGoal?: {
    expectedReturnPercentage: number;
    volatilityPercentage: number;
    ZScoreLowerBound: number;
    ZScoreUpperBound: number;
  };
}

interface ValidationError {
  property: string;
  message: string;
  code: string;
}

interface ResponsePayload {
  projectionData: ProjectionMonth[];
  contributionData: ContributionMonth[];
  goal: {
    onTrack: {
      percentage: number;
      monthlyContributionsToReach?: number;
      upfrontContributionsToReach?: number;
      targetProjectionData?: TargetProjectionMonth[];
    };
    desiredDiscountedOutflow: number;
    affordableUnDiscountedOutflowAverage: number;
    shortfallSurplusAverage: number;
    affordableUndiscountedOutflowUnderperform: number;
    shortfallSurplusUnderperform: number;
    drawdownOneOff: {
      affordable: number;
      affordableUnderperform: number;
    };
    drawdownMonthly: {
      affordable: number;
      affordableUnderperform: number;
    };
    drawdownAnnual: {
      affordable: number;
      affordableUnderperform: number;
    };
    drawdownRetirement: {
      affordable: {
        lumpSum: number;
        remainingAmount: number;
        drawdown: number;
        totalDrawdown: number;
      };
      underperform: {
        lumpSum: number;
        remainingAmount: number;
        drawdown: number;
        totalDrawdown: number;
      };
    };
  };
}

interface GoldProjectionResponse {
  monthlyContributionsToReach?: number;
  upfrontContributionsToReach?: number;
  targetProjectionData?: TargetProjectionMonth[];
}

class ProjectionMonth {
  constructor(
    public monthNo: number,
    public lower: number,
    public average: number,
    public upper: number
  ) {
    this.lower = lower < 0 ? 0 : lower;
    this.upper = upper < 0 ? 0 : upper;
    this.average = average < 0 ? 0 : average;
  }
}

class ContributionMonth {
  constructor(public monthNo: number, public value: number) {}
}

class TargetProjectionMonth {
  constructor(public monthNo: number, public value: number) {}
}

enum DrawdownType {
  OneOff = "One-off",
  Monthly = "Monthly",
  Annual = "Annual",
  Retirement = "Retirement",
}

export type {
  RequestPayload,
  ResponsePayload,
  ValidationError,
  GoldProjectionResponse,
};
export {
  ContributionMonth,
  DrawdownType,
  ProjectionMonth,
  TargetProjectionMonth,
};
