import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { RequestPayload } from "./types";
import validateInboundPayload from "./validations/validate-inbound-payload";
import prepareInputValuesDrawdownRetirement from "./prepare-input-values/prepare-input-values-drawdown-retirement";
import findRiskModel from "./find-risk-model";

const goalRiskProfileMain: AzureFunction = async (
  context: Context,
  req: HttpRequest
) => {
  let responseBody = {};
  let responseStatus = 200;

  try {
    const inboundPayload: RequestPayload = req.body;

    const validationResult = validateInboundPayload({
      inboundPayload,
      errors: [],
    });

    if (validationResult.length > 0) {
      responseStatus = 400;
      responseBody = validationResult;
    } else {
      const findRiskModelInputs = prepareInputValuesDrawdownRetirement(
        inboundPayload
      );

      responseBody = findRiskModel(findRiskModelInputs);
    }
  } catch (e) {
    if (e instanceof Error) {
      responseBody = { errorMessage: e.message };
    }

    responseStatus = 400;
  }

  context.res = {
    body: responseBody,
    status: responseStatus,
  };
};

export { goalRiskProfileMain };
