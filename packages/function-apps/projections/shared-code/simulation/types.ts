export interface ExpectedReturns {
  monthlyNetExpectedReturn: number;
  monthlyVolatility: number;
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
}
