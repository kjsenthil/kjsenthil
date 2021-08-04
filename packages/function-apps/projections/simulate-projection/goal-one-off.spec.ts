import { calculateOnTrackPercentage } from "./goal-one-off";
import { DrawdownType, RequestPayload } from "./types";

describe("Calculate on track percentage", () => {
    test("Calculate on track percentage should pass", () => {
      var currentDate = new Date();
      const validDateRequestPayload = createRequestPayload();
      validDateRequestPayload.timeHorizonToProject = 900;
      validDateRequestPayload.feesPercentage = 0.4;
      validDateRequestPayload.upfrontContribution = 50000;
      validDateRequestPayload.monthlyContribution = 624;
      validDateRequestPayload.preGoal.expectedReturnPercentage = 4.3;
      validDateRequestPayload.preGoal.volatilityPercentage = 16.37;
      validDateRequestPayload.preGoal.ZScoreLowerBound = -1.350641417;
      validDateRequestPayload.preGoal.ZScoreUpperBound = 1.26511912;
      validDateRequestPayload.currentNetContribution = 50000;
      validDateRequestPayload.currentPortfolioValue = 200000;
      validDateRequestPayload.drawdownType = DrawdownType.OneOff;
      validDateRequestPayload.drawdownOneOff = {
        targetAmount : 500000,
        targetDate : new Date(currentDate.setMonth(currentDate.getMonth()+344))
      }
      const result = calculateOnTrackPercentage(validDateRequestPayload, new Date());
      expect(result).toBe(227.66602562264245);
    });
  });

function createRequestPayload(): RequestPayload {
  return {
    timeHorizonToProject: 100,
    monthlyContribution: 500,
    currentNetContribution: 0,
    currentPortfolioValue: 0,
    includeGoal: false,
    preGoal: {
      expectedReturnPercentage: 10,
      volatilityPercentage: 4,
      ZScoreLowerBound: -1,
      ZScoreUpperBound: 20,
    }
  };
}