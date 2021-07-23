import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';
import { createBrowserHistory } from 'history';

const reactPlugin = new ReactPlugin();
let telemetry: ApplicationInsights;

export const setUpTelemetry = (connectionString: string) => {
  const browserHistory = createBrowserHistory();

  telemetry = new ApplicationInsights({
    config: {
      connectionString,
      enableAutoRouteTracking: true,
      extensions: [reactPlugin],
      extensionConfig: {
        [reactPlugin.identifier]: { history: browserHistory },
      },
    },
  });

  telemetry.loadAppInsights();

  // manually call trackPageView to establish the current user/session/page view
  telemetry.trackPageView();
};

export { reactPlugin as telemetryReactPlugin };
