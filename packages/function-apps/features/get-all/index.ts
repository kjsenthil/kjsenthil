import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { AppConfigPath, FeatureToggle } from '../shared-code/types';
import { getFunctionAppConfig } from '../shared-code/utils';
import { sendGetRequestToAppConfig } from '../shared-code/http';

const getAllMain: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  let returnBody
  let returnStatus

  try {
    const appConfigUrl = new URL(getFunctionAppConfig('APP_CONFIG_INSTANCE_URL'));
    const response = await sendGetRequestToAppConfig(appConfigUrl.host, AppConfigPath.KEY_VALUES, getAllFeaturesTransformer);
    returnStatus = response.status;
    if (response.status == 200) {
      returnBody = response.data;
    } else {
      returnBody = response.data.message;
    }
  } catch (e) {
    returnBody = {'errorMessage': e.message};
    returnStatus = 400;
  }

  context.res = {
    body: returnBody,
    status: returnStatus
  };
};

const getAllFeaturesTransformer = (data: string) => {
  const featureToggles: FeatureToggle[] = [];
  const dataAsJson = JSON.parse(data);
  dataAsJson.items.forEach(featureToggle => {
    const toggleDetails = JSON.parse(featureToggle.value);
    featureToggles.push(new FeatureToggle(
      toggleDetails.id,
      toggleDetails.description,
      toggleDetails.enabled
    ));
  });
  return featureToggles;
};

export { getAllMain, getAllFeaturesTransformer };
