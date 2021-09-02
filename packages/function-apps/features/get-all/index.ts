import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import { AppConfigPath } from "../shared-code/types";
import { getFunctionAppConfig } from "../shared-code/utils";
import { sendGetRequestToAppConfig } from "../shared-code/http";
import getAllFeaturesTransformer from "../shared-code/getAllFeaturesTransformer";

const getAllMain: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  let returnBody;
  let returnStatus;

  try {
    const appConfigUrl = new URL(
      getFunctionAppConfig("APP_CONFIG_INSTANCE_URL")
    );
    const response = await sendGetRequestToAppConfig(
      appConfigUrl.host,
      AppConfigPath.KEY_VALUES,
      getAllFeaturesTransformer
    );
    returnStatus = response.status;
    if (response.status == 200) {
      returnBody = response.data;
    } else {
      returnBody = response.data.message;
    }
  } catch (e) {
    if (e instanceof Error) {
      returnBody = {errorMessage: e.message};
    }
    returnStatus = 400;
  }

  context.res = {
    body: returnBody,
    status: returnStatus,
  };
};

export { getAllMain };
