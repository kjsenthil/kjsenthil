import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import {
  TransactionDataItem,
  RequestPayload,
  ResponsePayload,
  ValidationError,
} from "./types";

const annualisedReturn: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let responseBody = {};
  let responseStatus = 200;

  try {
    const input: RequestPayload = req.body;
    const validationResult = validateInput(input);

    if (!validationResult || validationResult.length > 0) {
      responseStatus = 400;
      responseBody = validationResult;
    } else {
      const transactionData = deriveTransactionData(input);

      if (!isTransactionDataValid(transactionData)) {
        responseStatus = 400;
        responseBody = {
          code: "val-annualreturns-009",
          property: transactionData,
          message:
            "unable_to_calculate_as_all_transactions_are_of_the_ same_sign",
        };
      } else responseBody = getAnnualisedReturn(transactionData);
    }
  } catch (e) {
    responseBody = { errorMessage: e.message };
    responseStatus = 400;
  }

  context.res = {
    body: responseBody,
    status: responseStatus,
  };
};

function getAnnualisedReturn(
  transactionData: TransactionDataItem[]
): ResponsePayload {
  const finalRateValue = bisectionMethodCalculation(transactionData);

  return {
    annualisedReturnValue: finalRateValue,
    transactionData: transactionData,
  };
}

function bisectionMethodCalculation(
  transactionData: TransactionDataItem[]
): number {
  const precision = Math.pow(10, -6); // decimal precision

  let maxRateValue = 100000;
  let minRateValue = -(1 - precision);
  let avgRateValue = 0;

  const firstTransactionData = transactionData[0];

  const firstTransactionDataDate = parseDate(firstTransactionData.date);

  let round = 0;

  let middleRateResults = 0;

  let lowRateResults = calculateReturnRateSeriesSum(
    transactionData,
    firstTransactionDataDate,
    minRateValue
  );

  let upRateResults = calculateReturnRateSeriesSum(
    transactionData,
    firstTransactionDataDate,
    maxRateValue
  );

  while (true) {
    if (Math.sign(lowRateResults) === Math.sign(upRateResults))
      throw new Error(
        "Value cannot be calculated due to signs of both lower and upper rates to be the same"
      );

    avgRateValue = (minRateValue + maxRateValue) / 2;

    middleRateResults = calculateReturnRateSeriesSum(
      transactionData,
      firstTransactionDataDate,
      avgRateValue
    );

    if (Math.sign(middleRateResults) === Math.sign(lowRateResults)) {
      minRateValue = avgRateValue;
      lowRateResults = middleRateResults;
    } else {
      maxRateValue = avgRateValue;
      upRateResults = middleRateResults;
    }

    if (Math.abs(middleRateResults) > precision) {
      ++round;

      if (round === 1000)
        throw new Error("Cannot calculate return value after 1000 rounds");
    } else {
      avgRateValue = (maxRateValue + minRateValue) / 2;
      break;
    }
  }

  const returnPercentage = avgRateValue * 100;
  return returnPercentage;
}

function deriveTransactionData(
  inboundPayload: RequestPayload
): TransactionDataItem[] {
  let transactionDataItemData: TransactionDataItem[] = [];
  let prevNetContributionAmount = 0;
  const partialTransactionData = inboundPayload.netContributionData.map(
    (netContrbItem, idx) => {
      let transactionAmount = 0;
      if (idx === 0) {
        transactionAmount = netContrbItem.netContributionsToDate;
      } else {
        transactionAmount =
          netContrbItem.netContributionsToDate - prevNetContributionAmount;
      }

      prevNetContributionAmount = netContrbItem.netContributionsToDate;

      return { date: netContrbItem.date, transactionAmount: transactionAmount };
    }
  );

  transactionDataItemData.push(...partialTransactionData);

  transactionDataItemData.push({
    date: inboundPayload.currentPortfolioData.date,
    transactionAmount:
      inboundPayload.currentPortfolioData.currentPortfolioAmount,
  });

  return transactionDataItemData;
}

function isTransactionDataValid(
  transactionData: TransactionDataItem[]
): boolean {
  const allPositive = transactionData.every(
    (item) => item.transactionAmount > 0
  );
  const allNegative = transactionData.every(
    (item) => item.transactionAmount < 0
  );
  // If all transactions are of the same sign the specific opposite signed threshold value will never be adjusted and in turn unable to narrow down a calculated result
  return !(allPositive || allNegative);
}

function validateInput(inboundPayload: RequestPayload): ValidationError[] {
  let errors: ValidationError[] = [];

  if (!inboundPayload || Object.keys(inboundPayload).length === 0) {
    errors.push({
      code: "val-annualreturns-001",
      property: "inboundPayload",
      message: "inbound_payload_not_defined",
    });

    return errors;
  }

  if (
    !inboundPayload.netContributionData ||
    inboundPayload.netContributionData.length === 0
  )
    errors.push({
      code: "val-annualreturns-002",
      property: "netContribution_data",
      message: "netContribution_data_not_defined",
    });
  else {
    inboundPayload.netContributionData.forEach((netContributionItem, idx) => {
      if (
        typeof netContributionItem.date == "undefined" ||
        !Date.parse(netContributionItem.date)
      ) {
        errors.push({
          code: "val-annualreturns-003-" + idx,
          property: "netContribution_date_" + idx,
          message: "netContribution_date_not_defined_for_item_" + idx,
        });
      } else if (!netContributionItem.netContributionsToDate) {
        errors.push({
          code: "val-annualreturns-004-" + idx,
          property: "netContribution_amount_" + idx,
          message: "netContribution_amount_not_defined_or_zero_for_item_" + idx,
        });
      }
    });
  }

  if (!inboundPayload.currentPortfolioData)
    errors.push({
      code: "val-annualreturns-005",
      property: "currentPortfolio_data",
      message: "currentPortfolio_data_not_defined",
    });
  else {
    if (
      typeof inboundPayload.currentPortfolioData.date == "undefined" ||
      !Date.parse(inboundPayload.currentPortfolioData.date)
    ) {
      errors.push({
        code: "val-annualreturns-006",
        property: "currentPortfolio_date",
        message: "currentPortfolio_date_not_defined",
      });
    } else if (!inboundPayload.currentPortfolioData.currentPortfolioAmount) {
      errors.push({
        code: "val-annualreturns-007",
        property: "currentPortfolio_amount",
        message: "currentPortfolio_amount_not_defined_or_zero",
      });
    } else if (
      inboundPayload.currentPortfolioData.currentPortfolioAmount >= 0
    ) {
      errors.push({
        code: "val-annualreturns-008",
        property: "currentPortfolio_amount",
        message: "currentPortfolio_amount_must_be_negative",
      });
    }
  }

  return errors;
}

function calculateReturnRateSeriesSum(
  transactionData: TransactionDataItem[],
  firstTransactionDataDate: Date,
  avgRateValue: number
): number {
  let rateResults: number[] = [];

  transactionData.forEach((netContributionItem) => {
    const currDate = parseDate(netContributionItem.date);
    const fractionOfYearValue = calculateFractionOfYear(
      currDate,
      firstTransactionDataDate
    );

    const calculatedRateValue = calculateReturnRateValue(
      netContributionItem.transactionAmount,
      avgRateValue,
      fractionOfYearValue
    );

    rateResults.push(calculatedRateValue);
  });

  return rateResults.reduce((a, b) => a + b);
}

function calculateReturnRateValue(
  cashTransaction: number,
  returnRate: number,
  fractionOfYearValue: number
) {
  const returnRateValue =
    cashTransaction / Math.pow(1 + returnRate, fractionOfYearValue);

  return returnRateValue;
}

function calculateFractionOfYear(currDate: Date, firstDate: Date) {
  // const firstDayjs = dayjs(firstDate);
  // const currDayjs = dayjs(currDate);
  // // year difference gives more inaccuracy
  // const diffDay = firstDayjs.diff(currDayjs, "day");

  const diffTime = Math.abs(currDate.getTime() - firstDate.getTime());

  const diffDay = diffTime / (1000 * 60 * 60 * 24);

  const yearFactor = diffDay / 365;

  return yearFactor;
}

function parseDate(date: string): Date {
  return new Date(Date.parse(date));
}

export {
  annualisedReturn,
  getAnnualisedReturn,
  validateInput,
  calculateFractionOfYear,
  calculateReturnRateValue,
  calculateReturnRateSeriesSum,
  isTransactionDataValid,
};
