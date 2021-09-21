import * as validateInboundPayload from "./validations/validate-inbound-payload";
import * as prepareInputValuesDrawdownRetirement from "./prepare-input-values/prepare-input-values-drawdown-retirement";
import * as findRiskModel from "./find-risk-model";
import { goalRiskProfileMain } from "./index";

jest.mock("./validations/validate-inbound-payload");
jest.mock("./prepare-input-values/prepare-input-values-drawdown-retirement");
jest.mock("./find-risk-model");

describe("goalRiskProfileMain", () => {
  let context = { res: {} };
  let req = {};

  beforeEach(() => {
    jest.clearAllMocks();

    context = { res: {} };
    req = {};
  });

  it("creates the expected response object when the inbound payload is valid", async () => {
    const findRiskModelResult = {};

    (validateInboundPayload.default as jest.Mock).mockReturnValue([]);
    (findRiskModel.default as jest.Mock).mockReturnValue(findRiskModelResult);

    // @ts-ignore - We don't need to provide the actual context object
    await goalRiskProfileMain(context, req);

    expect(context.res).toEqual({
      body: findRiskModelResult,
      status: 200,
    });

    expect(validateInboundPayload.default).toHaveBeenCalledTimes(1);
    expect(prepareInputValuesDrawdownRetirement.default).toHaveBeenCalledTimes(
      1
    );
    expect(findRiskModel.default).toHaveBeenCalledTimes(1);
  });

  it("creates the expected response object when the inbound payload is invalid", async () => {
    const validateInboundPayloadResult = ["some error"];

    (validateInboundPayload.default as jest.Mock).mockReturnValue(
      validateInboundPayloadResult
    );

    // @ts-ignore - We don't need to provide the actual context object
    await goalRiskProfileMain(context, req);

    expect(context.res).toEqual({
      body: validateInboundPayloadResult,
      status: 400,
    });

    expect(validateInboundPayload.default).toHaveBeenCalledTimes(1);
    expect(prepareInputValuesDrawdownRetirement.default).not.toHaveBeenCalled();
    expect(findRiskModel.default).not.toHaveBeenCalled();
  });

  it("creates the expected response object when an error occurs", async () => {
    const errorMessage = "some error";

    (validateInboundPayload.default as jest.Mock).mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // @ts-ignore - We don't need to provide the actual context object
    await goalRiskProfileMain(context, req);

    expect(context.res).toEqual({
      body: {
        errorMessage,
      },
      status: 400,
    });

    expect(prepareInputValuesDrawdownRetirement.default).not.toHaveBeenCalled();
    expect(findRiskModel.default).not.toHaveBeenCalled();
  });
});
