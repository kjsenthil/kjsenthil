import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { setUpTelemetry } from './telemetry';

jest.mock('@microsoft/applicationinsights-web');

describe('setUpTelemetry', () => {
  it('loads an Application Insights object', () => {
    const loadAppInsightsSpy = jest.spyOn(ApplicationInsights.prototype, 'loadAppInsights');
    setUpTelemetry('someConnectionString');
    expect(loadAppInsightsSpy).toBeCalledTimes(1);
  });

  it('manually tracks a page view to establish the user session', () => {
    const trackPageViewSpy = jest.spyOn(ApplicationInsights.prototype, 'trackPageView');
    setUpTelemetry('someConnectionString');
    expect(trackPageViewSpy).toBeCalledTimes(1);
  });
});
