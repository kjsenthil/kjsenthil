import { Context } from "@azure/functions";
import { TransactionDataItem, RequestPayload } from "./types";
import {
  annualisedReturn,
  calculateFractionOfYear,
  calculateReturnRateSeriesSum,
  calculateReturnRateValue,
  getAnnualisedReturn,
  isTransactionDataValid,
  validateInput,
} from "./index";

describe("tests for validate function", () => {
  const emptyRequestPayload = {} as RequestPayload;
  const validRequestPayload = mockRequestPayload();

  it("when empty payload should return specific error", () => {
    expect(validateInput(emptyRequestPayload)).toEqual([
      {
        code: "val-annualreturns-001",
        property: "inboundPayload",
        message: "inbound_payload_not_defined",
      },
    ]);
  });

  it("when all data is valid no validation error is thrown", () => {
    expect(validateInput(validRequestPayload)).toEqual([]);
  });

  it("when net contribution dates are undefined the specific validation error is thrown", () => {
    const invalidDateRequestPayload = validRequestPayload;
    invalidDateRequestPayload.netContributionData[2].date = "";

    expect(validateInput(invalidDateRequestPayload)).toEqual([
      {
        code: "val-annualreturns-003-2",
        property: "netContribution_date_2",
        message: "netContribution_date_not_defined_for_item_2",
      },
    ]);
  });

  it("when net contribution amounts are undefined the specific validation error is thrown", () => {
    const invalidDateRequestPayload = validRequestPayload;

    invalidDateRequestPayload.netContributionData[3].netContributionsToDate = null;

    expect(validateInput(invalidDateRequestPayload)).toEqual([
      {
        code: "val-annualreturns-004-3",
        property: "netContribution_amount_3",
        message: "netContribution_amount_not_defined_or_zero_for_item_3",
      },
    ]);
  });

  it("when current portfolio data is undefined the specific validation error is thrown", () => {
    const invalidDateRequestPayload = validRequestPayload;
    invalidDateRequestPayload.currentPortfolioData = null;

    expect(validateInput(invalidDateRequestPayload)).toEqual([
      {
        code: "val-annualreturns-005",
        property: "currentPortfolio_data",
        message: "currentPortfolio_data_not_defined",
      },
    ]);
  });

  it("when current portfolio date is undefined the specific validation error is thrown", () => {
    const invalidDateRequestPayload = validRequestPayload;

    invalidDateRequestPayload.currentPortfolioData.date = null;

    expect(validateInput(invalidDateRequestPayload)).toEqual([
      {
        code: "val-annualreturns-006",
        property: "currentPortfolio_date",
        message: "currentPortfolio_date_not_defined",
      },
    ]);
  });

  it("when current portfolio amount is undefined the specific validation error is thrown", () => {
    const invalidDateRequestPayload = validRequestPayload;

    invalidDateRequestPayload.currentPortfolioData.currentPortfolioAmount = null;

    expect(validateInput(invalidDateRequestPayload)).toEqual([
      {
        code: "val-annualreturns-007",
        property: "currentPortfolio_amount",
        message: "currentPortfolio_amount_not_defined_or_zero",
      },
    ]);
  });

  it("when current portfolio amount is not negative", () => {
    const invalidDateRequestPayload = validRequestPayload;

    invalidDateRequestPayload.currentPortfolioData.currentPortfolioAmount = 9200;

    expect(validateInput(invalidDateRequestPayload)).toEqual([
      {
        code: "val-annualreturns-008",
        property: "currentPortfolio_amount",
        message: "currentPortfolio_amount_must_be_negative",
      },
    ]);
  });
});

describe("Tests for annualised return Function", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });

  it("should return a 200 response when payload is valid", async () => {
    // Arrange
    const inboundPayload = mockRequestPayload();
    const request = {
      query: {},
      body: inboundPayload,
    };

    // Action
    await annualisedReturn(context, request);

    // Assertion
    expect(context.res.status).toEqual(200);
  });

  it("should return a 400 response when payload is invalid", async () => {
    // Arrange
    const request = {
      query: {},
      body: {},
    };

    // Action
    await annualisedReturn(context, request);

    // Assertion
    expect(context.res.status).toEqual(400);
  });
});

describe("tests for validateTransaction function", () => {
  it("should throw an exception if all the values are positive", () => {
    const allPositiveTransaction = mockTransactionData;
    allPositiveTransaction[2].transactionAmount = 400;
    allPositiveTransaction[3].transactionAmount = 700;
    allPositiveTransaction[7].transactionAmount = 2900;
    expect(isTransactionDataValid(allPositiveTransaction)).toBeFalsy();
  });
});

describe("Tests for getAnnualisedReturn Function", () => {
  let context: Context;

  beforeEach(() => {
    context = ({ log: jest.fn() } as unknown) as Context;
  });

  it("should return expected results", async () => {
    // Action
    const result = getAnnualisedReturn(mockTransactionData);

    const expectedValueFromExcel = 20.6825763;

    expect(result.annualisedReturnValue).toBeCloseTo(expectedValueFromExcel, 4);
  });
});

describe("tests for calculateFractionOfYear function", () => {
  it("should return expected year factor value based on first and current date", () => {
    const firstDate = new Date(mockTransactionData[0].date);
    const currDate = new Date(mockTransactionData[1].date);
    expect(calculateFractionOfYear(currDate, firstDate)).toEqual(1);
  });
});

describe("tests for calculateReturnRateSeriesSum function", () => {
  it("should return expected sum of the series based on transactiondate, 1st transaction date and sample rate value", () => {
    const firstTransactionDate = new Date(mockTransactionData[0].date);
    expect(
      calculateReturnRateSeriesSum(
        mockTransactionData,
        firstTransactionDate,
        100000
      )
    ).toBeCloseTo(1000.0149997724881, 4);
  });
});

describe("tests for calculateReturnRateValue function", () => {
  it("should return expected return rate value based cashTransaction, returnRate and fractionOfYearValue", () => {
    const cashTransaction = 1500;
    const returnRate = 49999.5000005;
    const fractionOfYearValue = 1;
    expect(
      calculateReturnRateValue(cashTransaction, returnRate, fractionOfYearValue)
    ).toBeCloseTo(0.02999970000269998, 4);
  });
});

function mockRequestPayload(): RequestPayload {
  return {
    netContributionData: [
      {
        date: "2015-01-01",
        netContributionsToDate: 1000,
      },
      {
        date: "2016-01-01",
        netContributionsToDate: 2500,
      },
      {
        date: "2017-01-01",
        netContributionsToDate: 1700,
      },
      {
        date: "2018-01-01",
        netContributionsToDate: 1200,
      },
      {
        date: "2019-01-01",
        netContributionsToDate: 2200,
      },
      {
        date: "2020-01-01",
        netContributionsToDate: 3400,
      },
      {
        date: "2021-01-01",
        netContributionsToDate: 4400,
      },
    ],
    currentPortfolioData: {
      date: "2021-07-21",
      currentPortfolioAmount: -9200,
    },
  };
}

export const mockTransactionData: TransactionDataItem[] = [
  {
    date: "2015-01-01",
    transactionAmount: 1000,
  },
  {
    date: "2016-01-01",
    transactionAmount: 1500,
  },
  {
    date: "2017-01-01",
    transactionAmount: -800,
  },
  {
    date: "2018-01-01",
    transactionAmount: -500,
  },
  {
    date: "2019-01-01",
    transactionAmount: 1000,
  },
  {
    date: "2020-01-01",
    transactionAmount: 1200,
  },
  {
    date: "2021-01-01",
    transactionAmount: 1000,
  },
  {
    date: "2021-07-28",
    transactionAmount: -9200,
  },
];
