export { setUpTelemetry, telemetryReactPlugin } from './telemetry';

export { SeverityLevel } from '@microsoft/applicationinsights-web';

export {
  AppInsightsContext as TelemetryContext,
  useAppInsightsContext as useTelemetryContext,
  useTrackEvent as useTrackTelemetryEvent,
  useTrackMetric as useTrackTelemetryMetric,
} from '@microsoft/applicationinsights-react-js';
