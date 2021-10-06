import axios from 'axios';
import { expect } from 'chai';
import apiEndpoint from '../utils/apiBuilder';
import API_ENDPOINTS from '../utils/apiEndPoints';

describe('simulate projection endpoint with risk profiles scenarios', () => {
  let headers: object;

  before(() => {
    headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
    };
  });

  it('should return expected response for TAA1', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      upfrontContribution: 0,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 2.2,
        volatilityPercentage: 5.75,
        ZScoreLowerBound: -1.319225852,
        ZScoreUpperBound: 1.292778102,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };

    // act
    const result = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(result.status).to.equal(200);
    expect(result.data.goal.onTrack.percentage).to.be.closeTo(44.49752426147461, 2);
    expect(result.data.goal.desiredDiscountedOutflow).to.be.closeTo(2097500, 2);
    expect(result.data.goal.affordableUnDiscountedOutflowAverage).to.be.closeTo(938557.71, 2);
    expect(result.data.goal.drawdownRetirement.affordable.drawdown).to.be.closeTo(3355.98, 2);
    expect(result.data.goal.drawdownRetirement.affordable.lumpSum).to.be.closeTo(44746.49, 2);
    expect(result.data.projectionData.length).to.be.closeTo(901, 2);
    // underperform
    expect(result.data.goal.drawdownRetirement.underperform.drawdown).to.be.closeTo(2356.84, 2);
    expect(result.data.goal.drawdownRetirement.underperform.lumpSum).to.be.closeTo(31424.57, 2);

    expect(result.data.projectionData[0]).to.eql({
      monthNo: 0,
      lower: 250000,
      average: 250000,
      upper: 250000,
    });
    expect(result.data.contributionData[0]).to.eql({
      monthNo: 0,
      value: 1000,
    });
    expect(result.data.projectionData[407]).to.eql({
      monthNo: 407,
      lower: 523364.9375853571,
      average: 725282.874870299,
      upper: 940783.4854063925,
    });

    expect(result.data.contributionData[407]).to.eql({
      monthNo: 407,
      value: 186341.5832748413,
    });

    expect(result.data.projectionData[900]).to.eql({
      monthNo: 900,
      upper: 0,
      lower: 0,
      average: 0,
    });

    expect(result.data.contributionData[900]).to.eql({
      monthNo: 900,
      value: -687333.7178001404,
    });
  });

  it('should return expected response for TAA2', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      upfrontContribution: 0,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 2.7,
        volatilityPercentage: 7.99,
        ZScoreLowerBound: -1.291573567,
        ZScoreUpperBound: 1.290340248,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };
    // act
    const result = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(result.status).to.equal(200);
    expect(result.data.goal.onTrack.percentage).to.be.closeTo(53.49752426147461, 2);
    expect(result.data.goal.desiredDiscountedOutflow).to.be.closeTo(2097500, 2);
    expect(result.data.goal.affordableUnDiscountedOutflowAverage).to.be.closeTo(1116655.76, 2);
    expect(result.data.goal.drawdownRetirement.affordable.drawdown).to.be.closeTo(3992.8, 2);
    expect(result.data.goal.drawdownRetirement.affordable.lumpSum).to.be.closeTo(53237.46, 2);
    expect(result.data.projectionData.length).to.be.closeTo(901, 2);
    // underperform
    expect(result.data.goal.drawdownRetirement.underperform.drawdown).to.be.closeTo(2578.69, 2);
    expect(result.data.goal.drawdownRetirement.underperform.lumpSum).to.be.closeTo(34382.53, 2);
    expect(result.data.projectionData[0]).to.eql({
      monthNo: 0,
      lower: 250000,
      average: 250000,
      upper: 250000,
    });
    expect(result.data.contributionData[0]).to.eql({
      monthNo: 0,
      value: 1000,
    });
    expect(result.data.projectionData[407]).to.eql({
      monthNo: 407,
      lower: 540667.0461827869,
      average: 821666.9890395927,
      upper: 1134626.86438399,
    });

    expect(result.data.contributionData[407]).to.eql({
      monthNo: 407,
      value: 174029.6800365448,
    });

    expect(result.data.projectionData[900]).to.eql({
      monthNo: 900,
      upper: 0,
      lower: 0,
      average: 0,
    });

    expect(result.data.contributionData[900]).to.eql({
      monthNo: 900,
      value: -865431.7663679123,
    });
  });

  it('should return expected response for TAA3', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      upfrontContribution: 0,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 3.0,
        volatilityPercentage: 9.27,
        ZScoreLowerBound: -1.297843387,
        ZScoreUpperBound: 1.28450079,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };
    // act
    const result = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(result.status).to.equal(200);
    expect(result.data.goal.onTrack.percentage).to.be.closeTo(59.067, 2);
    expect(result.data.goal.desiredDiscountedOutflow).to.be.closeTo(2097500, 2);
    expect(result.data.goal.affordableUnDiscountedOutflowAverage).to.be.closeTo(1238934.55, 2);
    expect(result.data.goal.drawdownRetirement.affordable.drawdown).to.be.closeTo(4430.04, 2);
    expect(result.data.goal.drawdownRetirement.affordable.lumpSum).to.be.closeTo(59067.2, 2);
    expect(result.data.projectionData.length).to.be.closeTo(901, 2);
    // underperform
    expect(result.data.goal.drawdownRetirement.underperform.drawdown).to.be.closeTo(2737.73, 2);
    expect(result.data.goal.drawdownRetirement.underperform.lumpSum).to.be.closeTo(36503.07, 2);
    expect(result.data.projectionData[0]).to.eql({
      monthNo: 0,
      lower: 250000,
      average: 250000,
      upper: 250000,
    });
    expect(result.data.contributionData[0]).to.eql({
      monthNo: 0,
      value: 1000,
    });
    expect(result.data.projectionData[407]).to.eql({
      monthNo: 407,
      lower: 553004.5803728824,
      average: 885734.9938059294,
      upper: 1257064.7539927186,
    });

    expect(result.data.contributionData[407]).to.eql({
      monthNo: 407,
      value: 165576.55765914917,
    });

    expect(result.data.projectionData[900]).to.eql({
      monthNo: 900,
      upper: 0,
      lower: 0,
      average: 0,
    });

    expect(result.data.contributionData[900]).to.eql({
      monthNo: 900,
      value: -987710.553861618,
    });
  });
  it('should return expected response for TAA4', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      upfrontContribution: 0,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 3.3,
        volatilityPercentage: 10.75,
        ZScoreLowerBound: -1.307739775,
        ZScoreUpperBound: 1.272804864,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };
    // act
    const result = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(result.status).to.equal(200);
    expect(result.data.goal.onTrack.percentage).to.be.closeTo(65.51504135131836, 2);
    expect(result.data.goal.desiredDiscountedOutflow).to.be.closeTo(2097500, 2);
    expect(result.data.goal.affordableUnDiscountedOutflowAverage).to.be.closeTo(1374177.99, 2);
    expect(result.data.goal.drawdownRetirement.affordable.drawdown).to.be.closeTo(4913.62, 2);
    expect(result.data.goal.drawdownRetirement.affordable.lumpSum).to.be.closeTo(65515.04, 2);
    expect(result.data.projectionData.length).to.be.closeTo(901, 2);
    // underperform
    expect(result.data.goal.drawdownRetirement.underperform.drawdown).to.be.closeTo(2883.85, 2);
    expect(result.data.goal.drawdownRetirement.underperform.lumpSum).to.be.closeTo(38451.4, 2);

    expect(result.data.projectionData[0]).to.eql({
      monthNo: 0,
      lower: 250000,
      average: 250000,
      upper: 250000,
    });
    expect(result.data.contributionData[0]).to.eql({
      monthNo: 0,
      value: 1000,
    });
    expect(result.data.projectionData[407]).to.eql({
      monthNo: 407,
      lower: 560018.5116904902,
      average: 954894.8375480449,
      upper: 1393570.5787555622,
    });

    expect(result.data.contributionData[407]).to.eql({
      monthNo: 407,
      value: 156227.19004058838,
    });

    expect(result.data.projectionData[900]).to.eql({
      monthNo: 900,
      upper: 308325.74237680837,
      lower: 0,
      average: 0,
    });

    expect(result.data.contributionData[900]).to.eql({
      monthNo: 900,
      value: -1122953.9923439026,
    });
  });

  it('should return expected response for TAA5', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      upfrontContribution: 0,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 3.5,
        volatilityPercentage: 12.34,
        ZScoreLowerBound: -1.322113994,
        ZScoreUpperBound: 1.273435772,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };
    // act
    const result = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(result.status).to.equal(200);
    expect(result.data.goal.onTrack.percentage).to.be.closeTo(70.18, 2);
    expect(result.data.goal.desiredDiscountedOutflow).to.be.closeTo(2097500, 2);
    expect(result.data.goal.affordableUnDiscountedOutflowAverage).to.be.closeTo(1472159.24, 2);
    expect(result.data.goal.drawdownRetirement.affordable.drawdown).to.be.closeTo(5263.97, 2);
    expect(result.data.goal.drawdownRetirement.affordable.lumpSum).to.be.closeTo(70186.37, 2);
    expect(result.data.projectionData.length).to.be.closeTo(901, 2);
    // underperform
    expect(result.data.goal.drawdownRetirement.underperform.drawdown).to.be.closeTo(2878.42, 2);
    expect(result.data.goal.drawdownRetirement.underperform.lumpSum).to.be.closeTo(38378.97, 2);

    expect(result.data.projectionData[0]).to.eql({
      monthNo: 0,
      lower: 250000,
      average: 250000,
      upper: 250000,
    });
    expect(result.data.contributionData[0]).to.eql({
      monthNo: 0,
      value: 1000,
    });
    expect(result.data.projectionData[407]).to.eql({
      monthNo: 407,
      lower: 542850.8115080029,
      average: 1004007.1741072477,
      upper: 1518854.758824388,
    });

    expect(result.data.contributionData[407]).to.eql({
      monthNo: 407,
      value: 149453.75397109985,
    });

    expect(result.data.projectionData[900]).to.eql({
      monthNo: 900,
      upper: 667542.5163346294,
      lower: 0,
      average: 0,
    });

    expect(result.data.contributionData[900]).to.eql({
      monthNo: 900,
      value: -1220935.2485904694,
    });
  });

  it('should return expected response for TAA6', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

    const inboundPayload = {
      timeHorizonToProject: 900,
      monthlyContribution: 624,
      currentPortfolioValue: 250000,
      upfrontContribution: 0,
      currentNetContribution: 1000,
      includeGoal: true,
      preGoal: {
        expectedReturnPercentage: 3.8,
        volatilityPercentage: 13.78,
        ZScoreLowerBound: -1.335729501,
        ZScoreUpperBound: 1.276923539,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };
    // act
    const result = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(result.status).to.equal(200);
    expect(result.data.goal.onTrack.percentage).to.be.closeTo(77.79, 2);
    expect(result.data.goal.desiredDiscountedOutflow).to.be.closeTo(2097500, 2);
    expect(result.data.goal.affordableUnDiscountedOutflowAverage).to.be.closeTo(1631851.74, 2);
    expect(result.data.goal.drawdownRetirement.affordable.drawdown).to.be.closeTo(5834.98, 2);
    expect(result.data.goal.drawdownRetirement.affordable.lumpSum).to.be.closeTo(77799.84, 2);
    expect(result.data.projectionData.length).to.be.closeTo(901, 2);
    // underperform
    expect(result.data.goal.drawdownRetirement.underperform.drawdown).to.be.closeTo(3062.54, 2);
    expect(result.data.goal.drawdownRetirement.underperform.lumpSum).to.be.closeTo(40833.87, 2);

    expect(result.data.projectionData[0]).to.eql({
      monthNo: 0,
      lower: 250000,
      average: 250000,
      upper: 250000,
    });
    expect(result.data.contributionData[0]).to.eql({
      monthNo: 0,
      value: 1000,
    });
    expect(result.data.projectionData[407]).to.eql({
      monthNo: 407,
      lower: 552436.8015752878,
      average: 1082462.5556210368,
      upper: 1675219.7934654881,
    });

    expect(result.data.contributionData[407]).to.eql({
      monthNo: 407,
      value: 138414.22512435913,
    });

    expect(result.data.projectionData[900]).to.eql({
      monthNo: 900,
      upper: 1094909.5092799235,
      lower: 0,
      average: 0,
    });

    expect(result.data.contributionData[900]).to.eql({
      monthNo: 900,
      value: -1380627.7434597015,
    });
  });

  it('should return expected response for TAA7', async () => {
    // arrange
    const apiUrl = apiEndpoint.getBaseUrl().path(API_ENDPOINTS.SIMULATE_PROJECTIONS);

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
        ZScoreLowerBound: -1.350629401,
        ZScoreUpperBound: 1.265237395,
      },
      feesPercentage: 0.4,
      drawdownType: 'Retirement',
      drawdownRetirement: {
        startDate: '2055-04-10',
        endDate: '2076-04-10',
        regularDrawdown: 7500,
        remainingAmount: 100000,
        lumpSum: {
          amount: 100000,
          date: '2040-04-10',
        },
      },
    };
    // act
    const result = await axios.post(apiUrl, inboundPayload, {
      headers,
    });
    // assert
    expect(result.status).to.equal(200);
    expect(result.data.goal.onTrack.percentage).to.be.closeTo(92.27, 2);
    expect(result.data.goal.desiredDiscountedOutflow).to.be.closeTo(2097500, 2);
    expect(result.data.goal.affordableUnDiscountedOutflowAverage).to.be.closeTo(1935527.62, 2);
    expect(result.data.goal.drawdownRetirement.affordable.drawdown).to.be.closeTo(6920.83, 2);
    expect(result.data.goal.drawdownRetirement.affordable.lumpSum).to.be.closeTo(92277.83, 2);
    expect(result.data.projectionData.length).to.be.closeTo(901, 2);
    // underperform
    expect(result.data.goal.drawdownRetirement.underperform.drawdown).to.be.closeTo(3410.7, 2);
    expect(result.data.goal.drawdownRetirement.underperform.lumpSum).to.be.closeTo(45476.0, 2);

    expect(result.data.projectionData[0]).to.eql({
      monthNo: 0,
      lower: 250000,
      average: 250000,
      upper: 250000,
    });
    expect(result.data.contributionData[0]).to.eql({
      monthNo: 0,
      value: 1000,
    });
    expect(result.data.projectionData[407]).to.eql({
      monthNo: 407,
      lower: 568251.4756998939,
      average: 1226963.4765012749,
      upper: 1957697.7178230986,
    });

    expect(result.data.contributionData[407]).to.eql({
      monthNo: 407,
      value: 117421.1366405487,
    });

    expect(result.data.projectionData[900]).to.eql({
      monthNo: 900,
      upper: 2049490.6854229511,
      lower: 0,
      average: 0,
    });

    expect(result.data.contributionData[900]).to.eql({
      monthNo: 900,
      value: -1684303.6268720627,
    });
  });
});
