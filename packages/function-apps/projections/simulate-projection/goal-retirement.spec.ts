import { Context } from "@azure/functions";
import { calculateContribution, calculateDrawdown, calculateExpectedReturn, calculateHoldingsWithOnTrackPercentage, calculatePercentage, calculateProjectionValue, getRetirementTealProjectionRecursive } from "./goal-retirement";
import { ContributionMonth, Drawdown, DrawdownType, ExpectedReturns, ProjectionMonth, RequestPayload } from "./types";

describe("Tests for getRetirementTealProjectionRecursive Function", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });

  it("should return expected results when lump sum date is before drawdown start date ", async () => {
    // Arrange
    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      upfrontContribution: 0,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912
      },
      feesPercentage: 0.4,
      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644
      },
      drawdownType: DrawdownType.Retirement,
      drawdownRetirement: {
        startDate: new Date("2055-04-10"),
        endDate: new Date("2076-04-10"),
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: new Date("2040-04-10")
        }
      }
    } as RequestPayload;

    // Action
    const result = getRetirementTealProjectionRecursive(inboundPayload, new Date("July 05,2021"));

    // Assertion
    expect(result.goal.onTrack.percentage).toBeCloseTo(0.8350, 4);
    expect(result.goal.desiredDiscountedOutflow).toBeCloseTo(2097500);
    expect(result.goal.affordableUnDiscountedOutflowAverage).toBeCloseTo(1751360.57, 2);
    expect(result.goal.drawdownRetirement.affordable.drawdown).toBeCloseTo(6262.31, 2);
    expect(result.goal.drawdownRetirement.affordable.lumpSum).toBeCloseTo(83497.52, 2);
    expect(result.projectionData.length).toBeCloseTo(901);
    //underperform
    expect(result.goal.drawdownRetirement.underperform.drawdown).toBeCloseTo(3110.55, 2);
    expect(result.goal.drawdownRetirement.underperform.lumpSum).toBeCloseTo(41473.96, 2);


    expect(result.projectionData[0]).toEqual(
      {
        monthNo: 0,
        lower: 250000,
        average: 250000,
        upper: 250000
      } as ProjectionMonth);

    expect(result.contributionData[0]).toEqual(
      {
        monthNo:0,
        value: 1000
      } as ContributionMonth);

    expect(result.projectionData[1]).toEqual(
      {
        monthNo: 1,
        lower: 235465.81038991973,
        average: 251422.32845197053,
        upper: 266368.48354157555
      } as ProjectionMonth);

    expect(result.contributionData[1]).toEqual(
      {
          monthNo:1,
          value: 1624
      } as ContributionMonth);

    //just before  lump sum start
    expect(result.projectionData[224]).toEqual({
      monthNo: 224,
      lower: 417562.7172793837,
      average: 714327.2998455743,
      upper: 985019.5795674027
    } as ProjectionMonth);

    expect(result.contributionData[224]).toEqual(
      {
          monthNo:224,
          value: 140776
      } as ContributionMonth);

    //just after lump sum
    expect(result.projectionData[225]).toEqual({
      monthNo: 225,
      lower: 334819.59959494777,
      average: 633470.2056447117,
      upper: 906488.2535895858,
    } as ProjectionMonth);

    expect(result.contributionData[225]).toEqual(
      {
          monthNo:225,
          value: 57902.47573852539
      } as ContributionMonth);

    expect(result.projectionData[226]).toEqual({
      monthNo: 226,
      lower: 336339.6403310231,
      average: 638772.3962376652,
      upper: 916470.9875307771
    } as ProjectionMonth);


    expect(result.contributionData[226]).toEqual(
      {
          monthNo:226,
          value: 58526.47573852539
      } as ContributionMonth);

    expect(result.projectionData[405]).toEqual(
      {
        monthNo: 405,
        lower: 620229.4409289613,
        average: 1272404.9252367339,
        upper: 1989726.6866230138
      } as ProjectionMonth);


    expect(result.contributionData[405]).toEqual(
      {
          monthNo:405,
          value: 163336.1614189148
      } as ContributionMonth);

    //after drawdown start
    expect(result.projectionData[407]).toEqual(
      {
        monthNo: 407,
        lower: 609247.6550393509,
        average: 1265253.7812876487,
        upper: 1988139.4335948436,
      } as ProjectionMonth);

    expect(result.contributionData[407]).toEqual(
      {
          monthNo:407,
          value: 150811.5327796936
        } as ContributionMonth);
  
    //target month
    expect(result.projectionData[657]).toEqual(
      {
        monthNo: 657,
        lower: 0,
        average: 83497.92273923039,
        upper: 1591333.7049422842,
      } as ProjectionMonth);

    expect(result.contributionData[657]).toEqual(
      {
          monthNo:657,
          value: -1414767.0471229553
        } as ContributionMonth);
      
    expect(result.projectionData[658]).toEqual(
      {
        monthNo: 658,
        lower: 0,
        average: 0.39932451606410596,
        upper: 1588916.164137102,
      } as ProjectionMonth);

    expect(result.contributionData[658]).toEqual(
      {
          monthNo:658,
          value: -1504526.8857040405
      } as ContributionMonth);

    expect(result.projectionData[900]).toEqual(
      {
        monthNo: 900,
        upper: 765330.010170457,
        lower: 0,
        average: 0,
      } as ProjectionMonth);

    expect(result.contributionData[900]).toEqual(
      {
            monthNo:900,
            value: -3020006.9510498047
        } as ContributionMonth);
  });

  it("should return expected results when lump sum date is past date", async () => {
    // Arrange
    const today = new Date("2021-07-13");
    const pastDate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      drawdownRetirement:{
        regularDrawdown: 7500,
        startDate: new Date("2055-04-10"),
        endDate: new Date("2076-04-10"),
        remainingAmount: 100000,
        lumpSum:{
          amount:100000,
          date: new Date(pastDate)
        }
      },
      upfrontContribution: 0,
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
        ZScoreUpperBound: 1.284789644
      },
      currentNetContribution: 1000,
      includeGoal: true,
      drawdownType: DrawdownType.Retirement
    } as RequestPayload;

    // Action

    const result = getRetirementTealProjectionRecursive(inboundPayload, today);

    // Assertion
    expect(result.goal.onTrack.percentage).toEqual(0.9255373477935791);
    expect(result.goal.desiredDiscountedOutflow).toEqual(2097500);

    expect(result.goal.drawdownRetirement.affordable.drawdown).toBeCloseTo(6941.53, 2);
    expect(result.goal.drawdownRetirement.affordable.lumpSum).toBeCloseTo(92553.73, 2);
    expect(result.projectionData.length).toBeCloseTo(901);

    //underperform
    expect(result.goal.drawdownRetirement.underperform.drawdown).toBeCloseTo(4428.09, 2);
    expect(result.goal.drawdownRetirement.underperform.lumpSum).toBeCloseTo(59041.26, 2);

    expect(result.projectionData[0]).toEqual(
      {
        monthNo: 0,
        lower: 250000,
        average: 250000,
        upper: 250000
      } as ProjectionMonth);

    expect(result.contributionData[0]).toEqual(
      {
        monthNo:0,
        value: 1000
      } as ContributionMonth);

    expect(result.projectionData[1]).toEqual(
      {
        monthNo: 1,
        lower: 235465.81038991973,
        average: 251422.32845197053,
        upper: 266368.48354157555
      } as ProjectionMonth);

    expect(result.contributionData[1]).toEqual(
      {
        monthNo:1,
        value: 1624
      } as ContributionMonth);

    //just before  lump sum start
    expect(result.projectionData[224]).toEqual({
      monthNo: 224,
      lower: 417562.7172793837,
      average: 714327.2998455743,
      upper: 985019.5795674027
    } as ProjectionMonth);

  expect(result.contributionData[224]).toEqual(
    {
      monthNo:224,
      value: 140776
    } as ContributionMonth);

    //just after lump sum
    expect(result.projectionData[225]).toEqual({
      monthNo: 225,
      lower: 419609.9961708655,
      average: 717232.3710755184,
      upper: 988698.4854539612,
    } as ProjectionMonth);

    expect(result.contributionData[225]).toEqual(
      {
        monthNo:225,
        value: 141400
      } as ContributionMonth);

    expect(result.projectionData[226]).toEqual({
      monthNo: 226,
      lower: 421667.67069273203,
      average: 720146.7191095338,
      upper: 992385.7950017868,
    } as ProjectionMonth);

    expect(result.contributionData[226]).toEqual(
      {
        monthNo:226,
        value: 142024
      } as ContributionMonth);

    expect(result.projectionData[254]).toEqual({
      monthNo: 254,
      lower: 483606.8353890391,
      average: 805637.7550093164,
      upper: 1099184.177155734,
    } as ProjectionMonth);

    expect(result.contributionData[254]).toEqual(
      {
        monthNo:254,
        value: 151930.46989154816
      } as ContributionMonth);


    //after drawdown start
    expect(result.projectionData[403]).toEqual(
      {
        monthNo: 403,
        lower: 978472.1399793173,
        average: 1414361.4897820344,
        upper: 1812720.1353594651,
      } as ProjectionMonth);

      expect(result.contributionData[403]).toEqual(
        {
          monthNo:403,
          value: -882357.5162677765,
        } as ContributionMonth);

    //target month
    expect(result.projectionData[600]).toEqual(
      {
        monthNo: 600,
        lower: 0,
        average: 449079.53834706655,
        upper: 1245345.5753395925,
      } as ProjectionMonth);

      expect(result.contributionData[600]).toEqual(
        {
          monthNo:600,
          value: -2249838.9476327896,
        } as ContributionMonth);


    expect(result.projectionData[657]).toEqual(
      {
        monthNo: 657,
        lower: 0,
        average: 0,
        upper: 1006819.6731505602,
      } as ProjectionMonth);

      expect(result.contributionData[657]).toEqual(
        {
          monthNo:657,
          value: -2738059.8985939026,
        } as ContributionMonth);

    expect(result.projectionData[658]).toEqual(
      {
        monthNo: 658,
        lower: 0,
        average: 0,
        upper: 1002303.4628256634,
      } as ProjectionMonth);

      expect(result.contributionData[658]).toEqual(
        {
          monthNo:658,
          value:-2745001.4287023544,
        } as ContributionMonth);

    expect(result.projectionData[900]).toEqual(
      {
        monthNo: 900,
        upper: 0,
        lower: 0,
        average: 0,
      } as ProjectionMonth);

      expect(result.contributionData[900]).toEqual(
        {
          monthNo:900,
          value:-4424851.7149477005,
        } as ContributionMonth);
  });

  it("should return expected results when lump sum date is past date with state pension", async () => {
    // Arrange
    const today = new Date("2021-07-13");
    const pastDate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        regularDrawdown: 7500,
        startDate: new Date("2055-04-10"),
        endDate: new Date("2076-04-10"),
        lumpSum:{
          amount: 100000,
          date: new Date(pastDate)
        },
        remainingAmount: 100000,
        statePensionAmount: 10000
      },
      upfrontContribution: 0,
      preGoal: {
        expectedReturnPercentage: 4.3,
        volatilityPercentage: 16.37,
        ZScoreLowerBound: -1.350641417,
        ZScoreUpperBound: 1.26511912
      },
      feesPercentage: 0.4,
      postGoal: {
        expectedReturnPercentage: 2.98,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297734628,
        ZScoreUpperBound: 1.284789644,
      },
      currentNetContribution: 1000,
      includeGoal: true,
      drawdownType: DrawdownType.Retirement
    } as RequestPayload;

    // Action

    const result = getRetirementTealProjectionRecursive(inboundPayload, today);

    // Assertion
    expect(result.goal.onTrack.percentage).toEqual(1.0362753868103027);
    expect(result.goal.desiredDiscountedOutflow).toBeCloseTo(1886666.67, 2);
    expect(result.goal.drawdownRetirement.affordable.drawdown).toBeCloseTo(6908.50, 2);
    expect(result.goal.drawdownRetirement.affordable.lumpSum).toBeCloseTo(103627.54, 2);
    expect(result.projectionData.length).toBeCloseTo(901);

    //underperform
    expect(result.goal.drawdownRetirement.underperform.drawdown).toBeCloseTo(4405.57, 2);
    expect(result.goal.drawdownRetirement.underperform.lumpSum).toBeCloseTo(66083.53, 2);

    expect(result.projectionData[0]).toEqual(
      {
        monthNo: 0,
        lower: 250000,
        average: 250000,
        upper: 250000
      } as ProjectionMonth);

      expect(result.contributionData[0]).toEqual(
        {
          monthNo:0,
          value:1000,
        } as ContributionMonth);

    expect(result.projectionData[1]).toEqual(
      {
        monthNo: 1,
        lower: 235465.81038991973,
        average: 251422.32845197053,
        upper: 266368.48354157555
      } as ProjectionMonth);

      expect(result.contributionData[1]).toEqual(
        {
          monthNo:1,
          value:1624,
        } as ContributionMonth);

    //just before  lump sum start
    expect(result.projectionData[224]).toEqual({
      monthNo: 224,
      lower: 417562.7172793837,
      average: 714327.2998455743,
      upper: 985019.5795674027
    } as ProjectionMonth);

    expect(result.contributionData[224]).toEqual(
      {
        monthNo:224,
        value:140776,
      } as ContributionMonth);

    //just after lump sum
    expect(result.projectionData[225]).toEqual({
      monthNo: 225,
      lower: 419609.9961708655,
      average: 717232.3710755184,
      upper: 988698.4854539612,
    } as ProjectionMonth);

    expect(result.contributionData[225]).toEqual(
      {
        monthNo:225,
        value:141400,
      } as ContributionMonth);

    expect(result.projectionData[226]).toEqual({
      monthNo: 226,
      lower: 421667.67069273203,
      average: 720146.7191095338,
      upper: 992385.7950017868,
    } as ProjectionMonth);

    expect(result.contributionData[226]).toEqual(
      {
        monthNo:226,
        value:142024,
      } as ContributionMonth);

  });

  it("should return expected results when drawdown already started", async () => {
    // Arrange
    const today = new Date("2021-07-13");
    const pastDate = new Date(new Date().setDate(today.getDate() - 1)).toISOString().slice(0, 10);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      drawdownRetirement: {
        startDate: new Date(pastDate),
        endDate: new Date("2076-04-10"),
        lumpSum: {
          date: new Date(pastDate),
          amount: 100000
        },
        regularDrawdown: 7500,
        remainingAmount: 100000
      },     
      upfrontContribution: 0,
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

      currentNetContribution: 1000,
      includeGoal: true,
      drawdownType: DrawdownType.Retirement
    } as RequestPayload;

    // Action

    const result = getRetirementTealProjectionRecursive(inboundPayload, today);

    // Assertion
    expect(result.goal.onTrack.percentage).toEqual(0.093178391456604);
    expect(result.goal.desiredDiscountedOutflow).toEqual(5120000);
    expect(result.goal.drawdownRetirement.affordable.drawdown).toBeCloseTo(698.84, 2);
    expect(result.goal.drawdownRetirement.affordable.lumpSum).toBeCloseTo(9317.84, 2);
    expect(result.projectionData.length).toBeCloseTo(901);
    //underperform
    expect(result.goal.drawdownRetirement.underperform.drawdown).toBeCloseTo(274.44, 2);
    expect(result.goal.drawdownRetirement.underperform.lumpSum).toBeCloseTo(3659.20, 2);

    expect(result.projectionData[0]).toEqual(
      {
        monthNo: 0,
        lower: 250000,
        average: 250000,
        upper: 250000
      } as ProjectionMonth);

      expect(result.contributionData[0]).toEqual(
        {
          monthNo:0,
          value:1000,
        } as ContributionMonth);

    expect(result.projectionData[1]).toEqual(
      {
        monthNo: 1,
        lower: 241173.28824305325,
        average: 249830.9239397488,
        upper: 258402.1991794191,
      } as ProjectionMonth);


      expect(result.contributionData[1]).toEqual(
        {
          monthNo:1,
          value:301.16206407546997,
        } as ContributionMonth);


    expect(result.projectionData[225]).toEqual({
      monthNo: 225,
      lower: 8069.200342094546,
      average: 201287.94495424282,
      upper: 601076.8396010052,
    } as ProjectionMonth);

    
    expect(result.contributionData[225]).toEqual(
      {
        monthNo:225,
        value:-156238.53558301926,
      } as ContributionMonth);

    expect(result.projectionData[226]).toEqual({
      monthNo: 226,
      lower: 7373.280363342761,
      average: 201015.3563815136,
      upper: 602393.1771085584,
    } as ProjectionMonth);


    expect(result.contributionData[226]).toEqual(
      {
        monthNo:226,
        value:-156937.3735189438,
      } as ContributionMonth);

    expect(result.projectionData[254]).toEqual({
      monthNo: 254,
      lower: 0,
      average: 193143.14145325872,
      upper: 639782.8246141373,
    } as ProjectionMonth);

    expect(result.contributionData[254]).toEqual(
      {
        monthNo:254,
        value:-176504.83572483063,
      } as ContributionMonth);

    //after drawdown start
    expect(result.projectionData[403]).toEqual(
      {
        monthNo: 403,
        lower: 0,
        average: 142390.6504279485,
        upper: 863782.9411291314,
      } as ProjectionMonth);

      expect(result.contributionData[403]).toEqual(
        {
          monthNo:403,
          value:-280631.6881775856,
        } as ContributionMonth);

    //target month
    expect(result.projectionData[600]).toEqual(
      {
        monthNo: 600,
        lower: 0,
        average: 45210.9387975561,
        upper: 1262448.2646806587,
      } as ProjectionMonth);


      expect(result.contributionData[600]).toEqual(
        {
          monthNo:600,
          value:-418302.761554718,
        } as ContributionMonth);

    expect(result.projectionData[900]).toEqual(
      {
        monthNo: 900,
        upper: 2261123.1315051867,
        lower: 0,
        average: 0,
      } as ProjectionMonth);

      expect(result.contributionData[900]).toEqual(
        {
          monthNo:900,
          value:-637271.9814777374,
        } as ContributionMonth);
  });
});
  
  describe("tests for calculateDrawdown function", () => {
    it("should return expected value when state pension is false", () => {
      const preGoalMonthlyNetExpectedReturn = 0.0031933138078821255;
      const goalContributingPeriod = 404;
      const portfolioCurrentValue = 250000;
      const upfrontContribution = 0;
      const monthlyContributions = 624;
      const remainingAmount = 0;
      const lumpSumAmount = 0.1;
      const postGoalMonthlyNetExpectedReturn = 0.0021249875904596482;
      const goalDrawdownPeriod = 253;
      const statePensionAmount: number = null;
      expect(
        calculateDrawdown(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions, remainingAmount, lumpSumAmount, postGoalMonthlyNetExpectedReturn, goalDrawdownPeriod, statePensionAmount))
        .toEqual(
          {
            possibleDrawdown: 7243.810933644129,
            projectedGoalAgeTotal: 1419501.989856692,
            remainingAmountAtGoalAge: 0
          } as Drawdown);
    });
  
    it("should return expected value when state pension is true with zero state pension amount", () => {
      const preGoalMonthlyNetExpectedReturn = 0.0031933138078821255;
      const goalContributingPeriod = 404;
      const portfolioCurrentValue = 250000;
      const upfrontContribution = 0;
      const monthlyContributions = 624;
      const remainingAmount = 0;
      const lumpSumAmount = 0.1;
      const postGoalMonthlyNetExpectedReturn = 0.0021249875904596482;
      const goalDrawdownPeriod = 253;
      const statePensionAmount = 0;
      expect(
        calculateDrawdown(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions, remainingAmount, lumpSumAmount, postGoalMonthlyNetExpectedReturn, goalDrawdownPeriod, statePensionAmount))
        .toEqual(
          {
            possibleDrawdown: 7243.810933644129,
            projectedGoalAgeTotal: 1419501.989856692,
            remainingAmountAtGoalAge: 0
          } as Drawdown);
    });
  
    it("should return expected value when state pension is true with state pension amount more than zero", () => {
      const preGoalMonthlyNetExpectedReturn = 0.0031933138078821255;
      const goalContributingPeriod = 404;
      const portfolioCurrentValue = 250000;
      const upfrontContribution = 0;
      const monthlyContributions = 624;
      const remainingAmount = 0;
      const lumpSumAmount = 0.1;
      const postGoalMonthlyNetExpectedReturn = 0.0021249875904596482;
      const goalDrawdownPeriod = 253;
      const statePensionAmount = 10000;
      expect(
        calculateDrawdown(preGoalMonthlyNetExpectedReturn, goalContributingPeriod, portfolioCurrentValue, upfrontContribution, monthlyContributions, remainingAmount, lumpSumAmount, postGoalMonthlyNetExpectedReturn, goalDrawdownPeriod, statePensionAmount))
        .toEqual(
          {
            possibleDrawdown: 8077.144266977462,
            projectedGoalAgeTotal: 1419501.989856692,
            remainingAmountAtGoalAge: 0
          } as Drawdown);
    });
  });
  
  describe("tests for calculatePercentage function", () => {
    it("should return valid percentage", () => {
      expect(
        calculatePercentage(10, 10, 1000, 0.0537, 0.101296240386098, 500, 0.101296240386098, -0.065337942794282))
        .toEqual(1000.0000000000003);
    });
  });
  
  describe("tests for calculateProjectionValue function", () => {
  
    it("should return valid projection for month 1", () => {
      const month = 1;
      const previousMonthProjectedValue = 25000;
      const percentage = 0.003193314;
      const portfolioCurrentValue = 250000;
      const upfrontContribution = 0;
      const monthlyContributions = 624;
      const affordableLumpSum = 83009.41;
      const affordableRemainingAmount = 83009.41;
      const affordableDrawdown = 2800.67;
      const contributionPeriodUptoLumpSum = 224;
      const contributionPeriodFromLumpSumAndDrawdown = 180;
      const goalTargetMonth = 657;
      expect(
        calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
        .toEqual(251422.3285);
    });
  
    it("should return valid projection for month after the lump sum is taken", () => {
      const month = 225;
      const previousMonthProjectedValue = 714327.30;
      const percentage = 0.003193314;
      const portfolioCurrentValue = 250000;
      const upfrontContribution = 0;
      const monthlyContributions = 624;
      const affordableLumpSum = 83009.41;
      const affordableRemainingAmount = 83009.41;
      const affordableDrawdown = 2800.67;
      const contributionPeriodUptoLumpSum = 224;
      const contributionPeriodFromLumpSumAndDrawdown = 180;
      const goalTargetMonth = 657;
      expect(
        calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
        .toEqual(633959.8788845235);
    });
  
  
    it("should return valid projection for month after 1 month of lump sum date", () => {
      const month = 226;
      const previousMonthProjectedValue = 633957.8862565875;
      const percentage = 0.003193314;
      const portfolioCurrentValue = 250000;
      const upfrontContribution = 0;
      const monthlyContributions = 624;
      const affordableLumpSum = 83009.41;
      const affordableRemainingAmount = 83009.41;
      const affordableDrawdown = 2800.67;
      const contributionPeriodUptoLumpSum = 224;
      const contributionPeriodFromLumpSumAndDrawdown = 180;
      const goalTargetMonth = 658;
      const projectedAmountOnLumpSumDate = 633959.8788845235;
      expect(
        calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
        .toEqual(639265.2020759225);
    });
  
    it("should return valid projection for month after 1 month of lump sum date", () => {
      const month = 658;
      const previousMonthProjectedValue = 1590180.22;
      const percentage = 0.002426445;
      const portfolioCurrentValue = 250000;
      const upfrontContribution = 0;
      const monthlyContributions = 624;
      const affordableLumpSum = 83009.41;
      const affordableRemainingAmount = 83009.41;
      const affordableDrawdown = 6225.71;
      const contributionPeriodUptoLumpSum = 224;
      const contributionPeriodFromLumpSumAndDrawdown = 180;
      const goalTargetMonth = 658;
      const projectedAmountOnLumpSumDate = 633959.8788845235;
      expect(
        calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
        .toEqual(1510827.8770760705);
    });
  });
  
  describe("tests for calculateProjectionValue function", () => {
  
    it("should return valid projection for month 1", () => {
      const month = 1;
      const previousMonthProjectedValue = 25000;
      const percentage = 0.003193314;
      const portfolioCurrentValue = 250000;
      const upfrontContribution = 0;
      const monthlyContributions = 624;
      const affordableLumpSum = 83009.41;
      const affordableRemainingAmount = 83009.41;
      const affordableDrawdown = 2800.67;
      const contributionPeriodUptoLumpSum = 224;
      const contributionPeriodFromLumpSumAndDrawdown = 180;
      const goalTargetMonth = 657;
      expect(
        calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
        .toEqual(251422.3285);
    });
  
    it("should return valid projection for month after the lump sum is taken", () => {
      const month = 225;
      const previousMonthProjectedValue = 714327.30;
      const percentage = 0.003193314;
      const portfolioCurrentValue = 250000;
      const upfrontContribution = 0;
      const monthlyContributions = 624;
      const affordableLumpSum = 83009.41;
      const affordableRemainingAmount = 83009.41;
      const affordableDrawdown = 2800.67;
      const contributionPeriodUptoLumpSum = 224;
      const contributionPeriodFromLumpSumAndDrawdown = 180;
      const goalTargetMonth = 657;
      expect(
        calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, 0))
        .toEqual(633959.8788845235);
    });
  
    it("should return valid projection for month after 1 month of lump sum date", () => {
      const month = 226;
      const previousMonthProjectedValue = 633957.8862565875;
      const percentage = 0.003193314;
      const portfolioCurrentValue = 250000;
      const upfrontContribution = 0;
      const monthlyContributions = 624;
      const affordableLumpSum = 83009.41;
      const affordableRemainingAmount = 83009.41;
      const affordableDrawdown = 2800.67;
      const contributionPeriodUptoLumpSum = 224;
      const contributionPeriodFromLumpSumAndDrawdown = 180;
      const goalTargetMonth = 658;
      const projectedAmountOnLumpSumDate = 633959.8788845235;
      expect(
        calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
        .toEqual(639265.2020759225);
    });
  
    it("should return valid projection for month after 1 month of lump sum date", () => {
      const month = 658;
      const previousMonthProjectedValue = 1590180.22;
      const percentage = 0.002426445;
      const portfolioCurrentValue = 250000;
      const upfrontContribution = 0;
      const monthlyContributions = 624;
      const affordableLumpSum = 83009.41;
      const affordableRemainingAmount = 83009.41;
      const affordableDrawdown = 6225.71;
      const contributionPeriodUptoLumpSum = 224;
      const contributionPeriodFromLumpSumAndDrawdown = 180;
      const goalTargetMonth = 658;
      const projectedAmountOnLumpSumDate = 633959.8788845235;
      expect(
        calculateProjectionValue(month, previousMonthProjectedValue, percentage, portfolioCurrentValue, upfrontContribution, monthlyContributions, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalTargetMonth, projectedAmountOnLumpSumDate))
        .toEqual(1510827.8770760705);
    });
  
  });
  
  describe("tests for calculateContribution function", () => {
    it("should return valid projection", () => {
      //arrange
      const previousMonthContributionLine: number = 1000;
      const month: number = 1;
      const monthlyContributions: number = 624;
      const goalTargetMonth: number = 657;
      const affordableLumpSum: number = 83009.41;
      const affordableRemainingAmount: number = 83009.41;
      const affordableDrawdown: number = 6225.71;
      const contributionPeriodUptoLumpSum: number = 224;
      const contributionPeriodFromLumpSumAndDrawdown: number = 180;
  
      expect(
        calculateContribution(month, previousMonthContributionLine, monthlyContributions, goalTargetMonth, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown))
        .toEqual(1624);     
    });
  });
  
  describe("tests for calculateContribution function when lump sum is withdrawn", () => {
    it("should return valid projection", () => {
      //arrange
      const previousMonthContributionLine: number = 140776.00;
      const month: number = 225;
      const monthlyContributions: number = 624;
      const goalTargetMonth: number = 657;
      const affordableLumpSum: number = 83009.41;
      const affordableRemainingAmount: number = 83009.41;
      const affordableDrawdown: number = 6225.71;
      const contributionPeriodUptoLumpSum: number = 224;
      const contributionPeriodFromLumpSumAndDrawdown: number = 180;
  
      expect(
        calculateContribution(month, previousMonthContributionLine, monthlyContributions, goalTargetMonth, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown))
        .toEqual(58390.59);
    });
  });
  describe("tests for calculateContribution function when goal target period reached", () => {
    it("should return valid projection", () => {
      //arrange
      const previousMonthContributionLine: number = -1405016.92;
      const month: number = 658;
      const monthlyContributions: number = 624.00;
      const goalTargetMonth: number = 658;
      const affordableLumpSum: number = 83009.41;
      const affordableRemainingAmount: number = 83009.41;
      const affordableDrawdown: number = 6225.71;
      const contributionPeriodUptoLumpSum: number = 224;
      const contributionPeriodFromLumpSumAndDrawdown: number = 180;
  
      expect(
        calculateContribution(month, previousMonthContributionLine, monthlyContributions, goalTargetMonth, affordableLumpSum, affordableRemainingAmount, affordableDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown))
        .toEqual(-1494252.0399999998);
    });
  });
  
  describe("tests for calculateExpectedReturn function", () => {
    it("should return valid projection", () => {
      expect(
        calculateExpectedReturn(2500, 0.04, 0.012))
        .toEqual({ "monthlyNetExpectedReturn": 0.9194445131184874, "monthlyVolatility": 0.0034641016151377548 });
    });
  });
  
  describe("tests for calculateHoldingsWithOnTrackPercentage function", () => {
    it("should return valid holding with ontrack percentage", () => {
      // Arrange
      const timeHorizon: number = 900;
      const lumpSumAmount: number = 100000;
      const desiredAmount: number = 100000;
      const desiredMonthlyDrawdown: number = 7500;
      const contributionPeriodUptoLumpSum: number = 224;
      const contributionPeriodFromLumpSumAndDrawdown: number = 180;
      const goalDrawdownPeriod = 253;
      const goalTargetMonth: number = 658;
      const monthlyContributions: number = 624;
      const portfolioCurrentValue: number = 250000;
      const upfrontContribution: number = 0;
      const preGoalExpectedReturn: number = 0.043;
      const feesPercentage: number = 0.004;
      const preGoalExpectedVolatility: number = 0.1637;
      const postGoalExpectedReturn: number = 0.0298;
      const postGoalExpectedVolatility: number = 0.0927;
  
      const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(preGoalExpectedReturn, feesPercentage, preGoalExpectedVolatility);
      const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(postGoalExpectedReturn, feesPercentage, postGoalExpectedVolatility);
      const preGoalZScore: number = 0;
      const postGoalZScore: number = 0;
      const statePension: number = null;
      //act
  
      const result = calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, statePension);
  
      //assert
  
      // Assertion
      expect(result.onTrackPercentage).not.toBeNull();
      expect(result.onTrackPercentage).toBeCloseTo(0.8350, 4);
      expect(result.affordableDrawdown).toBeCloseTo(6262.31, 2);
      expect(result.affordableLumpSum).toBeCloseTo(83497.52, 2);
      expect(result.affordableRemainingAmount).toBeCloseTo(83497.52, 2);
      expect(result.affordableOutflow).toBeCloseTo(1751360.57, 2);
      expect(result.surplusOrShortfall).toBeCloseTo(346139.43, 2);
      expect(result.valueAtRetirement).toBeCloseTo(0.40, 2);
      expect(result.totalAffordableDrawdown).toBeCloseTo(1584365.52, 2);
  
    });
  });
  
  describe("tests for calculateHoldingsWithOnTrackPercentage function with state pension", () => {
    it("should return valid holding with ontrack percentage", () => {
      // Arrange
      const timeHorizon: number = 900;
      const lumpSumAmount: number = 100000;
      const desiredAmount: number = 100000;
      const desiredMonthlyDrawdown: number = 7500.00;
      const contributionPeriodUptoLumpSum: number = 224;
      const contributionPeriodFromLumpSumAndDrawdown: number = 180;
      const goalDrawdownPeriod = 253;
      const goalTargetMonth: number = 658;
      const monthlyContributions: number = 624;
      const portfolioCurrentValue: number = 250000;
      const upfrontContribution: number = 0;
      const preGoalExpectedReturn: number = 0.043;
      const feesPercentage: number = 0.004;
      const preGoalExpectedVolatility: number = 0.1637;
      const postGoalExpectedReturn: number = 0.0298;
      const postGoalExpectedVolatility: number = 0.0927;
  
      const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(preGoalExpectedReturn, feesPercentage, preGoalExpectedVolatility);
      const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(postGoalExpectedReturn, feesPercentage, postGoalExpectedVolatility);
      const preGoalZScore: number = 0;
      const postGoalZScore: number = 0;
      const statePension = 10000;
  
      //act
  
      const result = calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, statePension);
  
      //assert
  
      // Assertion
      expect(result.onTrackPercentage).not.toBeNull();
      expect(result.onTrackPercentage).toBeCloseTo(0.9233, 4);
      expect(result.affordableDrawdown).toBeCloseTo(6155.65, 2);
      expect(result.affordableLumpSum).toBeCloseTo(92334.75, 2);
      expect(result.affordableRemainingAmount).toBeCloseTo(92334.75, 2);
      expect(result.affordableOutflow).toBeCloseTo(1742048.90, 2);
      expect(result.surplusOrShortfall).toBeCloseTo(144617.77, 2);
      expect(result.valueAtRetirement).toBeCloseTo(-0.40, 2);
      expect(result.totalAffordableDrawdown).toBeCloseTo(1557379.40, 2);
    });
  });
  
  describe("tests for calculateHoldingsWithOnTrackPercentage function", () => {
    it("should throw error when maximum iterations is reached", () => {
      // Arrange
      const timeHorizon: number = 900;
      const lumpSumAmount: number = 1000000000;
      const desiredAmount: number = 10;
      const desiredMonthlyDrawdown: number = 2;
      const contributionPeriodUptoLumpSum: number = 224;
      const contributionPeriodFromLumpSumAndDrawdown: number = 180;
      const goalDrawdownPeriod = 253;
      const goalTargetMonth: number = 200;
      const monthlyContributions: number = 624;
      const portfolioCurrentValue: number = 250000000;
      const upfrontContribution: number = 0;
      const preGoalExpectedReturn: number = 0.043;
      const feesPercentage: number = 0.004;
      const preGoalExpectedVolatility: number = 0.1637;
      const postGoalExpectedReturn: number = 0.0298;
      const postGoalExpectedVolatility: number = 0.0927;
  
      const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(preGoalExpectedReturn, feesPercentage, preGoalExpectedVolatility);
      const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(postGoalExpectedReturn, feesPercentage, postGoalExpectedVolatility);
      const preGoalZScore: number = 0;
      const postGoalZScore: number = 0;
      const statePension: number = null;
      // act 
      const result = () => {
        calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, statePension);
      };
  
      expect(result)
        .toThrowError("Maximum iterations reached while calculating on track percentage");
    });
  });
  describe("tests for calculateHoldingsWithOnTrackPercentage function", () => {
    it("should be able to calculate over 100% on track", () => {
      // Arrange
      const timeHorizon: number = 900;
      const lumpSumAmount: number = 100000;
      const desiredAmount: number = 10;
      const desiredMonthlyDrawdown: number = 2;
      const contributionPeriodUptoLumpSum: number = 224;
      const contributionPeriodFromLumpSumAndDrawdown: number = 180;
      const goalDrawdownPeriod = 253;
      const goalTargetMonth: number = 624;
      const monthlyContributions: number = 800;
      const portfolioCurrentValue: number = 250000;
      const upfrontContribution: number = 0;
      const preGoalExpectedReturn: number = 0.043;
      const feesPercentage: number = 0.004;
      const preGoalExpectedVolatility: number = 0.1637;
      const postGoalExpectedReturn: number = 0.0298;
      const postGoalExpectedVolatility: number = 0.0927;
  
      const preGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(preGoalExpectedReturn, feesPercentage, preGoalExpectedVolatility);
      const postGoalExpectedReturns: ExpectedReturns = calculateExpectedReturn(postGoalExpectedReturn, feesPercentage, postGoalExpectedVolatility);
      const preGoalZScore: number = 0;
      const postGoalZScore: number = 0;
      const statePension: number = null;
      // act 
      const result = calculateHoldingsWithOnTrackPercentage(timeHorizon, lumpSumAmount, desiredAmount, desiredMonthlyDrawdown, contributionPeriodUptoLumpSum, contributionPeriodFromLumpSumAndDrawdown, goalDrawdownPeriod, goalTargetMonth, monthlyContributions, portfolioCurrentValue, upfrontContribution, preGoalExpectedReturns, postGoalExpectedReturns, preGoalZScore, postGoalZScore, statePension);
  
      // assertion
  
      expect(result.onTrackPercentage).not.toBeNull();
      expect(result.onTrackPercentage).toEqual(8.798664093017578);
  
    });
  });
  