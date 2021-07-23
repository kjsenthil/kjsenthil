
interface RequestPayload {
    timeHorizon: number;
    monthlyContributions: number;
    portfolioCurrentValue: number
    desiredMonthlyDrawdown: number;
    drawdownStartDate: string;
    drawdownEndDate: string;
    upfrontContribution: number;
    preGoalExpectedReturn: number;
    preGoalExpectedVolatility: number;
    preGoalZScoreLowerBound: number;
    preGoalZScoreUpperBound: number;
    feesPercentage: number;
    lumpSumAmount: number;
    lumpSumDate: string;
    statePensionAmount: number;
    desiredAmount: number;
    postGoalExpectedReturn: number;
    postGoalExpectedVolatility: number
    postGoalZScoreLowerBound: number;
    postGoalZScoreUpperBound: number;
    netContribution: number;
    isConeGraph: boolean;
    includeStatePension: boolean;
}

interface ResponsePayload extends Stats {
    marketUnderperform: Stats;
    projections: ProjectionMonth[];
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
    month: number;
    lowerBound: number;
    upperBound: number;
    projectedValue: number;
    contributionLine: number;

    constructor(month: number, projectedValue: number, contributionLine: number, isCone: boolean, lowerBound?: number, upperBound?: number) {
        this.month = month;
        this.projectedValue = projectedValue < 0 ? 0 : projectedValue;
        this.contributionLine = contributionLine;
        if (isCone) {
            if (lowerBound === undefined || upperBound === undefined) {
                throw new Error(`Error constructing month ${month}: lowerBound and upperBound must be provided when isCone is true`)
            }
            this.lowerBound = lowerBound < 0 ? 0 : lowerBound;
            this.upperBound = upperBound < 0 ? 0 : upperBound;
        } else {
            this.lowerBound = this.projectedValue;
            this.upperBound = this.projectedValue;
        }
    }
}


export interface ValidationError {
    property: string;
    message: string;
    code: string;

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

export type { RequestPayload, ResponsePayload }
export { ProjectionMonth }
